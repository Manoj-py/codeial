const passport = require("passport");
const User = require("../models/users");

const Localstratergy = require("passport-local").Strategy;

passport.use(
  new Localstratergy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      //finding the user
      User.findOne({ email: email })
        .then(function (user) {
          if (!user || user.password != password) {
            console.log("Invalid User name or Password");
            return done(null, false);
          }
          return done(null, user);
        })
        .catch(function (err) {
          console.log("Error in finding the user");
          return done(err);
        });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then(function (user) {
      return done(null, user);
    })
    .catch(function (err) {
      console.log("Error in finding the user");
      return done(err);
    });
});

passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};
