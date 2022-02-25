//make crud with mysql
var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var path = require("path");
var data = require("./lib/data");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === "/") {
    data.home(request, response);
  } else if (pathname === "/create") {
    data.create(request, response);
  } else if (pathname === "/create_process") {
    data.create_process(request, response);
  } else if (pathname === "/update") {
    data.update(request, response);
  } else if (pathname === "/update_process") {
    data.update_process(request, response);
  } else if (pathname === "/delete") {
    data.delete(request, response);
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(4000);
