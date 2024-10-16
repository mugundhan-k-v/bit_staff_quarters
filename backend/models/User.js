const mongoose = require('mongoose');
const Complaint = require('./Complaint');
const Guest = require('./Guest');
const Inmate = require('./Inmate');
const Profile = require('./Profile');
const InmateCheckin = require('./InmateCheckin');

const userSchema = new mongoose.Schema({
  facultyId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true ,unique: true},
  role: { type: String, required: true }
});

// Middleware to handle cascading deletes
userSchema.pre('remove', async function(next) {
  try {
    await Complaint.deleteMany({ facultyId: this.facultyId });
    await Guest.deleteMany({ facultyId: this.facultyId });
    await Inmate.deleteMany({ facultyId: this.facultyId });
    await Profile.deleteMany({ facultyId: this.facultyId });
    await InmateCheckin.deleteMany({ facultyId: this.facultyId });
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;