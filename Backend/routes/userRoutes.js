/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-require */
//Module import
const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

//Creating subapp for resources
const router = express.Router();

//Route
router.get("/check", userController.checkConnection);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.patch("/updateMe", authController.protect, userController.updateMe);
router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

router.route("/").get(userController.getAllUser);

module.exports = router;
