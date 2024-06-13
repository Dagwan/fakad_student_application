const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./db/db');
const ecardRoutes = require('./routes/fakadRoutes'); // Correct import for e_card routes

const port = process.env.PORT || 8080;
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Middleware for setting CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Use routes defined in separate files
app.use('/', require('./routes'));

// // Use routes defined in separate files
// app.use('/api/fakads', fakadRoutes); // Define a base path for fakad routes

// Initialize the database connection
mongodb.initDb((err) => {
  if (err) {
    console.error('Error initializing database:', err);
  } else {
    app.listen(port, () => {
      console.log(`Running and listening on port ${port}`);
      console.log('Fakad successfully initialized');
    });
  }
});
