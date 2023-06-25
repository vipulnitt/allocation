const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDirectory = path.join(__dirname, '../uploads');

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var upload = multer({
    storage:storage,
    fileFilter: function(req,file,callback){
        if(file.mimetype==='application/pdf'){
            callback(null,true)
        }else{
            console.log("Invalid File");
            callback(null,false)
        }
    },
    limits:{
        fileSize : 1024*1024*10
    }
})
module.exports = upload;