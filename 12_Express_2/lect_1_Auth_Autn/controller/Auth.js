const { json } = require("express");
const User =require("../module/userSchema");

// this is  for to crrate the password security 
// this bcrypt done password in to incripted format 
const bcrypt = require("bcrypt");

const jwt= require("jsonwebtoken");
const { options } = require("../route/auth");

require("dotenv").config();


exports.Signup = async (req, res)=>{
    try{

        //get data from body
        const {name, email, password, role} = req.body;

        //if alrady exits 
        const alradyExit = await User.findOne({email});

        if(alradyExit)
        {
            return res.status(400).json({
                success:false,
                message:"User alrady exist"
            })

        }
      

        // secure Password 

        let hashedPassword;

        try{
            //by using the bcript we can hashed the password 

            hashedPassword = await bcrypt.hash(password,10);
            // here password is input password from user and 10 is round to hashing
        }
        catch(err)
        {
            return res.status(500).json({
                success:false,
                message:"Error in Hashing ythe password"
            })
        }



        //create entry in DB
        const user = new User({
            name, email, password:hashedPassword, role
        })

        const sevedUser = await user.save();

        res.json({
            user: sevedUser,
            message:"saved",
        })

    }
    catch(err){
        res.json({
            error : err.message,
            message: "error to insert "

        })

    }

}


exports.Login = async (req, res)=>{
    try{
        // fetch data from body 
        const {email, password} = req.body;

        // if ay fild is empty 
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please Fill all Filds",
            })
        }
        // check the user is is exsit or not 

         userExists = await User.findOne({email});
        if(!userExists){
            return res.status(401).json({
                success:false,
                message:"User Does't userExists",
            })

        }

        const payload = {
            email:userExists.email,
            id:userExists._id,
            role:userExists.role,

        }

       // varify the  password and send the cookie 
       if(await bcrypt.compare(password, userExists.password)){


        //parameter in sign is payload , secrit key and the optiion 
        let token =jwt.sign(payload, 
                             process.env.JWT_SECRET,   
                             {expiresIn:"2h"});

        userExists= userExists.toObject();
        userExists.token=token;
        userExists.password=undefined;


        const options={
            expires: new Date(Date.now() + 3*24*60*60*1000), // after 3 day it will be expire
            httpOnly:true                                   // clint can not change in cookie 
        }


        // creating cookie and sendnd in response  
        // res.cookie("token",token, options).status(200).json({
        //     success:true,
        //     token,
        //     userExists,
        //     message:" user logged in sussesfully "
        // })

        res.status(200).json({
            success:true,
            token,
            userExists,
            message:" user logged in sussesfully "
        })

       }
       else 
       {
        return res.status(401).json({
            success:false,
            message:"Password incorrect",
        })



       }

    }
    catch(err){
        res.json({
            error : err.message,
            message: "Login Failuer     "

        })

    }

}