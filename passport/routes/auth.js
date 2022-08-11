var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var sanitizeHtml = require("sanitize-html");
var template = require("../lib/template.js");
module.exports = function (passport) {
  router.get("/login", function (request, response) {
    var fmsg = request.flash();
    console.log("login fail F", fmsg);
    var feedback = "";
    if (fmsg.error) {
      feedback = fmsg.error[0];
    }
    var title = "WEB - login";
    var list = template.list(request.list);
    var html = template.HTML(
      title,
      list,
      `
      <div style="color:red;">${feedback}</div>
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
  router.post(
    "/login_process",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
      failureFlash: true,
      successFlash: true,
    })
  );
  router.get("/logout", function (req, res, next) {
    //console.log("Try to log out");
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect(`/`);
    });
  });
  return router;
};
