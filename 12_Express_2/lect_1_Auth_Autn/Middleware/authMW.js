const jwt = require("jsonwebtoken");
require("dotenv").config();

// here next for call the next middle ware
exports.AuthN = (req, res, next) => {
  try {
    //get jwt token from body
    // other method also are there

    // there are three method  for access the tocken 
    console.log("body :", req.body.token);
    console.log("cookie :",  req.cookies.token );
    console.log("Header : ",req.header("Authorization"))

    const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");

    // token is not there
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token Missing",
      });
    }

    //decode the tocken
    //varifiy  the  token

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      req.user = decoded;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token Invalid",
      });
    }

    next(); // call for next middle ware ;
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Something went worng ",
    });
  }
};

exports.Student =(req,res, next)=>{
    try{
        const role = req.user.role;

        if(role!=="Student")
        {
          return   res.status(401).json({
                success: false,
                message: "This is protected route for Student not allowed other than Student",
              });

        }
        next();

    }catch(error){
        res.status(401).json({
            success: false,
            message: "err to student dashbord  ",
          });

    }
}

exports.Admin =(req,res, next)=>{
    try{
        const role = req.user.role;

        if(role!=="Admin")
        {
          return   res.status(401).json({
                success: false,
                message: "This is protected route for Admin not allowed other than Admin ",
              });

        }
        next();

    }catch(error){
        res.status(401).json({
            success: false,
            message: "err to Admin dashbord ",
          });

    }
}
