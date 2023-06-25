const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema(
{
      email: {
        type:String,
        required: [true,'Please  enter your email'],
        unique: true,
        validate:[validateNITTEmail, 'Email must be a valid @nitt.edu address'] 
      },
      Otp:String,
      OtpExpires:Date
})

userSchema.methods.getOtp = function()
{
    const otp=Math.floor(100000 + Math.random() * 900000);
     this.Otp=otp;
     this.OtpExpires=Date.now() + 30 * 60 * 1000;
     return  otp;

}

userSchema.methods.getJwtToken = function(){
  return jwt.sign({id: this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_TIME
  });
}
userSchema.methods.verifyOtp = function(otp)
{
  if(otp==this.Otp)
  {
    this.Otp= undefined;
    this.OtpExpires= undefined;

    return true;
  }
  return false;
}
function validateNITTEmail(email) {
  return email.endsWith('@nitt.edu');
}

module.exports = mongoose.model('User',userSchema);