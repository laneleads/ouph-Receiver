'use strict';
var
    path = require('path'),
    mysql = require('mysql'),
    config = require(path.join(__dirname, '../config')),
    pool = mysql.createPool(config.queue.conn),
    os = require("os"),
    moment = require('moment');

module.exports = {
    conn: function (callback) {
        callback();
    },
    in: function (query) {
        query.query = JSON.stringify(query.query);
        pool.query('insert into web_queue set ? ', query, function (err, result) {
            var d = moment.utc().format('YYYY-MM-DD HH:mm:ss');
            console.log(d);
            if (err) {
                console.log(err);
            } else {
                console.log(result.insertId);
            }
        });

    },
    init: function (callback) {

        var sql = [];
        sql.push("CREATE TABLE IF NOT EXISTS `web_queue` (\
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,\
	`query` VARCHAR(8000) NOT NULL,\
	`ua` VARCHAR(1000) NOT NULL,\
	`ip` VARCHAR(128) NOT NULL,\
	`visittime` DATETIME NOT NULL,\
	PRIMARY KEY (`id`)\
)\
COLLATE='utf8_general_ci';\
");
        pool.query(sql.join("\r\n"), function (err, result) {
            if (err) {
                console.log(err);
                process.exit();
            } else {
                console.log(result);
            }
            callback();

        });


    }

};


