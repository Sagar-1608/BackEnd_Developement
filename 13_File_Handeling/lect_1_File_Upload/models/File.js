const mongoose = require("mongoose");
const mailer = require("../config/mailer");
const nodemailer = require("nodemailer")

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

// to send the mail TO when new entry sane in DB 
// this write after the module export 
fileSchema.post("save",async function(doc){

 try{ 
    
    const nodemailerInstance =mailer;
    console.log(doc);
    
   let info= await nodemailerInstance.sendMail({
        from:"FileUploader_$J",
        to:doc.email,
        subject:"Your file uploaded on Cloudinary",
        html:`<h2>Hello ${doc.email} </h2> <p>File Uploaded View Here: <a href="${doc.imageUrl}"> ${doc.imageUrl}></a> </p>`
    })



    console.log(info)


 }
 catch(err){

    console.error(err);
 }
    


})

const File = mongoose.model("File", fileSchema);
module.exports = File;