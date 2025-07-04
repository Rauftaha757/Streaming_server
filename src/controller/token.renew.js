const jwt = require("jsonwebtoken");
const ApiErrors = require("../utils/ApiErrors");
const ApiResponse = require("../utils/ResponseHandles");
const usermodel = require("../model/user.model");

const renewToken = async function (req, res, next) {
  try {
    const { tokenString } = req.body;

    if (!tokenString) {
      throw new ApiErrors(401, "Refresh token is not provided");
    }

    const decode = jwt.verify(tokenString, process.env.REFRESH_TOKEN_SECRET);
    const userId = decode._id;

    const userinfo = await usermodel.findById(userId);
    if (!userinfo || userinfo.refreshtoken !== tokenString) {
      throw new ApiErrors(403, "Invalid or expired refresh token");
    }
    const newAccessToken = userinfo.generateaccesstoken();
    const newRefreshToken = userinfo.generaterefreshtoken();
    userinfo.refreshtoken = newRefreshToken;
    await userinfo.save({ validateBeforeSave: false });
    res.status(200).json(
      new ApiResponse(200, "Token refreshed successfully", {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      })
    );
  } catch (error) {
    next(error);
  }
};

module.exports = renewToken;
