const Todo = require("../models/Todo");

//for update data by id 
exports.updateTodo = async (req, res) => {
    try {
      // find the id from url
      const id = req.params.id; // fetch id from the url
    //    const {id} = req.params;
       const {title,description}= req.body;
  
      //update the given data by id 
      const todos =  await Todo.findByIdAndUpdate(
        { _id: id },
        {title,description,updateAt:Date.now()}); 
 
  
      res.status(200).json({
        success: true,
        data: todos,
        message: `Updated by id ${id} successfully`,
      });
      console.log(`Data updated by id ${id} successfully`);
    }
     catch (err) {
      console.error(err);
      res.status(500).json({
        success: true,
        error: err.message,
        message: "Server error",
      });
    }
  };
  