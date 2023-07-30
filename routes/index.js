const express = require("express");
const router = express.Router();

// importing routes
const homeController = require("../controllers/home_controller");
const postController = require("../controllers/post_controller");

router.use("/users", require("./users"));

router.get("/", homeController.home);
router.get("/post", postController.post);

module.exports = router;
