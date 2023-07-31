const mongoose = require('mongoose');
const validator = require('validator');


const researchScholarSchema = new mongoose.Schema({
  RollNo:{
   type: String,
   required: true,
   unique: true
  },
  Name: {
    type: String,
    required: true
  },
  Department: {
    type: String,
    required: true
  },
  dateOfJoining: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  fellowship: {
    type: String
  },
  nameOfInstitute: {
    type: String
  },
  typeOfInstitute: {
    type: String
  },
  scaleOfPayAndBasicPay: {
    type: String
  },
  presentResidentialAddress: {
    type: String
  },
  permanentAddress: {
    type: String
  },
  maritalStatus: {
    type: String,
    required: true
  },
  dateOfMarriage: {
    type: String
  },
  contact: {
    type: String,
    required: true
  },
  submissionTime:{
    type: Date,
    default: Date.now
}
});

const ResearchScholarForm = mongoose.model('ResearchScholarForm', researchScholarSchema);

module.exports = ResearchScholarForm;
