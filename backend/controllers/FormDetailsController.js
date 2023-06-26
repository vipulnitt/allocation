const FormDetails= require('../models/formDetails');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError= require('../middleware/catchAsyncError');
const QuarterDetails = require('../models/quarterDetails');
exports.modifyTime = catchAsyncError(async (req,res,next)=>{
    const formDetails = await FormDetails.findByIdAndUpdate("admin",req.body,{
        new: true,
        runValidators:true,
        useFindAndModify: false 
      });
   
      res.status(200).json({
        success: true,
        startTime: formDetails.startTime,
        endTime: formDetails.endTime
      });

});

exports.addNorms = catchAsyncError(async (req,res,next)=>{
  console.log("acy"+req.body);
  const formDetails = await FormDetails.findByIdAndUpdate("admin",req.body,{
      new: true,
      runValidators:true,
      useFindAndModify: false 
    });
 
    res.status(200).json({
      success: true,
      norms: formDetails.norms
    });

});

exports.fetchNorms = catchAsyncError(async (req,res,next)=>{
    
  const formDetails = await FormDetails.findById("admin");
    res.status(200).json({
      success: true,
      norms: formDetails.norms
    });
});

exports.addQuarterDetails = catchAsyncError(async (req,res,next)=>{
  console.log(JSON.stringify(req.body));
  const quarterDetails = await QuarterDetails.findByIdAndUpdate("admin",req.body,{
      new: true,
      runValidators:true,
      useFindAndModify: false 
    });
 
    res.status(200).json({
      success: true,
      quarterDetails : quarterDetails.quarters
    });

});

exports.fetchQuarter = catchAsyncError(async (req,res,next)=>{
    
 
  const quarterDetails = await QuarterDetails.findById("admin");
    res.status(200).json({
      success: true,
      quarters: quarterDetails.quarters
    });
});