const express = require("express");
const port = 8000;
const app = express();
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

//middlewares
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));

//seting up layout
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//use express router
app.use("/", require("./routes/index"));

//setting up configurations of views ,styles ,scripts

app.set("view engine", "ejs");
app.set("views", "./views");



app.listen(port, function (err) {
  if (err) {
    return console.log(`Error in Starting the server in the port ${port}`);
  }
  return console.log(`Server is running in the port:${port}`);
});
