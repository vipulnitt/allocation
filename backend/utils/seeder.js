const connectDatabase = require('../config/database');
const Admin = require('../models/admin');

connectDatabase();


const defaultAdminCredentials = {
  name: "admin",
  email: "admin@nitt.edu",
  password: "password"
};


const seedDefaultAdmin = async () => {
  try {
  
    const existingAdmin = await Admin.findOne({ email: defaultAdminCredentials.email });
    
    if (!existingAdmin) {
      
      const newAdmin = await Admin.create({defaultAdminCredentials});
     
      console.log('Default admin user created successfully.');
    } else {
      console.log('Default admin user already exists.');
    }
  } catch (error) {
    console.error('Error seeding default admin:', error);
  }
};

seedDefaultAdmin();
