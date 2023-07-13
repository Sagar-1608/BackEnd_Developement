const { json } = require("express");
const User =require("../module/userSchema");
const bcrypt = require("bcrypt")


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
        const {name, email, password, role} = req.body;

        const user = new User({
            name, email, password, role
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