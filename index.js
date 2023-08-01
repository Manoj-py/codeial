const express = require("express");
const port = 8000;
const app = express();
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-stratergy");
const MongoStore = require("connect-mongo");

//middlewares
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));

//seting up layout
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setting up configurations of views ,styles ,scripts

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "codeial",
    secret: "anything",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
    store: new MongoStore(
      {
        mongoUrl: "mongodb://localhost/codeial_development",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use("/", require("./routes/index"));



app.listen(port, function (err) {
  if (err) {
    return console.log(`Error in Starting the server in the port ${port}`);
  }
  return console.log(`Server is running in the port:${port}`);
});
