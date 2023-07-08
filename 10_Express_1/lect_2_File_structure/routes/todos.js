const express =require("express");
const router = express.Router();

//controller
const {createTodo}=require("../controllrers/createTodo");

// routes

// for create post is there 
// define api routes
router.post("/createTodo",createTodo);

module.exports =router;
