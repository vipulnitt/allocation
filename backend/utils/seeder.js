const connectDatabase = require('../config/database');
const Admin = require('../models/admin');

connectDatabase();

const seedDefaultAdmin = async () => {
  try {
  
    const existingAdmin = await Admin.findOne({ email: "admin@nitt.edu" });
    
    if (!existingAdmin) {
      
      const newAdmin = await Admin.create({
    "name": "admin",
    "email": "admin@nitt.edu",
    "password": "password"
});
     
      console.log('Default admin user created successfully.');
    } else {
      console.log('Default admin user already exists.');
    }
  } catch (error) {
    console.error('Error seeding default admin:', error);
  }
};

seedDefaultAdmin();