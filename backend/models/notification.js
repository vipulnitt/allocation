const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
   statement:{ type: String, required: true},
   file:{ type: String}
});

const Notification = mongoose.model('Notification',notificationSchema);
module.exports = Notification;