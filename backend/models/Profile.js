const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  dob: { type: String, default: '' },
  age: { type: String, default: '' },
  gender: { type: String, default: '' },
  bloodGroup: { type: String, default: '' },
  facultyId: { type: String, required: true, unique: true },
  aadharNo: { type: String, default: '' },
  panNo: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  quartersNo: { type: String, default: '' },
  address: { type: String, default: '' },
  fourWheelers: { type: String, default: '' },
  twoWheelers: { type: String, default: '' }
});

module.exports = mongoose.model('Profile', ProfileSchema);