const express =require("express");
const router = express.Router();

//controller
const {createTodo}=require("../controllrers/createTodo");
const {getTodo, getTodoById} =require("../controllrers/getTodo");
const {updateTodo} =require("../controllrers/updateTodo");
const { deleteTodo } = require("../controllrers/deleteTodo");


// routes

// for create post is there 
// define api routes
router.post("/createTodo",createTodo);

//for get data from todo
router.get("/getTodos",getTodo);

// for get data by id
router.get("/getTodos/:id",getTodoById); 

// update the data by id 
router.put("/updateTodo/:id",updateTodo);

//delete by id 
router.delete("/deleteTodo/:id", deleteTodo);

module.exports =router;
