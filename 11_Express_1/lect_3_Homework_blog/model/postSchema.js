
//import mongoose 
const mongoose = require("mongoose");

//route handler 

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like" //refer to like model id 
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",  // refer to comment model id
    }]
}) 

module.exports = mongoose.model("Post",postSchema);








