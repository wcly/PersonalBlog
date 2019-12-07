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

module.exports.insertBlog = insertBlog