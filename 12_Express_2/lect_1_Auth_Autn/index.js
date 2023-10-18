
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const connection = require("./config/connection");
const route = require("./route/auth")

//cookie parser 
// adding cookies in main index file 
const cookieParser = require("cookie-parser")
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1",route);

connection();
app.listen(PORT,()=>console.log("RUN ON PORT 3000"))

app.get("/",(req,res)=>{
    res.send("THIS IS LOGIN PAGE");
})


