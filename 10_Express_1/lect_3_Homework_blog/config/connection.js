
// import mongoose
const mongoose = require("mongoose");

//to acceess evu file 
require("dotenv").config();



const connection = ()=>{

    mongoose.connect(process.env.Database_url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log("Connection Dtatabase successfully"))
    .catch((err)=>{
        console.log(err.message);
        console.log("Error in connection");
        process.exit(1) // error occure
    })

}

module.exports =connection;