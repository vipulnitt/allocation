const Admin = require('../models/admin');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError= require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const Notification = require('../models/notification');
const fs = require('fs');
const path = require('path');


exports.registerAdmin = catchAsyncError(async (req, res, next)=>{
    const {name, email, password} = req.body;

  const admin = await Admin.create({
        name,
        email,
        password
    })
   sendToken(admin, 200,res);
})

exports.loginAdmin = catchAsyncError(async (req, res, next)=>{
    const {email,password}= req.body;

    //check if email or password is entered by user

    if(!email||!password){
        return next(new ErrorHandler('Please enter email or password',400))
    }
      console.log("xaam");
    //finding user in database
    const admin = await Admin.findOne({email}).select('+password');
    if(!admin){
        return next(new ErrorHandler('Invalid Email or Password',401));
    }

    const isPasswordMatched = await admin.comparePassword(password);
    if(!isPasswordMatched)
    {
    return next(new ErrorHandler('Invalid Email or Password',401));
    }
    
    sendToken(admin, 200,res);

});


//get Current Admin Profile

exports.getAdminProfile = catchAsyncError(async (req,res,next)=>{
    console.log(JSON.stringify(req.body)+"");
    const admin = await Admin.findById(req.admin.id);
    res.status(200).json({
      success:true,
      admin
    });
  });

  //Logout User
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTc0NzEyNTRhYzMwNTgxMTRhYzI1NCIsImlhdCI6MTY4NzkyMzM3NiwiZXhwIjoxNjg4NTI4MTc2fQ.3wjmdKwLVpAjeCy0NyTMiirGPeoelUy0nyRhVy4ApGM
  exports.logoutAdmin = catchAsyncError(async(req,res,next)=>{

    console.log("header: "+JSON.stringify(req.cookies));
    res.cookie('tkn', null, {
      expires: new Date(Date.now()), // Set the cookie expiration to a past date
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
  
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });

});



// Change Password

exports.updatePassword = catchAsyncError(async(req,res,next)=>{

    console.log(JSON.stringify(req.body));
    const admin = await Admin.findById(req.admin.id).select('+password');
       
    
    const isMatched = await admin.comparePassword(req.body.oldPassword);
    
    if(!isMatched)
    {
        return next(new ErrorHandler('Old password is incorrect',401));
    }
    admin.password = req.body.newPassword;
    await admin.save();

    sendToken(admin,200,res);


});

exports.addNotification = catchAsyncError(async(req,res,next)=>{
    let notification = new Notification({
        statement:req.body.statement
    });
    if(req.file){
        
    notification.file= req.file.path
    }
    await notification.save();
    res.status(200).json({
        success:true,
        notification
      });
  });

  exports.getNotification = catchAsyncError(async(req,res,next)=>{
  
    const notifications = await Notification.find();
    res.status(200).json({
        success:true,
        notifications
      });
  });

  exports.downloadNotification = catchAsyncError(async(req,res,next)=>{
    console.log(JSON.stringify(req.body)+"vipul");
    const mimetype = 'application/pdf'; // Replace with the appropriate mimetype for your file
    const filePath=req.body.filepath;
    const file = path.basename(filePath);
    res.setHeader('Content-disposition', `attachment; filename=${file}`);
    res.setHeader('Content-type', mimetype);
    
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });

  exports.deleteNotification = catchAsyncError(async(req,res,next)=>{

    const id=req.body.id;
    
    var mongoose = require('mongoose');
var o_id =new mongoose.Types.ObjectId(id);
   const result =await Notification.findByIdAndDelete({_id: o_id});
    const filePath = result.file;
    var message;
    fs.unlink(filePath, (err) => {
      if (err) {
        message='Error deleting file:'+ err;
      } else {
        message='File deleted successfully';
      }
    });
    res.status(200).json({
      success:true,
      message,
        result
    });
   
  });