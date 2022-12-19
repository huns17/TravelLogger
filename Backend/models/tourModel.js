/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
//Module import
const mongoose = require("mongoose");
// const validator = require("validator");

//Declaring new schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      // schema type options,
      type: String,
      required: [true, "A tour must have a name."], //validater
      unique: true,
      trim: true,
      min: 6,
      // validate: [validator.isAlpha, "Tour name must be an alphabetic string."],
    },
    duration: {
      type: Number,
      required: [true, "A tour must have a duration."],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must a group difficulty."],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either easy, medium, difficult",
      },
    },
    ratingAverage: { type: Number, min: 1, max: 5 },
    ratingQuantity: { type: Number, default: 0 },
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a description."],
    },
    description: {
      type: String,
      trim: true,
    },
    createdAt: { type: Date, default: Date.now(), select: false },
    startDates: { type: Date },
    location: {
      // schema type options,
      type: String,
      required: [true, "A tour must have a location."], //validater
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
    isTourCompleted: {
      type: Boolean,
      required: [true, "A tour must have a isTourCompleted."],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//Virtual property
tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

//Document middleware run before .save() and .create() but not .insertMany
tourSchema.pre("save", function (next) {
  console.log(this);
  next();
});

tourSchema.pre("save", function (next) {
  console.log("will save document...");
  next();
});

//Post middleware
tourSchema.post("save", function (doc, next) {
  next();
});

//Query Middleware
//anything starting with find will be trigger this middleware
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.post(/^find/, function (doc, next) {
  next();
});

//Aggregation Middlewares
tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

// Declaring model
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
