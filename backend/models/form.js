const mongoose = require("mongoose");


const researchScholarSchema = new mongoose.Schema({
  RollNo: {
    type: String,
    required: true,
    unique: true,
  },
  Name: {
    type: String,
  },
  Department: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: String,
  },
  category: {
    type: String,
  },
  fellowship: {
    type: String,
  },
  nameOfInstitute: {
    type: String,
  },
  typeOfInstitute: {
    type: String,
  },
  scaleOfPayAndBasicPay: {
    type: String,
  },
  presentResidentialAddress: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  dateOfMarriage: {
    type: String,
  },
  contact: {
    type: String,
  },
  guide: { type: String },
  tenureCompleted: { type: String },
  remarks: { type: String },

  submissionTime: {
    type: Date,
    default: Date.now,
  },
});

const ResearchScholarForm = mongoose.model(
  "ResearchScholarForm",
  researchScholarSchema
);

module.exports = ResearchScholarForm;
