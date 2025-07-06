const mongoose = require('mongoose')

const VideoSchema=new mongoose.Schema({

videofile:{
    type:String,
    required:true,
    trim:true
},
thumbnail:{
    type:String,
    required:true,
    trim:true
},
owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users"
},
title:{
    type:String,
    required:true,
    trim:true
},
views:{
    type:Number,
    default:0,
    min:0
},
description:{
     type:String,
    required:true,
},
isPublished:{
    type:Boolean,
    default:false
},
duration:{
    type:Number,
    default:0,
    min:0
},

},{timestamps:true});

const videomodel = mongoose.model("videos",VideoSchema);

module.exports=videomodel