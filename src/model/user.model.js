const mongoose=require('mongoose')

const UserSchema= new mongoose.Schema({
 watchHistory: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "videomodel"
}]
,
   username:{
    type:String,
    required:true,
    unique,
    lowercase:true,
    index:true
   },
   email:{
    type:String,
    required:true,
    lowercase:true,
    unique:true,
    trim:true,
    validate: {
        validator : function(v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message:"Invalid Email"
    }
   },
   password:{
    type:String,
    required:true,
    trim:true,
    validate:{
        validator: function(pass){
            return  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass);
        },
      message: "Password must be at least 8 characters long and include at least one letter and one number."
    }
   },
   fullname: {
    type:String,
    required:true
   },
   avatar:{
    type:String,
   },
   refreshtoken:{
     type:String,
   }
},{timestamps:true})

const usermodel =mongoose.model("Users",UserSchema);
module.exports = usermodel