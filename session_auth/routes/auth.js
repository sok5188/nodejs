var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var sanitizeHtml = require("sanitize-html");
var template = require("../lib/template.js");

var authData = {
  email: "sok5188@gmail.com",
  password: "111111",
  nickname: "sirong",
};

router.get("/login", function (request, response) {
  var title = "WEB - login";
  var list = template.list(request.list);
  var html = template.HTML(
    title,
    list,
    `
        <form action="/auth/login_process" method="post">
            <p><input type="text" name="email" placeholder="email"></p>
            <p><input type=s"pasword" name="password" placeholder="password"></p>
            <p>
                <input type="submit" value="login">
            </p>
        </form>
    `,
    ""
  );
  response.send(html);
});
router.post("/login_process", function (request, response) {
  //console.log(request.list);
  var post = request.body;
  var email = post.email;
  var password = post.password;
  if (email === authData.email && password === authData.password) {
    //success
    request.session.is_logined = true;
    request.session.nickname = authData.nickname;
    //이부분에서 메모리의 세션정보를 데이터저장소에 가져다가 놔두기전에 redirect가 실행되버리면 넘어가버리니 데이터가 저장소에 저장되지 않을 수 있음
    request.session.save(function () {
      response.redirect(`/`);
    });
    //그래서 이렇게 수동으로 저장 시킨 후에 redirect
  } else {
    response.send("Log In Fail..");
  }
});
router.get("/logout", function (request, response) {
  request.session.destroy(function (err) {
    response.redirect(`/`);
  });
});

module.exports = router;
