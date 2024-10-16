const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  category: String,
  description: String,
  status: String,
  quarters: String,
  facultyId: String
}, { timestamps: true }); // Add timestamps to the schema

module.exports = mongoose.model('Complaint', ComplaintSchema);

