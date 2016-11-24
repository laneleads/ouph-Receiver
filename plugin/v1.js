'use strict';
var
    path = require('path'),
    url = require('url'),
    querystring = require('querystring'),
    moment = require('moment'),
    config = require(path.join(__dirname, '../config'));

var queue = require(path.join(__dirname, '../db/' + config.queue.type + ".js"));
module.exports = {
    name: 'web tracking v1',
    url: '/collect/v1/a.gif',
    v: '1.0.2016.1005',
    ondata: function (req) {
        var ua = req.headers['user-agent'] || "";
        var ip = req.headers["ouph-ip"] || req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.ip ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress ||
            "";
        if (req.method == 'POST') {
            req.on('data', function (chunk) {
                var q = chunk.toString()
                submit(q, ua, ip);

            });

        }
        else if (req.method == 'GET') {
            var request_url = url.parse(req.url);
            var q = request_url.query || '';
            submit(q, ua, ip);


        }
    }


};
function submit(q, ua, ip) {
    var param = querystring.parse(q);
    var ct = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    var query = {
        query: param,//JSON.stringify(param),
        ua: ua.toString(),
        ip: ip.toString(),
        visittime: ct.toString()
    };
    queue.in(query);
}
