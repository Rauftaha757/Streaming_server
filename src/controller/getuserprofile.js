const mongoose = require("mongoose");
const usermodel = require("../model/user.model");
const ApiErrors = require("../utils/ApiErrors");
const ApiResponse = require("../utils/ResponseHandles");

const getuserchannel = async function (req, res) {
  const { username } = req.body;
  const currentUserId = new mongoose.Types.ObjectId(req.user._id); // <-- JWT user ID

  if (!username) {
    return res.status(400).json(new ApiErrors(400, "Username not provided"));
  }

  try {
    const channelData = await usermodel.aggregate([
      {
        $match: {
          username: username.toLowerCase(),
        },
      },
      {
        $lookup: {
          from: "subscriptions",
          localField: "_id",
          foreignField: "channel",
          as: "channelSubscribers",
        },
      },
      {
        $lookup: {
          from: "subscriptions",
          let: { channelId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$channel", "$$channelId"] },
                    { $eq: ["$subscriber", currentUserId] },
                  ],
                },
              },
            },
          ],
          as: "isSubscribedArray",
        },
      },
      {
        $addFields: {
          subscriberCount: { $size: "$channelSubscribers" },
          isSubscribed: {
            $cond: {
              if: { $gt: [{ $size: "$isSubscribedArray" }, 0] },
              then: true,
              else: false,
            },
          },
        },
      },
      {
      $project: {
    password: 0,
    refreshtoken: 0,
    isSubscribedArray: 0 
  }
      },
    ]);

    if (!channelData || channelData.length === 0) {
      return res.status(404).json(new ApiErrors(404, "Channel not found"));
    }

    res.status(200).json(ApiResponse(200, "Channel found", channelData[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json(new ApiErrors(500, err.message));
  }
};

module.exports = getuserchannel;
