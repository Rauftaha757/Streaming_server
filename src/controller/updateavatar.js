const upload = require("../middlewares/multer");
const usermodel = require("../model/user.model");
const ApiErrors = require("../utils/ApiErrors");
const { uploadoncloud } = require("../utils/cloudinary");

const updateavatar = async function (req, res) {
  try {
    const localFilePath = req.files?.avatar?.[0]?.path;

    if (!localFilePath) {
      throw new ApiErrors(400, "No avatar file provided.");
    }

    // Upload to Cloudinary
    const uploadResult = await uploadoncloud(localFilePath);
    if (!uploadResult?.url) {
      throw new ApiErrors(500, "Failed to upload image to Cloudinary.");
    }

    // Find the user by ID
    const user = await usermodel.findById(req.user?._id);
    if (!user) {
      throw new ApiErrors(401, "User not found.");
    }

    // Update avatar
    user.avatar = uploadResult.url;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      message: "Avatar updated successfully.",
      avatarUrl: uploadResult.url,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = updateavatar;
