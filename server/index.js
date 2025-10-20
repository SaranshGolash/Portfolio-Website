const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

// --- API Routes ---
app.use('/api', apiRoutes);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});