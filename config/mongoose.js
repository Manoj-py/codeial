const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/codeial_development");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connecting to the db"));

db.once("open", function (err) {
  if (err) {
    console.log("error connecting to the db");
  }
  return console.log("Db connected sucessfully ");
});

module.exports = db;
