module.exports = {
  IsOwn: function authIsOwn(request, response) {
    if (request.user) {
      return true;
    } else {
      return false;
    }
  },
  Status: function authStatus(request, response) {
    var authstatus = '<a href="/auth/login">login</a>';
    if (this.IsOwn(request, response)) {
      authstatus = `${request.user.nickname}|<a href="/auth/logout">logout</a>`;
    }
    return authstatus;
  },
};
