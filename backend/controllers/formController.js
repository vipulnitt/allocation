const ResearchScholarForm= require('../models/form');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError= require('../middleware/catchAsyncError');
const Quarter = require('../models/quarterApplication');
const QuarterDetails = require('../models/quarterDetails');
const FormDetails= require('../models/formDetails');
exports.acceptForm = catchAsyncError(async (req,res,next)=>{
    const currentTime= new Date();
    
    const formDetails = await FormDetails.findById("admin");
    
    const startTime = new Date(formDetails.startTime);
    const endTime = new Date(formDetails.endTime);
    console.log(currentTime+" ");
    console.log(endTime+" ");
    console.log(startTime+" ");
    if(startTime>currentTime)
    {
        res.status(200).json({
            success: false,
            error:"Form is not started"
            });
    }else if(endTime<currentTime)
    {
        res.status(200).json({
            success: false,
            error:"Form has been closed"
            });
    }
    else
    {
        const { Name,
            Department,
            dateOfJoining,
            category,
            fellowship,
            nameOfInstitute,
            typeOfInstitute,
            scaleOfPayAndBasicPay,
            presentResidentialAddress,
            permanentAddress,
            maritalStatus,
            dateOfMarriage,
            contact}= req.body;
           
            const user = await User.findById(req.user.id);
            const email= user.email;
         
        var RollNo = email.substring(0,email.indexOf('@'));
        const form =await ResearchScholarForm.create({
            RollNo,
            Name,
            Department,
            dateOfJoining,
            category,
            fellowship,
            nameOfInstitute,
            typeOfInstitute,
            scaleOfPayAndBasicPay,
            presentResidentialAddress,
            permanentAddress,
            maritalStatus,
            dateOfMarriage,
            contact
        });
    
        res.status(200).json({
            success: true,
            form});
    
    }
    
  
    

});
exports.getFormsData = catchAsyncError(async (req,res,next)=>{
    const form =await ResearchScholarForm.find();
    res.status(200).json({
        success: true,
        form});


});

exports.acceptQuarterForm = catchAsyncError(async (req,res,next)=>{
    const { name,
        staffNumber,
        designation,
        department,
        scalePay,
        gradePay,
        basicPay,
        joiningInstitute,
        joiningCadre,
        presentResidentialAddress,
        maritalStatus,
        applicationType,
        scOrST,
        occupationDate,
        priorityChoices}= req.body;
       
       const user = await User.findById(req.user.id);
        const email= user.email;
    const form =await Quarter.create({
        email,
        name,
        staffNumber,
        designation,
        department,
        scalePay,
        gradePay,
        basicPay,
        joiningInstitute,
        joiningCadre,
        presentResidentialAddress,
        maritalStatus,
        applicationType,
        scOrST,
        occupationDate,
        priorityChoices,
    });
    res.status(200).json({
        success: true,
        form});


});

exports.getQuarterFormsData = catchAsyncError(async (req,res,next)=>{
    const formData =await Quarter.find();
    res.status(200).json({
        success: true,
        formData});


});

function validateNITTEmail(email) {
    const nittEmailRegex = /^.+@nitt\.edu$/;
    return nittEmailRegex.test(email);
  }