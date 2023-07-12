const Todo = require("../models/Todo");

//for update data by id 
exports.deleteTodo = async (req, res) => {
    try {
      // find the id from url
      //const id = req.params.id; // fetch id from the url
       const {id} = req.params;
 
  
      //delete the given data by id 
      const todos =  await Todo.findByIdAndDelete({ _id: id }); 
 
  
      res.status(200).json({
        success: true,
        data: todos,
        message: `deleted by id ${id} successfully`,
      });
      console.log(`Data deleted by id ${id} successfully`);
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
  