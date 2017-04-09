var proxy = require('express-http-proxy');
var app = require('express')();

var apiProxy = proxy('https://app-gateway.hackathon.ixaris.com/', {
    forwardPath: function (req, res) {
        return require('url').parse(req.baseUrl).path;
    }
});

app.use("/*", apiProxy);

var server = require('http').createServer(app);

server.listen(8324);