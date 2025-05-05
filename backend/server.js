// server.js
require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();

// global middleware
app.use(express.json());
app.use(cors());

// 1️⃣ Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2️⃣ Mount your routers
const authRoutes    = require('./routes/auth');
const adminRoutes   = require('./routes/admin');
// remove any bad require('./routes/User') here!

// ← NEW: import your support route
const supportRoutes = require('./routes/support');

app.use('/api/auth',  authRoutes);
app.use('/api/admin', adminRoutes);

// ← NEW: mount it under /api/support
app.use('/api/support', supportRoutes);

// 3️⃣ Health-check endpoint
app.get('/', (req, res) => {
  res.send('Server running successfully!');
});

// 4️⃣ Start listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
