const mongoose = require('mongoose');


const quarterSchema = new mongoose.Schema({
  email:{type:String, required:true, unique:true},
  name: { type: String },
  staffNumber: { type: String },
  designation: { type: String },
  department: { type: String },
  scalePay: { type: String },
  gradePay: { type: String },
  basicPay: { type: String },
  joiningInstitute: { type: String },
  joiningCadre: { type: String },
  presentResidentialAddress: { type: String },
  maritalStatus: { type: String },
  applicationType: { type: String },
  scOrST: { type: String },
  occupationDate: { type: String },
  quarterPresentlyAllocated: { type: String },
  remarks: { type: String },
  priorityChoices: [{ 
    choice: {
      streetNumber: { type: String },
      quarterNumber: { type: String }
    }
  }],
  submissionTime:{
    type: Date,
    default: Date.now
}

});

const Quarter = mongoose.model('Quarter', quarterSchema);

module.exports = Quarter;
