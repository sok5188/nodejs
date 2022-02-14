var http = require("http");
var fs = require("fs");
var url = require("url");
let qs = require("querystring");
function templateHTML(title, list, body) {
  return `
            <!doctype html>
            <html>
            <head>
             <title>WEB12 - ${title}</title>
              <meta charset="utf-8">
            </head>
           <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <a href="/create">create</a>
             ${body}
            </body>
            </html>
            `;
}
function templateLIST(filelist) {
  var list = "<ul>";
  var i = 0;
  while (i < filelist.length) {
    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i += 1;
  }

  list = list + "</ul>";
  return list;
}
var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function (err, filelist) {
        var title = "Welcome";

        data = "Hello, Node.js";
        var list = templateLIST(filelist);
        var template = templateHTML(
          title,
          list,
          `<h2>${title}</h2>
            ${data}`
        );
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data", function (err, filelist) {
        fs.readFile(`data/${queryData.id}`, "utf8", function (err, data) {
          var title = queryData.id;
          var list = templateLIST(filelist);
          var template = templateHTML(
            title,
            list,
            `<h2>${title}</h2>
          ${data}`
          );
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", function (err, filelist) {
      var title = "CREATE";

      data = "Hello, Node.js";
      var list = templateLIST(filelist);
      var template = templateHTML(
        title,
        list,
        `
        <form action="http://localhost:3000/create_process" method="post">
        <p><input ="text" name="title" placeholder="input title"></p>
        <p><textarea name="description" placeholder ="input description"></textarea></p>
        <p>
         <input type="submit" />
         </p>
        </form>
        `
      );
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === "/create_process") {
    let body = "";
    request.on("data", function (data) {
      body += data; //body에 콜백시마다 data추가
    });
    request.on("end", function () {
      let post = qs.parse(body);
      let title = post.title;
      let description = post.description;
      fs.writeFile(`data/${title}`, description, "utf8", function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end("ok");
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not Found");
  }
});
app.listen(3000);
