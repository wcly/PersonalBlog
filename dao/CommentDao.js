const dbUtil = require('./DBUtil');

function insertComment(blogId, parent, userName, email, comments, ctime, utime, success) {
    
    const insertSql = "insert into comments (`blog_id`, `parent`, `user_name`, `email`, `comments`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?, ?)";
    const params = [blogId, parent, userName, email, comments, ctime, utime];

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

module.exports.insertComment = insertComment
