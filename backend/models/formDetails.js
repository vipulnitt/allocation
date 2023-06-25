const mongoose = require('mongoose');
const validator = require('validator');


const formDetailSchema= new mongoose.Schema({
_id:String,
 norms:[
  {
    statement: String
  }
 ],
 startTime:{
  type:Date
},
endTime:{
  type:Date
}
},{_id:false});

const FormDetails = mongoose.model('FormDetails', formDetailSchema);

module.exports = FormDetails;
