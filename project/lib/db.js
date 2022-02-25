var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "5188",
  database: "project",
  port: "3306",
});
db.connect();
module.exports = db;
