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
    enum: ['OC', 'OBC', 'SC', 'ST', 'PWD'],
    required: true
  },
  fellowship: {
    type: String,
    enum: ['QIP', 'Full Time (Institute Fellowship)', 'Full Time (Under Project)', 'Full Time (without fellowship)']
  },
  nameOfInstitute: {
    type: String
  },
  typeOfInstitute: {
    type: String,
    enum: ['Government', 'Government Aided', 'Private']
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
    enum: ['Married', 'UnMarried'],
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
