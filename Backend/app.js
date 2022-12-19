/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-require */
//Module import
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const userRouter = require("./routes/userRoutes");
const pinRouter = require("./routes/pinRoutes");
const tourRouter = require("./routes/tourRoutes");
const cors = require("cors");

//Start up server
const app = express();

// //Allow cors
app.use(cors({ credentials: true, origin: true }));

//Middleware - Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" })); //body larger than 10kb cannot be accepted

//Data Sanitization against NOSQL Query Injection - removing dollar sign
app.use(mongoSanitize());

//Data Sanitization against XXS - clean any of malicious html code - convert html symbol
app.use(xss());

//For development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Global middleware-Security HTTP Header
app.use(helmet());

// Global middleware-Limit excessive access from same ip
const limiter = rateLimit({
  //Max 100 request for one hour
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

// limiter function is applied to all route starting with api
app.use(`/api`, limiter);

//Defining new Global middleware that requesting time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Mounting new Router
app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/pins`, pinRouter);
app.use(`/api/v1/tours`, tourRouter);

//Handle wrong route
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Cant find ${req.originalUrl} on this server!`,
  });
  next();
});

module.exports = app;
