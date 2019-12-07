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

module.exports.insertTagBlogMapping = insertTagBlogMapping