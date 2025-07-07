// check if user looged in then allow to change
//if logged in , then ---> retrive id from verify jwt
// find that id in database
// found? then -->update password field by bcrypted new pass
//check old password also(by Ispassword correct method)

const { default: mongoose } = require("mongoose");
const usermodel = require("../model/user.model");
const ApiErrors = require("../utils/ApiErrors");
const ApiResponse = require("../utils/ResponseHandles.js");

const changepassword = async function (req, res) {
  const { oldpass, newpass } = req.body;
  //by jwt
  const userid = req.user?._id;
  const User = await usermodel.findById(userid);
  if (!User) {
    throw new ApiErrors(404, "User not found");
  }
  // checling old pass is correct?
  const correct = await User.isPasswordCorrect(oldpass);
  if (!correct) {
    throw new ApiErrors(401, "Old password Incorrect");
  }
  User.password = newpass;
  await User.save();
 
  res.status(200).json(new ApiResponse(200, "Your password changed"));
};
module.exports = changepassword;
