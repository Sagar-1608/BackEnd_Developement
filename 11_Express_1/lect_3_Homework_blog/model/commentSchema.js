//import mongoose 
const mongoose = require("mongoose");


//rout Handler 
const commentSChema = new mongoose.Schema({
   
    // in this post we store the id of the post that liked by this user  
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post" //refer to post model
    },
    user:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
})

//export 
module.exports =mongoose.model("Comment",commentSChema)