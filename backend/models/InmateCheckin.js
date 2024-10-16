// backend/models/InmateCheckin.js
const mongoose = require('mongoose');

const InmateCheckinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  checkinTime: { type: Date, required: true },
  checkoutTime: { type: Date },
  facultyId: String
});

module.exports = mongoose.model('InmateCheckin', InmateCheckinSchema);
