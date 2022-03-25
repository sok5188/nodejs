const express = require("express");
const app = express();
const port = 3000;
var fs = require("fs");
var path = require("path");

var bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
var compression = require("compression");
app.use(compression());
app.use(helmet());
var topicRouter = require("./routes/topic.js");
var indexRouter = require("./routes/index.js");
const { default: helmet } = require("helmet");

app.get("*", function (request, response, next) {
  fs.readdir("./data", function (error, fileList) {
    request.list = fileList;
    next();
  });
});
app.use("/", indexRouter);
app.use("/topic", topicRouter); // /topic 으로 시작하는 애들이 오면 topicrouter를 실행

app.use(function (req, res, next) {
  res.status(404).send("Sorry cant find that!");
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
