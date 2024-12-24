const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Complaint = require('../models/Complaint');
const Guest = require('../models/Guest');
const Inmate = require('../models/Inmate');
const Profile = require('../models/Profile');
const Announcement = require('../models/Announcement');
const InmateCheckin = require('../models/InmateCheckin');
const NodeCache = require('node-cache');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('4952283494-jggmf8d19jvo55kqrsd3s6ro5m5hvq2a.apps.googleusercontent.com');


// Initialize cache
const myCache = new NodeCache();


// Google Login Route
router.post('/google-login', async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: '4952283494-jggmf8d19jvo55kqrsd3s6ro5m5hvq2a.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    const { sub, email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user if not found
      user = new User({
        facultyId: sub,
        email,
        name,
        role: 'User', // Default role
      });
      await user.save();
    }

    res.status(200).json({ facultyId: user.facultyId, role: user.role });
  } catch (error) {
    console.error('Error during Google Sign-In:', error.message);
    res.status(500).json({ message: 'Google Sign-In failed' });
  }
});
// LOGIN ROUTE (Removed session logic)
router.post('/login', async (req, res) => {
  const { facultyId, password } = req.body;
  console.log('Login attempt:', { facultyId });

  try {
    const user = await User.findOne({ facultyId });
    if (!user || user.password !== password) {
      console.log('Invalid faculty ID or password');
      return res.status(400).json({ message: 'Invalid faculty ID or password' });
    }

    console.log('Login successful:', facultyId);
    return res.status(200).json({ message: 'Login successful', role: user.role });
  } catch (err) {
    console.error('Error during login:', err.message);
    return res.status(500).json({ message: err.message });
  }
});

// CREATE USER
router.post('/users', async (req, res) => {
  const { facultyId, password, name, email, phone, quarters, role } = req.body;

  try {
    const user = new User({ facultyId, password, name, email, phone, quarters, role });
    await user.save();
    myCache.del('allUsers'); // Invalidate cache
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// FETCH ALL USERS
router.get('/users', async (req, res) => {
  const cacheKey = 'allUsers';
  let users = myCache.get(cacheKey);

  if (!users) {
    try {
      users = await User.find();
      myCache.set(cacheKey, users);
      console.log('Users fetched from DB and cached');
    } catch (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).json({ message: err.message });
    }
  } else {
    console.log('Users fetched from cache');
  }

  return res.json(users);
});

// UPDATE USER
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { facultyId, password, name, email, phone, quarters, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { facultyId, password, name, email, phone, quarters, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    myCache.del('allUsers'); // Invalidate cache
    return res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err.message);
    return res.status(400).json({ message: err.message });
  }
});

// DELETE USER
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Clean up related data
    await Complaint.deleteMany({ facultyId: user.facultyId });
    await Guest.deleteMany({ facultyId: user.facultyId });
    await Inmate.deleteMany({ facultyId: user.facultyId });
    await Profile.deleteMany({ facultyId: user.facultyId });
    await InmateCheckin.deleteMany({ facultyId: user.facultyId });

    await User.deleteOne({ _id: id });
    myCache.del('allUsers'); // Invalidate cache

    console.log('User deleted successfully:', user);
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err.message);
    return res.status(500).json({ message: err.message });
  }
});

// LOGOUT ROUTE (Removed session handling)
router.post('/logout', (req, res) => {
  console.log('Logout successful');
  return res.status(200).json({ message: 'Logout successful' });
});


// Fetch all inmates
router.get('/allinmates', async (req, res) => {
  try {
    const inmates = await Inmate.find();
    console.log(`Found ${inmates.length} inmates`);

    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.json(inmates);
  } catch (err) {
    console.error('Error fetching inmates:', err.message);
    res.status(500).json({ message: err.message });
  }
});

router.get('/inmates', async (req, res) => {
  const { facultyId } = req.query;
  try {
    if (!facultyId) {
      throw new Error('Faculty ID is required');
    }
    const inmates = await Inmate.find({ facultyId });
    console.log(`Found ${inmates.length} inmates for faculty ID: ${facultyId}`);

    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.json(inmates);
  } catch (err) {
    console.error('Error fetching inmates:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Add a new inmate
router.post('/inmates', async (req, res) => {
  const { name, age, relation, facultyId, checkIn, checkOut, aadharNo, working, employer } = req.body;
  try {
    const newInmate = new Inmate({
      name,
      age,
      relation,
      facultyId,
      checkIn,
      checkOut,
      aadharNo,
      working,
      employer
    });
    await newInmate.save();
    res.status(201).json(newInmate);
  } catch (err) {
    console.error('Error adding inmate:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Fetch all guests
router.get('/allguests', async (req, res) => {
  try {
    const guests = await Guest.find();
    console.log(`Found ${guests.length} guests`);
    res.json(guests);
  } catch (err) {
    console.error('Error fetching guests:', err.message);
    res.status(500).json({ message: err.message });
  }
});

router.get('/guests', async (req, res) => {
  const { facultyId } = req.query;
  try {
    if (!facultyId) {
      throw new Error('Faculty ID is required');
    }
    const guests = await Guest.find({ facultyId });
    console.log(`Found ${guests.length} guests for faculty ID: ${facultyId}`);
    res.json(guests);
  } catch (err) {
    console.error('Error fetching guests:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Add a new guest
router.post('/guests', async (req, res) => {
  const { guests, from, checkIn, checkOut, code, facultyId } = req.body;
  try {
    if (!facultyId) {
      throw new Error('Faculty ID is required');
    }
    const newGuest = new Guest({
      guests,
      from,
      checkIn,
      checkOut,
      code,
      facultyId
    });
    await newGuest.save();
    res.status(201).json(newGuest);
  } catch (err) {
    console.error('Error adding guest:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Fetch a single complaint by complaintId
router.get('/complaints/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (err) {
    console.error('Error fetching complaint:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Update complaint status
router.put('/complaints/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (err) {
    console.error('Error updating complaint status:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to get complaint statistics
router.get('/complaints-stats', async (req, res) => {
  try {
    const categories = ['Plumbing', 'Carpentry', 'Electrical', 'Gardening', 'Others'];
    const counts = { categories: {}, status: {} };

    for (const category of categories) {
      counts.categories[category] = await Complaint.countDocuments({ category });
    }

    counts.status.Registered = await Complaint.countDocuments();
    counts.status.Resolved = await Complaint.countDocuments({ status: 'Resolved' });
    counts.status.InProgress = await Complaint.countDocuments({ status: 'In Progress' });

    res.json(counts);
  } catch (error) {
    console.error('Error fetching complaint statistics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch the most recent 3 complaints
router.get('/recent-complaints', async (req, res) => {
  try {
    const recentComplaints = await Complaint.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json(recentComplaints);
  } catch (err) {
    console.error('Error fetching recent complaints:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Fetch all complaints
router.get('/allcomplaints', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    console.log(`Found ${complaints.length} complaints`);
    res.json(complaints);
  } catch (err) {
    console.error('Error fetching complaints:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Fetch complaints by facultyId
router.get('/complaints', async (req, res) => {
  const { facultyId } = req.query;
  try {
    if (!facultyId) {
      throw new Error('Faculty ID is required');
    }
    const complaints = await Complaint.find({ facultyId });
    console.log(`Found ${complaints.length} complaints for faculty ID: ${facultyId}`);
    res.json(complaints);
  } catch (err) {
    console.error('Error fetching complaints:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Add a new complaint
router.post('/complaints', async (req, res) => {
  const { facultyId, category, quarters, description, status, createdAt } = req.body;
  console.log('Adding new complaint:', { facultyId, description });

  try {
    const newComplaint = new Complaint({
      facultyId,
      category,
      quarters,
      description,
      status,
      createdAt
    });

    const savedComplaint = await newComplaint.save();
    console.log('Complaint added successfully:', savedComplaint);
    res.status(201).json(savedComplaint);
  } catch (err) {
    console.error('Error adding complaint:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Fetch profile by facultyId
router.get('/profile', async (req, res) => {
  const { facultyId } = req.query;
  try {
    if (!facultyId) {
      throw new Error('Faculty ID is required');
    }
    const profile = await Profile.findOne({ facultyId });
    if (!profile) {
      const newProfile = new Profile({ facultyId });
      await newProfile.save();
      return res.json(newProfile);
    }
    res.json(profile);
  } catch (err) {
    console.error('Error fetching profile:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Update profile by facultyId
router.put('/profile', async (req, res) => {
  const { facultyId, name, dob, age, gender, bloodGroup, aadharNo, panNo, email, phone, quartersNo, address, fourWheelers, twoWheelers } = req.body;
  try {
    if (!facultyId) {
      throw new Error('Faculty ID is required');
    }
    const profile = await Profile.findOneAndUpdate(
      { facultyId },
      { name, dob, age, gender, bloodGroup, aadharNo, panNo, email, phone, quartersNo, address, fourWheelers, twoWheelers },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    console.error('Error updating profile:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Fetch all inmate check-in details by facultyId
router.get('/inmatecheckins', async (req, res) => {
  const { facultyId } = req.query;
  try {
    if (!facultyId) {
      throw new Error('Faculty ID is required');
    }
    const checkinDetails = await InmateCheckin.find({ facultyId });
    res.status(200).json(checkinDetails);
  } catch (err) {
    console.error('Error fetching check-in details:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Add a new inmate check-in detail
router.post('/inmatecheckins', async (req, res) => {
  const { name, checkinTime, checkoutTime, facultyId } = req.body;
  try {
    const newCheckin = new InmateCheckin({
      name,
      checkinTime,
      checkoutTime,
      facultyId
    });
    await newCheckin.save();
    res.status(201).json(newCheckin);
  } catch (err) {
    console.error('Error adding check-in detail:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Fetch all complaints
router.get('/allcomplaints', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (err) {
    console.error('Error fetching all complaints:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Fetch all inmates
router.get('/allinmates', async (req, res) => {
  try {
    const inmates = await Inmate.find();
    res.status(200).json(inmates);
  } catch (err) {
    console.error('Error fetching all inmates:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Fetch all guest details
router.get('/allguests', async (req, res) => {
  try {
    const guests = await Guest.find();
    res.status(200).json(guests);
  } catch (err) {
    console.error('Error fetching all guests:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Announcements endpoint
// Fetch all announcements
router.get('/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (err) {
    console.error('Error fetching announcements:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Add a new announcement
router.post('/announcements', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newAnnouncement = new Announcement({ title, content });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    console.error('Error adding announcement:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Update an announcement
router.put('/announcements/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.json(updatedAnnouncement);
  } catch (err) {
    console.error('Error updating announcement:', err.message);
    res.status(500).json({ message: err.message });
  }
});

const mongoose = require('mongoose');

// Delete an announcement
router.delete('/announcements/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Announcement ID is required' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Announcement ID' });
  }

  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
    if (!deletedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (err) {
    console.error('Error deleting announcement:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;