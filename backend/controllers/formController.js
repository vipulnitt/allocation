const ResearchScholarForm = require("../models/form");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Quarter = require("../models/quarterApplication");
const QuarterDetails = require("../models/quarterDetails");
const FormDetails = require("../models/formDetails");
const APIFeatures = require("../utils/apiFeatures");
const moment = require('moment-timezone');
const Admin = require('../models/admin');


exports.acceptForm = catchAsyncError(async (req, res, next) => {
  const formDetails = await FormDetails.findById("admin");
  const istTimeZone = 'Asia/Kolkata';

  const currentTime = moment().tz(istTimeZone); // Get the current time in IST timezone

  const startTime = moment.tz(formDetails.startTime, 'YYYY-MM-DDTHH:mm', istTimeZone);
  const endTime = moment.tz(formDetails.endTime, 'YYYY-MM-DDTHH:mm', istTimeZone);

  console.log("Form start time:", startTime.format('YYYY-MM-DDTHH:mm'));
  console.log("Form end time:", endTime.format('YYYY-MM-DDTHH:mm'));
  console.log("Current time:", currentTime.format('YYYY-MM-DDTHH:mm'));

  if (currentTime.isBefore(startTime)) {
    res.status(200).json({
      success: false,
      error: "Form filling has not started yet.",
    });
  } else if (currentTime.isAfter(endTime)) {
    res.status(200).json({
      success: false,
      error: "Form filling has ended.",
    });
  } else {
    // Form filling is allowed within the specified start and end time
    const {
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
      contact,
      guide,
      tenureCompleted,
       remarks
    } = req.body;
    console.log(JSON.stringify(req.body));
    const user = await User.findById(req.user.id);
    const email = user.email;

    var RollNo = email.substring(0, email.indexOf("@"));
    const form = await ResearchScholarForm.findOneAndUpdate(
      { RollNo },
      {
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
        contact,
        guide,
        tenureCompleted,
        remarks
      },
      { upsert: true, new: true } 
    );

    res.status(200).json({
      success: true,
      form,
    });
  }
});
exports.form1PreSubmission = catchAsyncError(async (req, res, next) => {
  const formDetails = await FormDetails.findById("admin");
  const istTimeZone = 'Asia/Kolkata';

  const currentTime = moment().tz(istTimeZone); // Get the current time in IST timezone

  const startTime = moment.tz(formDetails.startTime, 'YYYY-MM-DDTHH:mm', istTimeZone);
  const endTime = moment.tz(formDetails.endTime, 'YYYY-MM-DDTHH:mm', istTimeZone);

  console.log("Form start time:", startTime.format('YYYY-MM-DDTHH:mm'));
  console.log("Form end time:", endTime.format('YYYY-MM-DDTHH:mm'));
  console.log("Current time:", currentTime.format('YYYY-MM-DDTHH:mm'));

  if (currentTime.isBefore(startTime)) {
    res.status(200).json({
      success: false,
      error: "Form filling has not started yet.",
    });
  } else if (currentTime.isAfter(endTime)) {
    res.status(200).json({
      success: false,
      error: "Form filling has ended.",
    });
  } else {
   
   

    const user = await User.findById(req.user.id);
    const email = user.email;

    var rn = email.substring(0, email.indexOf("@"));
    const form = await ResearchScholarForm.findOne({RollNo:rn});
    res.status(200).json({
      success: true,
      form,
    });

  }
});

exports.getFormsData = catchAsyncError(async (req, res, next) => {
  const form = await ResearchScholarForm.find();
  res.status(200).json({
    success: true,
    form,
  });
});

exports.fetchFormData = catchAsyncError(async (req, res, next) => {
  const formDetails = await FormDetails.findById("admin");
  const istTimeZone = 'Asia/Kolkata';

  const currentTime = moment().tz(istTimeZone); // Get the current time in IST timezone

  const startTime = moment.tz(formDetails.startTime, 'YYYY-MM-DDTHH:mm', istTimeZone);
  const endTime = moment.tz(formDetails.endTime, 'YYYY-MM-DDTHH:mm', istTimeZone);



  if (currentTime.isBefore(startTime)) {
    res.status(200).json({
      success: false,
      error: "Form filling has not started yet.",
    });
  } else if (currentTime.isAfter(endTime)) {
    res.status(200).json({
      success: false,
      error: "Form filling has ended.",
    });
  } else {
   
    const user = await User.findById(req.user.id);

    const email = user.email;
    
  
    var RollNo = email.substring(0, email.indexOf("@"));

    const form =ResearchScholarForm.find({RollNo});
    
  
    res.status(200).json({
      success: true,
      form,
    });
  }
});

exports.getFormsData = catchAsyncError(async (req, res, next) => {
  const form = await ResearchScholarForm.find();
  res.status(200).json({
    success: true,
    form,
  });
});


exports.acceptQuarterForm = catchAsyncError(async (req, res, next) => {
  const formDetails = await QuarterDetails.findById("admin");
  const istTimeZone = 'Asia/Kolkata';

  const startTime = moment.tz(formDetails.startTime, istTimeZone);
  const endTime = moment.tz(formDetails.endTime, istTimeZone);
  const currentTime = moment().tz(istTimeZone);

  console.log("Form start time:", startTime.format('YYYY-MM-DDTHH:mm'));
  console.log("Form end time:", endTime.format('YYYY-MM-DDTHH:mm'));
  console.log("Current time:", currentTime.format('YYYY-MM-DDTHH:mm'));

  if (currentTime.isBefore(startTime)) {
    res.status(200).json({
      success: false,
      error: "Quarter form filling has not started yet.",
    });
  } else if (currentTime.isAfter(endTime)) {
    res.status(200).json({
      success: false,
      error: "Quarter form filling has ended.",
    });
  } else {
    // Quarter form filling is allowed within the specified start and end time
    const {
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
      quarterPresentlyAllocated,
      remarks,
      priorityChoices,
    } = req.body;

    const user = await User.findById(req.user.id);
    const email = user.email;
    const form = await Quarter.findOneAndUpdate({ email},{
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
      quarterPresentlyAllocated,
      remarks,
      priorityChoices,
    }, { upsert: true, new: true } );

    res.status(200).json({
      success: true,
      form,
    });
  }
});

exports.fetchQuarterForm = catchAsyncError(async (req, res, next) => {
  const formDetails = await QuarterDetails.findById("admin");
  const istTimeZone = 'Asia/Kolkata';

  const startTime = moment.tz(formDetails.startTime, istTimeZone);
  const endTime = moment.tz(formDetails.endTime, istTimeZone);
  const currentTime = moment().tz(istTimeZone);

 

  if (currentTime.isBefore(startTime)) {
    res.status(200).json({
      success: false,
      error: "Quarter form filling has not started yet.",
    });
  } else if (currentTime.isAfter(endTime)) {
    res.status(200).json({
      success: false,
      error: "Quarter form filling has ended.",
    });
  } else {
  
    
    const user = await User.findById(req.user.id);
    const email = user.email;
    const form = await Quarter.findOne({
      email
    });

    res.status(200).json({
      success: true,
      form,
    });
  }
});

exports.getQuarterFormsData = catchAsyncError(async (req, res, next) => {
  const formData = await Quarter.find().lean(); // Use lean() to get plain JSON objects instead of Mongoose documents
  const data = formData.map((form) => {
    // Modify the JSON data as needed to fit the Excel sheet
    const priorityProperties = {};
    form.priorityChoices.forEach((choice, index) => {
      priorityProperties[`p${index + 1}`] = {
        Priority: choice.choice.priority,
        StreetNumber: choice.choice.streetNumber,
        QuarterNumber: choice.choice.quarterNumber,
      };
    });

    return {
      Email: form.email,
      Name: form.name,
      StaffNumber: form.staffNumber,
      Designation: form.designation,
      Department: form.department,
      ScalePay: form.scalePay,
      GradePay: form.gradePay,
      BasicPay: form.basicPay,
      JoiningInstitute: form.joiningInstitute,
      JoiningCadre: form.joiningCadre,
      PresentResidentialAddress: form.presentResidentialAddress,
      MaritalStatus: form.maritalStatus,
      ApplicationType: form.applicationType,
      ScOrST: form.scOrST,
      OccupationDate: form.occupationDate,
      quarterPresentlyAllocated: form.quarterPresentlyAllocated,
      ...priorityProperties,
      SubmissionTime: form.submissionTime,
    };
  });

  console.log(JSON.stringify(data));
  res.status(200).json({
    success: true,
    data,
  });
});

exports.getSubmissionCount2 = catchAsyncError(async (req, res, next) => {
  const count = await Quarter.countDocuments({});

  res.status(200).json({
    success: true,
    count,
  });
});
exports.getSubmissionCount1 = catchAsyncError(async (req, res, next) => {
  const count = await ResearchScholarForm.countDocuments({});

  res.status(200).json({
    success: true,
    count,
  });
});

exports.deleteAllSubmission1 = catchAsyncError(async (req, res, next) => {
  const {password}= req.body;

  
  const email = req.admin.email;
   const admin = await Admin.findOne({email}).select('+password');
    if(!admin){
        return next(new ErrorHandler('Wrong Password!',401));
    }

    const isPasswordMatched = await admin.comparePassword(password);
    if(!isPasswordMatched)
    {
    return next(new ErrorHandler('Wrong Password!',401));
    }
    
    const count = await ResearchScholarForm.deleteMany();

  res.status(200).json({
    success: true,
  });
});
exports.deleteAllSubmission2 = catchAsyncError(async (req, res, next) => {
  const {password}= req.body;
  const email = req.admin.email;
  const admin = await Admin.findOne({email}).select('+password');
    if(!admin){
        return next(new ErrorHandler('Wrong Password!',401));
    }

    const isPasswordMatched = await admin.comparePassword(password);
    if(!isPasswordMatched)
    {
    return next(new ErrorHandler('Wrong Password!',401));
    }
  const count = await Quarter.deleteMany();

  res.status(200).json({
    success: true,
  });
});

exports.getSubmissions1 = catchAsyncError(async (req, res, next) => {
  const resPerPage = 4;
  const Count = await ResearchScholarForm.countDocuments();
  const apiFeatures = new APIFeatures(ResearchScholarForm.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const submissions = await apiFeatures.query;
  console.log(req.query);
  console.log(submissions);

  res.status(200).json({
    success: true,
    count: Count,
    resPerPage,
    submissions,
  });
});

exports.getSubmissions2 = catchAsyncError(async (req, res, next) => {

  const resPerPage = 4;
  const Count = await Quarter.countDocuments();
  const apiFeatures = new APIFeatures(Quarter.find(), req.query)
    .search2()
    .filter()
    .pagination(resPerPage);
  const submissions = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: Count,
    resPerPage,
    submissions,
  });
});

exports.deleteInForm1 = catchAsyncError(async (req, res, next) => {
      const data= await ResearchScholarForm.findByIdAndDelete({_id:req.body._id});
      res.status(200).json({
        success: true,
        data
      });

  });
  
  exports.deleteInForm2 = catchAsyncError(async (req, res, next) => {
    console.log(JSON.stringify(req.body));
    const data= await Quarter.findByIdAndDelete({_id:req.body._id});
    res.status(200).json({
      success: true,
      data
    });

});

exports.withdrawForm1 = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const email = user.email;
  const RollNo = email.substring(0, email.indexOf("@"));
  console.log(RollNo);
  const data = await ResearchScholarForm.findOneAndDelete({RollNo:RollNo});
  res.status(200).json({
    success: true,
    data
  });

});

exports.withdrawForm2 = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const email = user.email;
  console.log(email);
 
  const data = await Quarter.findOneAndDelete({email});
  res.status(200).json({
    success: true,
    data
  });


});
