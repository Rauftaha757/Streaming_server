const express= require('express');
const registeruser = require('../controller/register');
const router = express.Router();

router.route("/registeruser").post(registeruser); 

module.exports=router