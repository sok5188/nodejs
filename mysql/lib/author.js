var db = require("./db");
var template = require("./template.js");
var qs = require("querystring");
var url = require("url");
let sanitize = require("sanitize-html");
exports.home = function (request, response) {
  db.query("SELECT * FROM topic", function (err, topic) {
    db.query("SELECT * FROM author", function (err, authors) {
      var title = "author";
      var list = template.list(topic);
      var html = template.HTML(
        title,
        list,
        `
        ${template.authorTable(authors)}
        <form action="author_create" method="post">
        <p><input type="text" name="name" placeholder="name"></p>
        <p>
          <textarea name="profile" placeholder="profile"></textarea>
        </p>
        <p>
              <input type="submit" value="create">
            </p>
        </form>
        `,
        `
        `
      );
      response.writeHead(200);
      response.end(html);
    });
  });
};

exports.create = function (request, response) {
  let body = "";
  request.on("data", function (data) {
    body += data; //body에 콜백시마다 data추가
  });
  request.on("end", function () {
    var post = qs.parse(body);

    db.query(
      `INSERT INTO author (name, profile) VALUES(?,?)`,
      [post.name, post.profile],
      function (err, result) {
        if (err) throw err;
        response.writeHead(302, { Location: `/author` });
        response.end();
      }
    );
  });
};

exports.update = function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query("SELECT * FROM topic", function (err, topic) {
    db.query("SELECT * FROM author", function (err2, authors) {
      db.query(
        `SELECT * FROM author WHERE id=?`,
        [queryData.id],
        function (err3, author) {
          var title = "author";

          var list = template.list(topic);
          var html = template.HTML(
            title,
            list,
            `
            ${template.authorTable(authors)}
            <form action="author_update_process" method="post">
            <p>
              <input type="hidden" name="id" value="${queryData.id}">
            </p>
            <p><input type="text" name="name" value="${sanitize(
              author[0].name
            )}" placeholder="name"></p>
            <p>
              <textarea name="profile" placeholder="profile">${sanitize(
                author[0].profile
              )}</textarea>
            </p>
            <p>
                  <input type="submit" value="update">
                </p>
            </form>
            `,
            `
            `
          );
          response.writeHead(200);
          response.end(html);
        }
      );
    });
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
      `UPDATE author SET name=?,profile=? WHERE id=?`,
      [post.name, post.profile, post.id],
      function (err, result) {
        response.writeHead(302, { Location: `/author` });
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

    //delete topic
    db.query(
      `DELETE FROM topic WHERE author_id=?`,
      [post.id],
      function (err, result) {
        if (err) throw err;
        db.query(
          `DELETE FROM author WHERE id=?`,
          [post.id],
          function (err2, result2) {
            if (err2) throw err2;
            response.writeHead(302, { Location: `/author` });
            response.end();
          }
        );
      }
    );
    //delete author
  });
};
