/* eslint-disable arrow-body-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-require */
//Module import
const Tour = require("../models/tourModel");
const APIFeaturs = require("./apiFeatures");
//middle ware
//Preset query object

// Check Connection
exports.checkConnection = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    res.end("This is tour api gateway");
  } catch (err) {
    res.status(500).json({ status: "fail", err: err });
  }
};

exports.aliasTopTours = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage";
  req.query.fields = "name,ratingsAverage,summary,difficulty";
  next();
};

//Callback Function
exports.getAllTours = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  //Execute Query
  try {
    const features = new APIFeaturs(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    //Send response
    res.status(200).json({
      status: "success",
      result: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", err: err });
  }
};

exports.getTour = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    //same result for both
    const tour = await Tour.findById(req.params.id);
    // const tour = await Tour.findOne({ _id: req.params.id });

    //Error handling
    if (!tour) {
      return res.status(404).json({
        status: "fail",
        messsage: "No tour found with that ID",
      });
    }

    //Sending success response
    res
      .status(200)
      .json({ status: "success", result: tour.length, data: { tour } });
  } catch (err) {
    res.status(500).json({ status: "fail", err: err });
  }
};

exports.creatTour = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  const newTour = await Tour.create(req.body);
  res.status(201).json({ status: "success", data: { tour: newTour } });
};

exports.updateTour = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    //Error handling
    if (!tour) {
      return res.status(404).json({
        status: "fail",
        messsage: "No tour found with that ID",
      });
    }

    //Sending success response
    res.status(200).json({ status: "success", data: { tour: tour } });
  } catch (err) {
    res.status(500).json({ status: "fail", err: err });
  }
};

//Dont send any data back to client
exports.deleteTour = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    //Error handling
    if (!tour) {
      return res.status(404).json({
        status: "fail",
        messsage: "No tour found with that ID",
      });
    }

    //Sending success response
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({ status: "fail", err: err });
  }
};
