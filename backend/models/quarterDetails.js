const mongoose = require('mongoose');
const validator = require('validator');


const quarterDetailSchema= new mongoose.Schema({
  startTime:{
    type:String
  },
  endTime:{
    type:String
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
