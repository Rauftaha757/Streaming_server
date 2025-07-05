const mongoose = require("mongoose");
require("dotenv").config();
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "videomodel",
      },
    ],
    username: {
      type: String,
      required: true,
      unique:true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Invalid Email",
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (pass) {
          return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass);
        },
        message:
          "Password must be at least 8 characters long and include at least one letter and one number.",
      },
    },
    fullname: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    refreshtoken: {
      type: String,
    },
  },
  { timestamps: true },
);

//use of pre hook

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// passsword comparison

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// JWT access token
UserSchema.methods.generateaccesstoken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// refresh token
UserSchema.methods.generaterefreshtoken = async function (){
  return jwt.sign({
    _id:this._id
  },
process.env.REFRESH_TOKEN_SECRET,
{
  expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
}

)
}
//plugin aggreegation
UserSchema.plugin(mongooseAggregatePaginate);

const usermodel = mongoose.model("Users", UserSchema);
module.exports = usermodel;
