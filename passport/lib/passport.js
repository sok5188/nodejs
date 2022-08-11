module.exports = function (app) {
  var passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(function (user, done) {
    done(null, user.email);
  });

  passport.deserializeUser(function (user, done) {
    done(null, authData);
  });

  var authData = {
    email: "sok5188@gmail.com",
    password: "111111",
    nickname: "sirong",
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (username, password, done) {
        if (username === authData.email) {
          if (password === authData.password) {
            return done(null, authData, { message: "Hello Boy" });
          } else {
            return done(null, false, { message: "Incorrect PWD" });
          }
        } else {
          return done(null, false, { message: "Incorrect ID" });
        }
      }
    )
  );
  return passport;
};
