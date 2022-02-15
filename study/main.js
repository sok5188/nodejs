var http = require("http");
var fs = require("fs");
var url = require("url");
let qs = require("querystring");
let template = {
  HTML: function (title, list, body, control) {
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
                ${control}
               ${body}
              </body>
              </html>
              `;
  },
  LIST: function (filelist) {
    var list = "<ul>";
    var i = 0;
    while (i < filelist.length) {
      list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i += 1;
    }

    list = list + "</ul>";
    return list;
  },
};

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === "/") {
    //home
    if (queryData.id === undefined) {
      fs.readdir("./data", function (err, filelist) {
        var title = "Welcome";

        data = "Hello, Node.js";
        var list = template.LIST(filelist);
        var html = template.HTML(
          title,
          list,
          `<h2>${title}</h2>
            ${data}`,
          `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);
      });
    } else {
      fs.readdir("./data", function (err, filelist) {
        fs.readFile(`data/${queryData.id}`, "utf8", function (err, data) {
          var title = queryData.id;
          var list = template.LIST(filelist);
          var HTML = template.HTML(
            title,
            list,
            `<h2>${title}</h2>
          ${data}`,
            `
          <a href="/create">create</a> 
          <a href="/update?id=${title}">update</a>
          <form action="delete_process" method="post">
            <input type="hidden" name="id" value=${title}>
            <input type="submit" value="delete">
          </form>
          `
          );
          response.writeHead(200);
          response.end(HTML);
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", function (err, filelist) {
      var title = "CREATE";

      data = "Hello, Node.js";
      var list = template.LIST(filelist);
      var html = template.HTML(
        title,
        list,
        `
        <form action="/create_process" method="post">
        <p><input ="text" name="title" placeholder="input title"></p>
        <p><textarea name="description" placeholder ="input description"></textarea></p>
        <p>
         <input type="submit" />
         </p>
        </form>
        `,
        ``
      );
      response.writeHead(200);
      response.end(html);
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
  } else if (pathname === "/update") {
    fs.readdir("./data", function (err, filelist) {
      fs.readFile(`data/${queryData.id}`, "utf8", function (err, data) {
        var title = queryData.id;
        var list = template.LIST(filelist);
        var html = template.HTML(
          title,
          list,
          `
        <form action="/update_process" method="post">
        <input type="hidden" name="id" value=${title}> 
        <p><input ="text" name="title" value="${title}"></p>
        <p><textarea name="description">${data}</textarea></p>
        <p>
         <input type="submit" />
         </p>
        </form>
        `,
          `
        <a href="/create">create</a> <a href="/update?1d=${title}">update</a>
        `
        );
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === "/update_process") {
    let body = "";
    request.on("data", function (data) {
      body += data; //body에 콜백시마다 data추가
    });
    request.on("end", function () {
      let post = qs.parse(body);
      let id = post.id;
      let title = post.title;
      let description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function (err) {
        fs.writeFile(`data/${title}`, description, "utf8", function (err) {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end("ok");
        });
      });
    });
  } else if (pathname === "/delete_process") {
    let body = "";
    request.on("data", function (data) {
      body += data; //body에 콜백시마다 data추가
    });
    request.on("end", function () {
      let post = qs.parse(body);
      let id = post.id;
      fs.unlink(`data/${id}`, function (err) {
        response.writeHead(302, { Location: `/` });
        response.end("ok");
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not Found");
  }
});
app.listen(3000);
