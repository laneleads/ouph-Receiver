'use strict';
var
    http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    os = require('os');
var
    config = require(path.join(__dirname, 'config')),
    plugins = [],
    files = fs.readdirSync(path.join(__dirname, 'plugin')),
    db = require(path.join(__dirname, 'db', config.queue.type + ".js"));
for (var fn in files) {
    var tmp = require(path.join(__dirname, 'plugin', files[fn]));
    if (tmp.url && tmp.v) {
        plugins.push(tmp);
    }

}

var server = http.createServer(function (req, res) {
    var request_url = url.parse(req.url);

    var request_path = request_url.pathname;

    if (request_url.path === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(req.url);
        res.write("\r\n----\r\n");
        res.write(JSON.stringify(req.headers));
        res.write("\r\n----\r\n");
        res.end();
        return;
    }

    var plugin = { v: '' };
    for (var index = 0; index < plugins.length; index++) {

        if (request_path === plugins[index].url) {
            plugin = plugins[index];
            break;
        }
    }
    if (plugin.v.length === 0) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write(req.url);
        res.write("not found");
        res.end();
        return;
    }
    res.writeHead(200, { 'Content-Type': 'image/gif' });
    var gif = new Buffer('R0lGODdhAQABAIAAAP///////ywAAAAAAQABAAACAkQBADs=', 'base64');
    res.write(gif);
    res.end();
    plugin.ondata(req);

});

db.conn(function () {
    server.listen(config.port, config.host, function () {
        console.log('server start on ' + config.host + ":" + config.port);
    });
});


