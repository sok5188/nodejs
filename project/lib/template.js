let sanitize = require("sanitize-html");
module.exports = {
  HTML: function (subject, body) {
    let tag = `<table><tr>
      <td>Title</td>
      <td>Description</td>
      <td>Updated time</td>
      <td></td>
      <td></td>
    </tr>`;
    let i = 0;

    while (i < subject.length) {
      tag += `<tr>
                <td>${sanitize(subject[i].title)}</td>
                <td>${sanitize(subject[i].description)}</td>
                <td>${sanitize(subject[i].created)}</td>
                <td><a href="/update?id=${subject[i].id}">update</a></td>
                <td><form action="/delete" method="post">
                <input type="hidden" name="id" value="${subject[i].id}">
                <input type="submit" value="delete">
              </form></td>
                </tr>
                `;
      i++;
    }
    tag += `</table>
    <style>
        table{
          border-collapse:collapse;
        }
          td{ border:1px solid black;
          }
        </style>
    `;

    return `
    <!doctype html>
    <html>
    <head>
      <title>Project Page</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">HOME</a></h1>
      ${tag}
      ${body}
    </body>
    </html>
    `;
  },
};
