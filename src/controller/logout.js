const usermodel = require("../model/user.model");
const ApiErrors = require("../utils/ApiErrors.js");
const ApiResponse = require("../utils/ResponseHandles.js");

const logout = async function (req, res, next) {
  try {
    const user = req.user; 

    // const userfound = await usermodel.findById(user._id);
    // if (!userfound) {
    //   throw new ApiErrors(404, "User not found");
    // }

    // userfound.refreshtoken = null;

    // await userfound.save({ validateBeforeSave: false }); 


    // better approch

    await usermodel.findByIdAndUpdate(user._id,
        {
            $set:
            {
                refreshtoken:undefined
            }
        }
    )
    res.status(200).json(
      new ApiResponse(200, "User logged out successfully")
    );
  } catch (error) {
    next(error); 
  }
};

module.exports = logout;
