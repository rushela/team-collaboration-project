const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Import auth route here (EXACTLY THIS)
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Admin route
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);


// Basic route for testing
app.get('/', (req, res) => {
  res.send('Server running successfully!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
