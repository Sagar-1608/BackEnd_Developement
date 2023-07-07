

//server instantiate
const express = require('express');
//take rexpress as app for use
const app = express();

//activate server on port 3000 
app.listen(3000,()=>{
    console.log("server started");
});

//Body Parser
// used in put and Post request to parse req.body in express
const bodyParser = require('body-parser');

//specificaly parse JSON data and it to te request.body object 
app.use(bodyParser.json())


//Routs
//to send responce to route / as hello world 
app.get('/',(request,response)=>{
    response.send("Hello World");
})

app.post('/api/car',(request,response)=>{
    const {name, brand} =request.body;
    console.log(name);
    console.log(brand);
    response.send("Car responce send succesfully");
})

