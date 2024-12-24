const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const apiRoutes = require('./routes/api'); // Import your API routes

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes
app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Set COOP and COEP headers
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Set Content Security Policy (CSP) headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://www.gstatic.com"
  );
  next();
});

// MongoDB connection for session storage
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions', // Collection to store sessions
});

store.on('error', (error) => {
  console.error('Session store error:', error.message);
});

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret', // Replace with your own secret
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 15, // Session valid for 15 minutes
      httpOnly: true, // Ensure the cookie is only accessible by the web server
      secure: process.env.NODE_ENV === 'production', // Ensure the cookie is used over HTTPS in production
    },
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error.message));

// API Routes
app.use('/api', apiRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// 404 Error handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
