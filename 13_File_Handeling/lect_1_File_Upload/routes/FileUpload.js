const express = require("express");
const router = express.Router();

const {localFileUpload, imageUpload,videoUpload,reducedImageUpload} = require("../controllers/fileUpload");
const { smsSender } = require("../controllers/smsSender");


//api route
router.post("/localFileUpload",localFileUpload );
router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/reducedImageUpload",reducedImageUpload);

router.post("/smsSender",smsSender)


module.exports = router;


