const blogDao = require("../dao/BlogDao");
const tagBlogMappingDao = require("../dao/TagBlogMappingDao");
const tagsDao = require("../dao/TagsDao");
const timeUtil = require("../util/TimeUtil");
const respUtil = require('../util/RespUtil');
const url = require("url");

const path = new Map();

function editBlog(request, response) {
    const params = url.parse(request.url, true).query;
    var tags = params.tags.replace(/ /g, "").replace("，", ",");
    request.on("data", function (data) {
        blogDao.insertBlog(params.title, data.toString(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            response.writeHead(200, {
                "Content-Type": "text/plain;chatset=UTF-8"
            });
            response.write(respUtil.writeResult('success', '添加成功', null));
            response.end();
            const blogId = result.insertId;
            const tagList = tags.split(',');
            for (let i = 0; i < tagList.length; i++) {
                if (tagList[i] == "") {
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        });
    })
}

path.set('/editBlog', editBlog);

function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, function (result) {
        if (result == null || result.length == 0) {
            insertTag(tag, blogId);
        } else {
            tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), function () {});
        }
    })
}

function insertTag(tag, blogId) {
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId, blogId)
    })
}

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function () {})
}

module.exports.path = path