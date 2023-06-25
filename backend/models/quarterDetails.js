const mongoose = require('mongoose');
const validator = require('validator');


const quarterDetailSchema= new mongoose.Schema({
  startTime:{
    type:Date
  },
  endTime:{
    type:Date
  },
_id:String,
 quarters:[
  {
    choice:{
        streetNumber:String,
        quarterNumber:String
    }
  }
 ]
},{_id:false});

const QuarterDetails = mongoose.model('quarterDetail',quarterDetailSchema);

module.exports = QuarterDetails;
