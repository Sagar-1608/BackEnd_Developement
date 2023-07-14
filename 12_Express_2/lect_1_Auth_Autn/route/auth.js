const express= require("express");
const router = express.Router();

const {Login, Signup} = require("../controller/Auth");

//import middleware 
const {AuthN, Student, Admin} =require("../Middleware/authMW")


router.post("/login", Login);
router.post("/signup",Signup);


//protected Route with middleware 
//here Auth is middle ware tath check the authN of user and then callback function called
router.get("/test",AuthN,(req,res)=>{
    res.send("Testing  of AuthN successfully ")
} )


// here first of all middleware authN done then go to student for authz and then router handler will be call
router.get("/student",AuthN,Student,(req,res)=>{
    res.send("On Student Dashbord successfully ")
} )

router.get("/admin",AuthN,Admin,(req,res)=>{
    res.send("On Admin Dashbord successfully ")
} )

module.exports = router;

