
const mongoose = require("mongoose");
require("dotenv").config();

const connection = ()=>{

    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>console.log("Connection To DB successfully"))
    .catch((err)=>{
        console.log("Error to connection DB")
        console.log(err.message);
    })

}

module.exports = connection;