const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const connectDatabase = () =>{
    console.log(process.env.DB_LOCAL_URI)
    mongoose.connect(process.env.DB_LOCAL_URI,{}).then(con=>{
        console.log(`mongoDB database connected with host: ${con.connection.host}`)
})

}
module.exports = connectDatabase