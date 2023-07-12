
const express = require("express");
const app = express();

//for database conection 
const connection =require("./config/connection");
//routs 
// import routes for api
const BlogRoutes =require("./router/blog");
// access port no from the env file 
require("dotenv").config();
const PORT = process.env.PORT || 3000;



//required for app
//middleware  to parse the json request
app.use(express.json());
//mount the api (for controll the version)

app.use("/api/v1",BlogRoutes);


//server start 
app.listen(PORT,()=>{
    console.log("App running successFully");
}
)
// db connection 
connection();

//default route
app.get("/",(req,res)=>{
    res.send("hello every one");
})

