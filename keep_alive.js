const http = require('http');
http.createServer(function (req, res) {
    res.write("Search password");
    res.end();
}).listen(8080);