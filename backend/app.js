const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const apiRoutes = require('./routes/api'); // Import your API routes

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error.message);
});
db.once('open', () => console.log('Connected to MongoDB'));

// API Routes
app.use('/api', apiRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
