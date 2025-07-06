const express= require('express');
const registeruser = require('../controller/register');
const upload = require('../middlewares/multer');
const loginuser = require('../controller/login');
const verifyJwt = require('../middlewares/verifyJwt');
const logout = require('../controller/logout');
const renewToken = require('../controller/token.renew');
const changepassword = require('../controller/change.password');
const { route } = require('../app');
const getuser = require('../controller/Getuser');
const updateavatar = require('../controller/updateavatar');
const multer = require('multer');
const getuserchannel = require('../controller/getuserprofile');
const getUserWithVideos = require('../controller/watchhistory');
const router = express.Router();

router.route("/registeruser").post(upload.fields(
    [
        {
            name:'avatar',
            maxCount:1
        }
    ]
),registeruser); 

router.route("/loginuser").post(loginuser);
router.route("/refershroken").post(renewToken)

// secured route
router.route("/logout").post(verifyJwt,logout)
router.route("/changepassword").post(verifyJwt,changepassword);
router.route("/getuser").post(verifyJwt,getuser)
router.route("/updateavatar").post(verifyJwt,upload.fields(
    [
        {
            name:"avatar",
            maxCount:1
        }
    ]
),updateavatar),
router.route("/getuserwithsubs").post(verifyJwt,getuserchannel),
router.route("/getuserwithvideodetails").post(verifyJwt,getUserWithVideos)
module.exports=router