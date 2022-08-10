module.exports = {
  IsOwn: function authIsOwn(request, response) {
    if (request.session.is_logined) {
      return true;
    } else {
      return false;
    }
  },
  Status: function authStatus(request, response) {
    var authstatus = '<a href="/auth/login">login</a>';
    if (this.IsOwn(request, response)) {
      authstatus = `${request.session.nickname}|<a href="/auth/logout">logout</a>`;
    }
    return authstatus;
  },
};
