var http = require("http");
let cookie = require("cookie");
http
  .createServer(function (req, res) {
    console.log(req.headers.cookie);
    let cookies = {};
    if (req.headers.cookie !== undefined)
      cookies = cookie.parse(req.headers.cookie);
    console.log(cookies.yummy_cookie);
    res.writeHead(200, {
      "Set-Cookie": ["yummy_cookie=choco", "tasty_cookie=strawberry"],
    });
    res.end("cookie~");
  })
  .listen(3000);
