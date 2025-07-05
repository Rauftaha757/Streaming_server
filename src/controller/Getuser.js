// get user
// by jwt middleware

const usermodel = require("../model/user.model");
const ApiErrors = require("../utils/ApiErrors");
const ApiResponse = require("../utils/ResponseHandles");

const getuser =async (req,res) => {
    const userid=req.user._id;
const fulluser=await usermodel.findById(userid).select("-password");
if(!fulluser){
    throw new ApiErrors(401,"User not exsists");
}
res.status(200).json(
   new ApiResponse(200,"User found",fulluser)
)
}

module.exports=getuser;