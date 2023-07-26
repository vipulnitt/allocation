const Admin = require('../models/admin');
const mongoose = require('mongoose');
mongoose.connect('mongodb://root:password@localhost:27017',{}).then(con=>{
   console.log(`mongoDB database connected with host: ${con.connection.host}`)
})


const defaultAdminCredentials = {
  name: 'admin',
  email: 'admin@nitt.edu',
  password: 'password',
};


const seedDefaultAdmin = async () => {
  try {
  
    const existingAdmin = await Admin.findOne({ email: defaultAdminCredentials.email });

    if (!existingAdmin) {
      
      const newAdmin = await Admin.create(defaultAdminCredentials);
     
      console.log('Default admin user created successfully.');
    } else {
      console.log('Default admin user already exists.');
    }
  } catch (error) {
    console.error('Error seeding default admin:', error);
  }
};

seedDefaultAdmin();
