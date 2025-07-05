const usermodel = require("../model/user.model");
const ApiErrors = require("../utils/ApiErrors.js");
const ApiResponse = require("../utils/ResponseHandles.js");

const loginuser = async function (req, res, next) {
  try {
    const { email, username, password } = req.body;

    if ([email, password].some((field) => !field || field.trim() === "")) {
      throw new ApiErrors(400, "Please fill required fields");
    }

    const userexist = await usermodel.findOne({
      $or: [{ email }, { username }],
    });

    if (!userexist) {
      throw new ApiErrors(400, "User does not exist");
    }

    const isPasswordCorrect = await userexist.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new ApiErrors(400, "Invalid credentials");
    }
    const refreshToken = await userexist.generaterefreshtoken();
    const accessToken = await userexist.generateaccesstoken();

    // Save refresh token
    userexist.refreshtoken = refreshToken;
    
    await userexist.save({validateBeforeSave:false});

    res.status(200).json(
      new ApiResponse(200, "User Logged in Successfully", {
        _id: userexist._id,
        username: userexist.username,
        email: userexist.email,
        avatar: userexist.avatar,
        fullname: userexist.fullname,
        accessToken,
        refreshToken,
      })
    );
  } catch (err) {
    next(err);
  }
};



module.exports = loginuser;
