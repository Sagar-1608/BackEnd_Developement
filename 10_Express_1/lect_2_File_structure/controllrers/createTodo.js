 

 // import the model 
 const Todo=require("../models/Todo")

 //define router handler 

 exports.createTodo=async (req,res)=>{
    try{
        //extract title and description from request body
        const {title,description}=req.body;
        //create new todo obj and insert in db
        const responce = await Todo.create({title,description});
        //send json responce with success flag
        res.status(200).json(
            {
                success:true,
                data:responce,
                message:'entry Created Successfully'
            }
        );

    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500)
        .json(
            {
                success:true,
                data:"internal server error",
                message:err.message
            }
        )

    }
 }