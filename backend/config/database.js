const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const connectDatabase = () =>{
    mongoose.connect('mongodb+srv://vp98504:vipul98504@allocation.zetm3om.mongodb.net/?retryWrites=true&w=majority',{}).then(con=>{
        console.log(`mongoDB database connected with host: ${con.connection.host}`)
})

}
module.exports = connectDatabase
