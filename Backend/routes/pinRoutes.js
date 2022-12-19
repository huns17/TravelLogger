//Module import
const express = require("express");
const pinController = require("../controllers/pinController");
const authController = require("../controllers/authController");

//Creating subapp for resources
const router = express.Router();

//Route
router.get("/check", pinController.checkConnection);
router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    pinController.creatPins
  )
  .get(authController.protect, pinController.getAllPins);
router
  .route("/:id")
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    pinController.deletePins
  );

module.exports = router;
