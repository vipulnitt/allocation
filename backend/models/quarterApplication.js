const mongoose = require('mongoose');


const quarterSchema = new mongoose.Schema({
  email:{type:String, required:true, unique:true},
  name: { type: String, required: true },
  staffNumber: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  scalePay: { type: String, required: true },
  gradePay: { type: String, required: true },
  basicPay: { type: String, required: true },
  joiningInstitute: { type: String, required: true },
  joiningCadre: { type: String, required: true },
  presentResidentialAddress: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  applicationType: { type: String, required: true },
  scOrST: { type: String, required: true },
  occupationDate: { type: String, required: true },
  priorityChoices: [{ 
    choice: {
      streetNumber: { type: String, required: true },
      quarterNumber: { type: String, required: true }
    }
  }],
  submissionTime:{
    type: Date,
    default: Date.now
}

});

const Quarter = mongoose.model('Quarter', quarterSchema);

module.exports = Quarter;
