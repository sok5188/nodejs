var db = require("./db");
var template = require("./template.js");
var url = require("url");
var qs = require("querystring");
var path = require("path");
let sanitize = require("sanitize-html");
exports.home = function (request, response) {
  db.query("SELECT * FROM subject", function (err, subject) {
    var html = template.HTML(subject, `<a href="/create">create</a>`);
    response.writeHead(200);
    response.end(html);
  });
};

exports.create = function (request, response) {
  db.query("SELECT * FROM subject", function (err, subject) {
    var html = template.HTML(
      subject,
      `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `
    );
    response.writeHead(200);
    response.end(html);
  });
};
exports.create_process = function (request, response) {
  let body = "";
  request.on("data", function (data) {
    body += data; //body에 콜백시마다 data추가
  });
  request.on("end", function () {
    var post = qs.parse(body);

    db.query(
      `INSERT INTO subject (title, description, created) VALUES(?,?,NOW())`,
      [post.title, post.description],
      function (err, result) {
        if (err) throw err;
        response.writeHead(302, { Location: `/?id=${result.insertId}` });
        response.end();
      }
    );
  });
};

exports.update = function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query("SELECT * FROM subject", function (err, subjects) {
    if (err) throw err;
    db.query(
      `SELECT * FROM subject WHERE id=?`,
      [queryData.id],
      function (err2, subject) {
        if (err2) throw err2;

        var html = template.HTML(
          subjects,
          `
              <form action="/update_process" method="post">
                <input type="hidden" name="id" value="${subject[0].id}">
                <p><input type="text" name="title" placeholder="title" value="${sanitize(
                  subject[0].title
                )}"></p>
                <p>
                  <textarea name="description" placeholder="description">${sanitize(
                    subject[0].description
                  )}</textarea>
                </p>
                
                <p>
                  <input type="submit">
                </p>
              </form>

              `
        );
        response.writeHead(200);
        response.end(html);
      }
    );
  });
};
exports.update_process = function (request, response) {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    db.query(
      `UPDATE subject SET title=?,description=?,created=NOW() WHERE id=?`,
      [post.title, post.description, post.id],
      function (err, result) {
        response.writeHead(302, { Location: `/` });
        response.end();
      }
    );
  });
};
exports.delete = function (request, response) {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    var id = post.id;
    db.query(
      `DELETE FROM subject WHERE id=?`,
      [post.id],
      function (err, result) {
        if (err) throw err;
        response.writeHead(302, { Location: `/` });
        response.end();
      }
    );
  });
};
