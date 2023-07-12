//import mongoose 
const mongoose = require("mongoose");

//Rout Handler 
const likeSchema = new mongoose.Schema({
  // this post parameter store post id that liked by this user 
  post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post" //refer to post model
  },
  user:{
    type:String,
    required:true
  }

});

module.exports =  mongoose.model("Like",likeSchema);