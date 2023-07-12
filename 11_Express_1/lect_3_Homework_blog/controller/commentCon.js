// import required schema

const Post = require("../model/postSchema");
const Comment =require("../model/commentSchema")

//write controler to add data in database 
exports.commentPost = async(req,res)=>{

    try{
        //request required parrameter from body 
        const {post,user,body}=req.body;
        //by save method save the parameter in DB
        const comment = new Comment({
            post,user,body
        })

        const savedComment = await comment.save();

        //find the post by id mentain in comment and 
        //add this coment in the post of comment array 
        const updatedPost = await Post.findByIdAndUpdate(post,{$push: {comments:savedComment._id}} ,{new:true})
                                                        .populate("comments").exec();

        // inside the findByIdAndUpdate
        //1-> post -id on that new comment added
        //2-> $push - this push the  new comment id in commmends array of Post 
        //3-> new:true - this return updated data from database 
        //4-> populate - it retuen the exact object of comment otherwise only id will be come
        //5-> exec - excute the cuery

        res.json({
            comment:updatedPost, 
        })

    }
    catch(err){
        return res.status(400).json({
            err:"error while comenting post ",
            error:err.message
        })

    }
}

