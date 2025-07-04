const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const fs = require("fs");
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.api_secret;
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadoncloud = async function (localfilepath) {
  try {
    if (!localfilepath) {
      return null;
    } else {
      // uplod on clouudinary
      const response = await cloudinary.uploader.upload(localfilepath, {
        resource_type: "auto",
      });
      console.log("File uploaded on cloudinary", response.url);
      fs.unlinkSync(localfilepath);
      return response;
    }
  } catch (error) {
    fs.unlinkSync(localfilepath);
    return null;
  }
};

module.exports = { cloudinary, uploadoncloud };
