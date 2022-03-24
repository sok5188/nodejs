var express = require("express");
var router = express.Router();
const port = 3000;
var fs = require("fs");
var template = require("../lib/template.js");

router.get("/", (request, response) => {
  var title = "Welcome";
  var description = "Hello, Node.js";
  var list = template.list(request.list);
  var html = template.HTML(
    title,
    list,
    `<h2>${title}</h2><p>${description}</p>
      <img src="/images/hello.jpg" style="width: 500px; display:block; margin:10px">
      `,
    `<a href="/topic/create">create</a>`
  );
  response.send(html);
});
module.exports = router;
