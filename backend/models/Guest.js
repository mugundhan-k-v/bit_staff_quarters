const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
  guests: [String], // Array of guest names
  from: String,
  checkIn: Date,
  checkOut: Date,
  code: String,
  facultyId: String
});

module.exports = mongoose.model('Guest', GuestSchema);

