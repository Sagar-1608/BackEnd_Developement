
// import mongoose
const mongoose = require('mongoose');

//npm i dotenv   --> for use to evn file data
// import env 
require("dotenv").config();


const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL ,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>console.log("connection success"))
    .catch((err)=>{
        console.log("Error in connection");
        console.log(err.message);

        //
        process.exit(1)
    })
}


module.exports =dbConnect;
