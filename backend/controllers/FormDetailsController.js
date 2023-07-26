const FormDetails= require('../models/formDetails');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError= require('../middleware/catchAsyncError');
const QuarterDetails = require('../models/quarterDetails');
exports.modifyTime = catchAsyncError(async (req,res,next)=>{
  let formDetails = await FormDetails.findById("admin");

  if (!formDetails) {
   
    formDetails = await FormDetails.create({ _id: "admin" });
  }
    formDetails = await FormDetails.findByIdAndUpdate("admin",req.body,{
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
  let formDetails = await FormDetails.findById("admin");

  if (!formDetails) {
   
    formDetails = await FormDetails.create({ _id: "admin" });
  }
  formDetails = await FormDetails.findByIdAndUpdate("admin",req.body,{
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
      norms: formDetails.norms,
      startTime:formDetails.startTime,
      endTime:formDetails.endTime
    });
});

exports.modifyTime2 = catchAsyncError(async (req,res,next)=>{
  let formDetails = await QuarterDetails.findById("admin");

  if (!formDetails) {
   
    formDetails = await QuarterDetails.create({ _id: "admin" });
  }
 formDetails= await QuarterDetails.findByIdAndUpdate("admin",req.body,{
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


exports.addQuarterDetails = catchAsyncError(async (req,res,next)=>{
  let formDetails = await QuarterDetails.findById("admin");

  if (!formDetails) {
   
    formDetails = await QuarterDetails.create({ _id: "admin" });
  }
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
      quarters: quarterDetails.quarters,
      startTime:quarterDetails.startTime,
      endTime:quarterDetails.endTime
    });
});


