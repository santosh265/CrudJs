const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/books');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB Connection
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookapi'; // Use environment variable or default

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Mount book routes
app.use('/api/books', bookRoutes);

// Error handling middleware (should be the last middleware)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});