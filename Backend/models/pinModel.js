// Module import
const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "A pin must have a user name."], //validater
    },
    title: {
      type: String,
      required: [true, "A pin must have a title."], //validater
      min: 3,
    },
    rating: {
      type: Number,
      required: [true, "A pin must have a rating."], //validater
      min: 0,
      max: 5,
    },
    desc: {
      type: String,
      required: [true, "A pin must have a description."], //validater
    },
    lat: {
      type: Number,
      required: [true, "A pin must have a latitude."], //validat
    },
    long: {
      type: Number,
      required: [true, "A pin must have a longitude."], //validat
    },
  },
  { timestamps: true }
);
// Another way to declaring model

module.exports = mongoose.model("Pin", PinSchema);
