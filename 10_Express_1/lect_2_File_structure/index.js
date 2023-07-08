
const express = require("express");
const app = express();

//load config from env file 
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware  to parse the json request
app.use(express.json());


// import routes for Todo Api 
const todoRoutes =require("./routes/todos");

//mount the api (for controll the version)
app.use("/api/v1",todoRoutes);

//start server
app.listen(PORT,()=>{
    console.log("App is running successfully");
});

//connect the DB
const dbConnect = require("./config/database");
dbConnect();

//default route 
app.get("/",(req,res)=>{
    res.send(`<h1>This is Home Page  </h1>`)
});




