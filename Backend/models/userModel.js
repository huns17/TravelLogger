//module import
const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

//Declaring new schema
const userSchema = new mongoose.Schema({
  name: {
    // schema type options,
    type: String,
    required: [true, "A user must have a name."], //validater
    unique: true,
    trim: true,
    maxlength: [10, "A name must have less or equal than 10 character."],
  },
  email: {
    type: String,
    required: [true, "A user must have a email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  photo: {
    type: String, //array of string
  },
  password: {
    type: String,
    required: [true, "A user must have a password."],
    minlength: [8, "A password must have more or equal than 10 character."],
    select: false, // not showing password output to client
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password."],
    validate: {
      // This only works on create(), save()
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same.",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: { type: Boolean, default: true, select: false },
});

//Document Middileware
// Password Encription middleware
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Dalete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

//Update chagedPasswordAt property for the current user
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//Query Middileware- something start with find
//Only showing user status with active
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Instance method - available for all document for certain collection
// Comparing password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Checking password changed
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Number(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    //Changed password
    return JWTTimestamp < changedTimestamp;
  }

  // User does not changed their password
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Declaring model
const User = mongoose.model("User", userSchema);

module.exports = User;
