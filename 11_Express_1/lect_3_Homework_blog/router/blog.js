//import
const express =require("express");
const router = express.Router();

//import controller 
const {createPost,viewPost}=require("../controller/postCon");
const { commentPost } = require("../controller/commentCon");
const { doLike, unLike } = require("../controller/likeCon");



//routes 
router.post("/post/create",createPost);
router.get("/post",viewPost);
router.post("/comments/create",commentPost);
router.post("/likes/like",doLike);
router.post("/likes/unLike",unLike)


//export
module.exports =router;
