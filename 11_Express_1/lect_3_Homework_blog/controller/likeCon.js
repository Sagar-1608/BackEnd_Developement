
//import required database 

const Post = require("../model/postSchema");
const Like = require("../model/likeSchema");


// like controller 

exports.doLike = async(req, res)=>{
    try{

        // gett info from body 
        const {post , user } = req.body;
        // create new object of Like schema 
        const like = new Like(
            {
                post,user
            }
        )
        // save like in database 
        const savedLike= await like.save();

        // find the podt by id given in like and update the array of like in Post schema 

        const updatedPost = await Post.findByIdAndUpdate(post, {$push:{likes:savedLike._id}},{new:true})
                            .populate("likes").exec();

        // inside the findByIdAndUpdate
        //1-> post -id on that new like added
        //2-> $push - this push the  new like id in commmends array of Post 
        //3-> new:true - this return updated data from database 
        //4-> populate - it retuen the exact object of like otherwise only id will be come
        //5-> exec - excute the cuery
        res.json({
            like:savedLike,
        })

    }
    catch(err){
        return res.status(400).json({
            err:"error while comenting post ",
            error:err.message
        })

    }
}



//unlike Controller 
exports.unLike =  async (req,res)=>{

    try{
        //catch the post id ans like id 
        const {post, like} = req.body;

        //find and delete from like schema 

        const deletedLike = await Like.findOneAndDelete({post:post,_id:like});

        //find and updte the post by delete ($pull) like from like array of post schema 
        
        const updatedPost = await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id} }, {new:true});
        
      res.json({
           post:updatedPost,
      }) 

    }
    catch(err){
        return res.status(400).json({
            err:"error while unlike post ",
            error:err.message
        })

    }
}