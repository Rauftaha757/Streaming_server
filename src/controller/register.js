
const usermodel = require('../model/user.model');
const ApiErrors = require('../utils/Apierror');
const registeruser = async function (req, res) {
const {name,username,password,email}=req.body;
if ([name,username,password,email].some((fields)=> fields.trim() === "")){
    throw new ApiErrors(400,"All fields required")
}
// check if user doesnot exsists

const userexsists = await usermodel.findOne({ $or: [{ email }, { username }] });
if(userexsists){
    throw ApiErrors(409,"User already Exsits");
}


};

module.exports = registeruser;
