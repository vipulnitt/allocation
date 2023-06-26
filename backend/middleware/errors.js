const ErrorHandler = require('../utils/errorHandler');

module.exports =(err,req,res,next)=>{
    err.statusCode = err.statusCode||500;
    err.message = err.message||"Internal Server Error";
        res.status(err.statusCode).json({
            success:false,
            message: err.message,
            error: err.stack
            
        });
    
        res.status(err.statusCode).json({
            success:false,
            message: err.message|| 'Internal Server Error'
        });
        if(err.code === 11000)
        {
            const message = `Duplicate ${Object.keyValue}  entered`;
            error = new ErrorHandler(message, 400);
        }
    

   
}