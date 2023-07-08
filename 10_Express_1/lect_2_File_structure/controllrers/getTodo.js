const Todo = require("../models/Todo");


// fetched all data 
exports.getTodo = async (req, res) => {
  try {
    //fetch data from todo database
    const todos = await Todo.find({}); // fetch all data from database

    res.status(200).json({
      success: true,
      data: todos,
      message: "Data fetched from todo successfully",
    });
    console.log("Data fetched successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: true,
      error: err.message,
      message: "Server error",
    });
  }
};



//for geting data by id 
exports.getTodoById = async (req, res) => {
  try {
    // find the id from url
    const id = req.params.id; // fetch id from the url

    //fetch data from todo database for fetched id
    const todos = await Todo.findById({ _id: id }); // fetch data from database by id

    //if todos not generate
    if (!todos) {
      return res.status(404).json({
        success: false,
        message: "Data not fetched with id ",
      });
    }


    res.status(200).json({
      success: true,
      data: todos,
      message: `Data fetched by id ${id} successfully`,
    });
    console.log(`Data fetched by id ${id} successfully`);
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
