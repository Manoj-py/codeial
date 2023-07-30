const express = require("express");
const port = 8000;

const app = express();

app.listen(port, function (err) {
  if (err) {
    return console.log(`Error in Starting the server in the port ${port}`);
  }
  return console.log(`Server is running in the port:${port}`);
});
