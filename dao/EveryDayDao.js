const dbUtil = require('./DBUtil');

function insertEveryDay(content, ctime, success) {
    const insertSql = "insert into every_day (`content`, `ctime`) values (?, ?)";
    const params = [content, ctime];

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

function queryEveryDay(success) {
    const querySql = "select * from every_day order by id desc limit 1";
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

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;