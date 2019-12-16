const commentDao = require("../dao/CommentDao");
const timeUtil = require("../util/TimeUtil");
const respUtil = require('../util/RespUtil');
const url = require("url");

const path = new Map();

function addComment(request, response) {
    const params = url.parse(request.url, true).query;

    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent),
        params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(),
        function (result) {
            response.writeHead(200, {
                "Content-Type": "text/plain;charset=UTF-8"
            });
            response.write(respUtil.writeResult('success', '评论成功', null));
            response.end();
        });
}

path.set('/addComment', addComment);

module.exports.path = path;