
// import required schema

const Post = require("../model/postSchema");

//write controler to add data in database 
exports.createPost = async(req,res)=>{

    try{
        //request required parrameter from body 
        const {title,body}=req.body;
        //by save method save the parameter in DB
        const post = new Post({
            title,body,
        })

        const savePost = await post.save();

        res.json({
            post:savePost,
        })

    }
    catch(err){
        return res.status(400).json({
            err:"error while creating post "
        })

    }
}



// Write controller for View All post 

exports.viewPost = async(req,res)=>{
    try{
        const posts = await Post.find({});
        res.json({
            post:posts
        })
    }
    catch(err){
        return res.status(400).json({
            err:"error while creating post "
        })

    }
}