var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var fs = require("fs");

function send(res, file, type, next) {
	fs.readFile(file, function(err, data) {
		if (err) throw err;
		res.header("Content-Type", type);
		res.send(data);
		next();
	});
}

app.get("/", function(req, res, next) {
	send(res, "example/index.html", "text/html", next);
});

function magic(path, type) {
    app.get(path, function(req, res, next) {
	send(res, req._parsedUrl.pathname.substr(1), type, next);
    });
}

magic("*.vs", "text/plain");//"x-shader/x-vertex");
magic("*.fs", "text/plain");//"x-shader/x-fragment");
magic("*.html", "text/html");
magic("*.x3d", "text/xml");
magic("*.xml", "text/xml");
magic("*.xslt", "text/xsl");
magic("*.xhtml", "application/xhtml+xml");
magic("*.js", "text/javascript");
magic("*.css", "text/css");
magic("*.gif", "image/gif");
magic("*.jpg", "image/jpeg");
magic("*.jpeg", "image/jpeg");
magic("*.png", "image/png");
magic("*.mpg", "video/mpeg");
magic("*.wav", "audio/wav");
magic("*.mp3", "audio/mpeg3");
magic("*.swf", "application/x-shockwave-flash");
magic("*.ply", "application/octet-stream");
magic("*.stl", "application/octet-stream");
magic("*.json", "text/json");

console.log("Listing to port "+port);

app.listen(port);
