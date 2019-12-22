const dbUtil = require('./DBUtil');

function insertComment(blogId, parent, parentName, userName, email, comments, ctime, utime, success) {
    const insertSql = "insert into comments (`blog_id`, `parent`, `parent_name`, `user_name`, `email`, `comments`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [blogId, parent, parentName, userName, email, comments, ctime, utime];

    const connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    })
    connection.end();
}

function queryCommentsByBlogId(blogId, success) {
    const querySql = "select * from comments where blog_id = ?";
    const params = [blogId];

    const connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    })
    connection.end();
}

function queryCommentCountByBlogId(blogId, success) {
    const querySql = "select count(1) as count from comments where blog_id = ?";
    const params = [blogId];

    const connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    })
    connection.end();
}

function queryNewComments(size, success) {
    const querySql = "select * from comments order by id desc limit ?;";
    const params = [size];

    const connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    })
    connection.end();
}

module.exports.insertComment = insertComment
module.exports.queryCommentsByBlogId = queryCommentsByBlogId
module.exports.queryCommentCountByBlogId = queryCommentCountByBlogId
module.exports.queryNewComments = queryNewComments