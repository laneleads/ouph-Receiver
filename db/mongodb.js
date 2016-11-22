'use strict';
//https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
var
    path = require('path'),
    mongo = require('mongodb'),
    MongoClient = mongo.MongoClient,
    config = require(path.join(__dirname, '../config')),
    os = require("os"),
    moment = require('moment'),
    _db;

module.exports = {
    conn: function (callback) {
        MongoClient.connect(config.queue.conn.str, function (err, database) {
            if (err) throw err;
            _db = database;
            callback();
        });

    },
    in: function (query) {

        _db.collection('web_queue').insertOne(query);
    },
    init: function (callback) {
        MongoClient.connect(config.queue.conn.str, function (err, database) {
            if (err) {
                console.log(err);
                process.exit();
            }
            database.createCollection("web_queue", function (err, collection) {

                if (err) {
                    console.log(err);
                    process.exit();
                } else {
                    console.log(collection);
                }
                database.close();
                callback();
            });
        });

    }
}