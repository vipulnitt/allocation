const ResearchScholarForm = require("../models/form");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Quarter = require("../models/quarterApplication");
const QuarterDetails = require("../models/quarterDetails");
const FormDetails = require("../models/formDetails");
const APIFeatures = require("../utils/apiFeatures");
exports.acceptForm = catchAsyncError(async (req, res, next) => {
  const currentTime = new Date();

  const formDetails = await FormDetails.findById("admin");

  const startTime = new Date(formDetails.startTime);
  const endTime = new Date(formDetails.endTime);

  if (startTime > currentTime) {
    res.status(200).json({
      success: false,
      error: "Form is not started",
    });
  } else if (endTime < currentTime) {
    res.status(200).json({
      success: false,
      error: "Form has been closed",
    });
  } else {
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
    } = req.body;

    const user = await User.findById(req.user.id);
    const email = user.email;

    var RollNo = email.substring(0, email.indexOf("@"));
    const form = await ResearchScholarForm.create({
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
      contact,
    });

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
  const startTime = new Date(formDetails.startTime);
  const endTime = new Date(formDetails.endTime);
  const currentTime = new Date();

  if (startTime > currentTime) {
    res.status(200).json({
      success: false,
      error: "Form is not started",
    });
  } else if (endTime < currentTime) {
    res.status(200).json({
      success: false,
      error: "Form has been closed",
    });
  } else {
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
      priorityChoices,
    } = req.body;

    const user = await User.findById(req.user.id);
    const email = user.email;
    const form = await Quarter.create({
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
  const count = await ResearchScholarForm.deleteMany();

  res.status(200).json({
    success: true,
  });
});
exports.deleteAllSubmission2 = catchAsyncError(async (req, res, next) => {
  const count = await Quarter.deleteMany();

  res.status(200).json({
    success: true,
  });
});

exports.getSubmissions1 = catchAsyncError(async (req, res, next) => {
  const resPerPage = 1;
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

  const resPerPage = 3;
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
    console.log(JSON.stringify(req.body)+"HELLO");
    const data= await Quarter.findByIdAndDelete({_id:req.body._id});
    res.status(200).json({
      success: true,
      data
    });

});

