//Importing modules
const User = require("../models/userModel");

//Suppliment function
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
// Check Connection
exports.checkConnection = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    res.end("This is user api gateway");
  } catch (err) {
    res.status(500).json({ status: "fail", err: err });
  }
};

//Callback functions
exports.getAllUser = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    console.log(req.user);
    const users = await User.find();

    //Send response
    res.status(200).json({
      status: "success",
      result: users.length,
      data: { users },
    });
  } catch (err) {
    return res.status(400).json({ status: "fail", err: err });
  }
};

exports.updateMe = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // 1) Create error if user POST password data
  if (req.body.password || req.body.passwordConfirm) {
    return res.status(400).json({
      status: "fail",
      message:
        "this route is not for password update. plase use /updateMyPassword",
    });
  }

  // 2) Filter out unwanted fields
  const filterBody = filterObj(req.body, "name", "email");

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ status: "success", data: { user: updatedUser } });
};
