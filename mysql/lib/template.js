let sanitize = require("sanitize-html");
module.exports = {
  HTML: function (title, list, body, control) {
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <a href="/author">author</a>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },
  list: function (results) {
    var list = "<ul>";
    var i = 0;
    while (i < results.length) {
      list =
        list +
        `<li><a href="/?id=${results[i].id}">${sanitize(
          results[i].title
        )}</a></li>`;
      i = i + 1;
    }
    list = list + "</ul>";
    return list;
  },
  authorSelect: function (authors, author_id) {
    let tag = "";
    let i = 0;
    let selected = "";
    while (i < authors.length) {
      if (author_id === authors[i].id) {
        selected = " selected";
      }
      tag += `<option value=${authors[i].id}${selected}>${sanitize(
        authors[i].name
      )}</option>`;
      i++;
    }
    return ` <select name="author"> 
        ${tag}
      </select>`;
  },
  authorTable: function (authors) {
    let tag = "<table>";
    let i = 0;

    while (i < authors.length) {
      tag += `<tr>
                <td>${sanitize(authors[i].name)}</td>
                <td>${sanitize(authors[i].profile)}</td>
                <td><a href="/author_update?id=${authors[i].id}">update</a></td>
                <td><form action="/author_delete" method="post">
                <input type="hidden" name="id" value="${authors[i].id}">
                <input type="submit" value="delete">
              </form></td>
                </tr>
                `;
      i++;
    }
    tag += "</table>";
    return `
        ${tag}
        <style>
        table{
          border-collapse:collapse;
        }
          td{ border:1px solid black;
          }
        </style>
      `;
  },
};
