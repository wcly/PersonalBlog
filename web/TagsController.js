const blogDao = require("../dao/BlogDao");
const tagBlogMappingDao = require("../dao/TagBlogMappingDao");
const tagsDao = require("../dao/TagsDao");
const timeUtil = require("../util/TimeUtil");
const respUtil = require('../util/RespUtil');
const url = require("url");

const path = new Map();

function queryRandomTags(request, response) {
    tagsDao.queryAllTag(function (result) {
        result.sort(function () {
            return Math.random() > 0.5 ? true : false;
        })
        response.writeHead(200, {
            "Content-Type": "text/plain;charset=UTF-8"
        });
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    });
}

path.set('/queryRandomTags', queryRandomTags);

module.exports.path = path;