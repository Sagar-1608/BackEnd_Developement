const { Console } = require("console");
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
  try {
    //fetch filefrom request
    const file = req.files.file;
    console.log("FILE AAGYI JEE -> ", file);

    //create path where file need to be stored on server
    // let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
    let path =
      "E://BackEnd_Developement//13_File_Handeling//lect_1_File_Upload//Media/" +
      Date.now() +
      `.${file.name.split(".")[1]}`;
    //this is for brak and get extention from file name
    console.log("PATH-> ", path);

    //add path to the move fucntion
    file.mv(path, (err) => {
      console.log(err);
    });

    //create a successful response
    res.json({
      success: true,
      message: "Local File Uploaded Successfully",
    });
  } catch (error) {
    console.log("Not able to upload the file on server");
    console.log(error);
  }
};







// image uploade handler

// chechking the extention of file
function isSupported(supported, extention) {
  return supported.includes(extention);
}


//this function uoloade the files on cloudinary 
async function uploadOnCloudinary(file, folder,quality,width) {
  const options = { folder:folder, use_filename:true, unique_filename:false,public_id:file.name};
  options.resource_type="auto";
  if(quality && !width)
  {
    options.quality=quality;
  }
  if(quality && width)
  {
    options.height=quality
    options.width=width
  }

  return await cloudinary.uploader.upload(file.tempFilePath, options);
  // cloudinary.uploader.upload("my_image.jpg", use_filename => true, unique_filename => false)
}

exports.imageUpload = async (req, res) => {
  try {
    // fetch data from body
    const { name, email, tags } = req.body;
    console.log();

    // fetch file form body files
    const file = req.files.imageFile;
    // console.log(file);
    // validate the file
    const supported = ["jpg", "png", "jepg"];
    const extention = file.name.split(".")[1].toLowerCase();
    console.log(extention);

    // if the extention is not supported  reeturn error
    if (!isSupported(supported, extention)) {
      return res.json({
        success: false,
        message: "File is not supported",
      });
    }

   // size cheaking 
    console.log("image size in mb :",(file.size/(1024*1024)));
    const sizeInMb = file.size/(1024*1024);
    if(sizeInMb>=5)
    {
      console.log("Size greater than 5 mb")
      return res.json({
        success: false,
        message: "File size grater than 5 mb",
      });

    }

    // upload file to cloudinary
    const response = await uploadOnCloudinary(file, "Uploaded/Images");

    // save the data in db
    const fileData = await File.create({
       name,
       tags,
       email,
       imageUrl:response.secure_url
    })
    res.json({
        success: true,
        message: "File Uploaded on Cloudinarey Successfully",
        imageUrl:response.secure_url
      });
  } catch(err) {
    res.json({
        success: false,
        message: "File not Uploaded on Cloudinarey",
      });
      console.log(err.message);

  }
};





//videos Upload handler 

exports.videoUpload = async (req, res) => {
  try {
    // fetch data from body
    const { name, email, tags } = req.body;
    console.log();

    // fetch file form body files
    const file = req.files.videoFile;
    // console.log(file);
    // validate the file
    const supported = ["mkv", "mp4"];
    const extention = file.name.split(".")[1].toLowerCase();
    console.log(extention);

    // if the extention is not supported  reeturn error
    if (!isSupported(supported, extention)) {
      return res.json({
        success: false,
        message: "File is not supported",
      });
    }

   // size cheaking 
    console.log("image size in mb :",(file.size/(1024*1024)));
    const sizeInMb = file.size/(1024*1024);
    if(sizeInMb>=20)
    {
      console.log("Size greater than 20 mb")
      return res.json({
        success: false,
        message: "File size grater than 20 mb",
      });

    }

    // upload file to cloudinary
    const response = await uploadOnCloudinary(file, "Uploaded/Videos");

    // save the data in db
    const fileData = await File.create({
       name,
       tags,
       email,
       imageUrl:response.secure_url
    })
    res.json({
        success: true,
        message: "Video Uploaded on Cloudinarey Successfully",
        imageUrl:response.secure_url
      });
  } catch(err) {
    res.json({
        success: false,
        message: "video not Uploaded on Cloudinarey",
      });
      console.log(err.message);

  }
};







// image reduce ahd upload handlaer

exports.reducedImageUpload = async (req, res) => {
  try {
    // fetch data from body
    const { name, email, tags } = req.body;
    console.log();

    // fetch file form body files
    const file = req.files.imageFile;
    // console.log(file);
    // validate the file
    const supported = ["jpg", "png", "jepg"];
    const extention = file.name.split(".")[1].toLowerCase();
    console.log(extention);

    // if the extention is not supported  reeturn error
    if (!isSupported(supported, extention)) {
      return res.json({
        success: false,
        message: "File is not supported",
      });
    }

   // size cheaking 
    console.log("image size in Kb :",(file.size/(1024)));
    const sizeInKb = file.size/(1024);
    if(sizeInKb>=3048)
    {
      console.log("Size greater than 2 mb ")
      return res.json({
        success: false,
        message: "File size grater than 2 mb",
      });
    }
  
      const quality = 30;
      const height= 800;
      const width = 400;
    // upload file to cloudinary
    // this is by quality reduce 
    let response;
    if(quality)
    {
       response = await uploadOnCloudinary(file, "Uploaded/Reduced_Images",quality);//30 is quality 
    }
    else{
       response = await uploadOnCloudinary(file, "Uploaded/Reduced_Images",height,width);//30 is quality 
    }

    

    // save the data in db
    const fileData = await File.create({
       name,
       tags,
       email,
       imageUrl:response.secure_url
    })
    res.json({
        success: true,
        message: "Image Reduce And Uploaded on Cloudinarey Successfully",
        imageUrl:response.secure_url
      });
  } catch(err) {
    res.json({
        success: false,
        message: "File not Uploaded on Cloudinarey",
      });
      console.log(err.message);

  }
};


