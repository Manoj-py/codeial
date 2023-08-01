const User = require("../models/users");

module.exports.profile = function (req, res) {
  return res.render("userProfile", {
    title: "Profile",
  });
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_signup", {
    title: "Codeial | Sing Up",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_signin", {
    title: "Codeial | Sing In",
  });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email })
    .then(function (user) {
      if (!user) {
        User.create(req.body)
          .then(function (user) {
            console.log(`User created Sucessfully ${user}`);
            return res.redirect("/users/sign-in");
          })
          .catch(function (err) {
            if (err) {
              console.log("error in creating user");
              return res.redirect("back");
            }
          });
      } else {
        return res.redirect("back");
      }
    })
    .catch(function (err) {
      if (err) {
        console.log("User Already present");
        return res.redirect("/users/sign-in");
      }
    });
};

module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function () {
    return res.redirect("/");
  });
};