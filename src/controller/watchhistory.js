const mongoose = require("mongoose");
const usermodel = require("../model/user.model");
const ApiErrors = require("../utils/ApiErrors");
const ApiResponse = require("../utils/ResponseHandles");

const getUserWithVideos = async (req, res) => {
  const userId = req.params.id; // or req.user._id if from token

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json(new ApiErrors(400, "Invalid or missing user ID"));
  }

  try {
    const user = await usermodel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "videos",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$owner", "$$userId"],
                },
              },
            },
            {
              $lookup: {
                from: "users", // Mongoose pluralizes 'Users' to 'users'
                localField: "owner",
                foreignField: "_id",
                as: "ownerInfo",
              },
            },
            {
              $addFields: {
                owner: { $first: "$ownerInfo" },
              },
            },
            {
              $project: {
                ownerInfo: 0,
                "owner.password": 0,
                "owner.refreshtoken": 0,
                "owner.email": 0,
                "owner.__v": 0,
              },
            },
          ],
          as: "watchHistory",
        },
      },
      {
        $project: {
          password: 0,
          refreshtoken: 0,
          __v: 0,
        },
      },
    ]);

    if (!user || user.length === 0) {
      return res.status(404).json(new ApiErrors(404, "User not found"));
    }

    return res
      .status(200)
      .json(ApiResponse(200, "User and videos found", user[0]));
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json(new ApiErrors(500, "Something went wrong: " + err.message));
  }
};

module.exports = getUserWithVideos;
