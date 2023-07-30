const express = require("express");
const router = express.Router();

// importing routes
const homeController = require("../controllers/home_controller");


router.use("/users", require("./users"));

router.get("/", homeController.home);


module.exports = router;
