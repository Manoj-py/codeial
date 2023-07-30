const User = require("../models/users");

module.exports.profile = function (req, res) {
  return res.render("userProfile", {
    title: "Profile",
  });
};

module.exports.signUp = function (req, res) {
  return res.render("user_signup", {
    title: "Codeial | Sing Up",
  });
};

module.exports.signIn = function (req, res) {
  return res.render("user_signin", {
    title: "Codeial | Sing In",
  });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }).then(function (err, user) {
    if (err) {
      console.log("User Already present");
      return res.redirect("/users/sign-in");
    }

    if (!user) {
      User.create(req.body).then(function (err, user) {
        if (err) {
          console.log("error in creating user");
          return res.redirect("back");
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = {
  //TODO Later
};
