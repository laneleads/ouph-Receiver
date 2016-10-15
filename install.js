'use strict';
var
    path = require('path'),
    config = require(path.join(__dirname, 'config')),
    os = require('os');
var db = require(path.join(__dirname, '/db/' + config.queue.type + '.js'));
db.init(function () {
    console.log("install finished");
    process.exit();

});