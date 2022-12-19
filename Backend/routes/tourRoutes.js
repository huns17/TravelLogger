/* eslint-disable node/no-missing-require */
/* eslint-disable import/no-unresolved */
//Module import
const express = require("express");
const tourController = require("../controllers/tourController");
const authController = require("../controllers/authController");

//Creating subapp for resources
const router = express.Router();

//Route
router.get("/check", tourController.checkConnection);
router
  .route(`/`)
  .get(authController.protect, tourController.getAllTours) //use middleware for protected route
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    tourController.creatTour
  );
router
  .route("/:id")
  .get(authController.protect, tourController.getTour)
  .patch(authController.protect, tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    tourController.deleteTour
  );

module.exports = router;
