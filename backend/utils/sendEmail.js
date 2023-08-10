const AWS = require('aws-sdk');


const sendEmail = async options => {
    const SES_CONFIG = {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION
    }
    const AWS_SES = new AWS.SES(SES_CONFIG);
    
    console.log(JSON.stringify(SES_CONFIG)+" xx");
   let params = {
    Source:process.env.SENDER_EMAIL,
    Destination:{
        ToAddresses:[options.email]
    },
    ReplyToAddresses:[],
    Message:{
        Body:{
            Text:{Charset:'UTF-8',
            Data:options.message
        }
        },
        Subject:{
            Charset:'UTF-8',
            Data:options.subject
        }
    }
   }
   try{
  //  const res = await AWS_SES.sendEmail(params).promise();
    console.log("Sent");
   } catch (error){
    console.log("Error: " + error);
   }
};


module.exports = sendEmail;
// const eeClient = require('elasticemail-webapiclient').client;
 

// const sendEmail = async options =>{
//   const option = {
//     apiKey: process.env.API_KEY,
//     apiUri: 'https://api.elasticemail.com/',
//     apiVersion: 'v2'
// }
 
// const EE = new eeClient(option);
 
// // Load account data
// EE.Account.Load().then(function(resp) {
//     console.log(resp);
// });
 
// const emailParams = {
//     "subject": options.subject,
//     "to": options.email,
//     "from": process.env.SMTP_FROM_EMAIL,
//     "body": options.message,
//     "fromName": process.env.SMTP_FROM_NAME,
//     "bodyType": 'Plain'
// };
 
// // Send email
// EE.Email.Send(emailParams)
// .catch((err) => {
//     throw new Error(err);
// });
 
       
//  }
 
//  module.exports = sendEmail;
// const nodemailer = require('nodemailer');
// const sendEmail = async options =>{

//  console.log(process.env.SMTP_PORT+"Hello");
//   let transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure:false,
//     auth: {
//       user: process.env.SMTP_EMAIL,
//       pass: process.env.SMTP_PASSWORD
//     }
//   });
//       const message ={
//         from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
//         to: options.email,
//         subject: options.subject,
//         text: options.message
//       }
//       try{
//         await transporter.sendMail(message);
//       } catch(e)
//       {
//         console.log(e);
//       }
      
// }

// module.exports = sendEmail;