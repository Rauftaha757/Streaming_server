const usermodel = require("../model/user.model");
const ApiErrors = require("../utils/ApiErrors.js");
const { uploadoncloud } = require("../utils/cloudinary.js");
const ApiResponse = require("../utils/ResponseHandles.js");
const registeruser = async function (req, res) {
  const { fullname, username, password, email } = req.body;
  if (
    [fullname, username, password, email].some(
      (fields) => !fields || fields.trim() === "",
    )
  ) {
    throw new ApiErrors(400, "All fields required");
  }
  // check if user doesnot exsists
  else {
    const userexsists = await usermodel.findOne({
      $or: [{ email }, { username }],
    });
    if (userexsists) {
      throw new ApiErrors(409, "User already Exsits");
    }

    // uploading on server by multer to get path

    const avatarlocalpath = req.files?.avatar[0].path;
    if (!avatarlocalpath) {
      throw new ApiErrors(400, "Avatar is required");
    }

    console.log("Local file path:", avatarlocalpath);

    const checkupload = await uploadoncloud(avatarlocalpath);
    if (!checkupload) {
      throw new ApiErrors(
        400,
        "Avatar upload failed. Please check your Cloudinary configuration.",
      );
    }

    // everything checked now make user document

    // creating user

    const Usercreated = await usermodel.create({
      fullname,
      email,
      password,
      username: username.toLowerCase(),
      avatar: checkupload.url,
    });

    // removing password in response

    const originaluser = await usermodel
      .findById(Usercreated._id)
      .select("-password -refreshtoken");

    return res
      .status(200)
      .json(new ApiResponse(200, "User registered successfully", originaluser));
  }
};

module.exports = registeruser;
