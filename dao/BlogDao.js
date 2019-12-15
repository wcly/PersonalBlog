const dbUtil = require('./DBUtil');

function insertBlog(title, content, tags, views, ctime, utime, success) {
    const insertSql = "insert into blog (`title`, `content`, `tags`, `views`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?)";
    const params = [title, content, tags, views, ctime, utime];

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

function queryBlogByPage(page, pageSize, success){
    const querySql = "select * from blog order by id desc limit ?, ?";
    const params = [page * pageSize, pageSize];

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

function queryBlogByCount(success){
    const querySql = "select count(1) as count from blog";
    const params = [];

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

function queryBlogById(id, success){
    const querySql = "select * from blog where id = ?";
    const params = [id];

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

module.exports.insertBlog = insertBlog
module.exports.queryBlogByPage = queryBlogByPage
module.exports.queryBlogByCount = queryBlogByCount
module.exports.queryBlogById = queryBlogById