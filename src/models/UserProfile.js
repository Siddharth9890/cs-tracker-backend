const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have a email"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minLength: 8,
    select: false,
  },
  token: {
    type: String,
  },
  joiningDate: {
    type: Date,
    default: new Date(),
  },
  role: {
    type: String,
    default: "user",
  },
});

// hash the password while saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 15);
  next();
});

// verify the password
userSchema.methods.correctPassword = async function (
  userPassword,
  inputPassword
) {
  return await bcrypt.compare(userPassword, inputPassword);
};

// generate jwt token for a user by id which is valid for 7 days
userSchema.methods.generateJWTToken = async function () {
  const token = await jwt.sign(
    { _id: this._id.toString() },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  this.token = token;
  await this.save();
  return token;
};

const UserProfileModel = mongoose.model("UserModel", userSchema);

module.exports = UserProfileModel;
