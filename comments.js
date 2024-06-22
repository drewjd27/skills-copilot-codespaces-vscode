// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = [];

var server = http.createServer(function (req, res) {
    // Parse the request URL
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        // Read the file and respond with its content
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading index.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (pathname === '/comment') {
        // Save the comment and return the updated list of comments
        var comment = urlObj.query.comment;
        if (comment) {
            comments.push(comment);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(comments));
    } else {
        // Serve the static file
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Error loading ' + pathname);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
});

server.listen(3000, function () {
    console.log('Server running at http://localhost:3000/');
});