const dbUtil = require('./DBUtil');

function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
    const insertSql = "insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) values (?, ?, ?, ?)";
    const params = [tagId, blogId, ctime, utime];

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

function queryByTag(tagId, page, pageSize, success) {
    const insertSql = "select * from tag_blog_mapping where tag_id = ? limit ?, ?;";
    const params = [tagId, page * pageSize, pageSize];

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

function queryByTagCount(tagId, success) {
    const insertSql = "select count(1) as count from tag_blog_mapping where tag_id = ?;";
    const params = [tagId];

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

module.exports.insertTagBlogMapping = insertTagBlogMapping
module.exports.queryByTag = queryByTag
module.exports.queryByTagCount = queryByTagCount