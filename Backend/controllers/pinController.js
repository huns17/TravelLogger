// Module Import
const Pin = require("../models/pinModel");
const mongoose = require("mongoose");

// Check Connection
exports.checkConnection = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    res.end("This is pin api gateway");
  } catch (err) {
    res.status(500).json({ status: "fail", err: err });
  }
};

// Create a pin object
exports.creatPins = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json({ status: "success", data: savedPin });
  } catch (err) {
    res.status(500).json({ status: "fail", err: err });
  }
};

// Delete a pin object
exports.deletePins = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  const pin = await Pin.findByIdAndRemove(mongoose.Types.ObjectId(id));

  // Error handling
  if (!pin) {
    return res.status(404).json({
      status: "fail",
      message: "No pin found with that ID",
    });
  }

  //Sending success response
  res.status(204).json({ status: "success", data: null });
};

// Get all pin
exports.getAllPins = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const pins = await Pin.find();
    res.status(200).json({ status: "success", data: pins });
  } catch (err) {
    res.status(500).json({ status: "fail", err: err });
  }
};
