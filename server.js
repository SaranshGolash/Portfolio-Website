const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db'); // Your db.js file
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- EJS Setup ---
// Set EJS as the view engine
app.set('view engine', 'ejs');
// Tell Express where to find EJS files
app.set('views', path.join(__dirname, 'views'));

// --- Static Files Setup ---
// Serve all files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// --- API Routes ---
// This is for your chatbot
app.use('/api', apiRoutes);

// --- Page Routes ---
/**
 * This is the main route. It fetches data from your database
 * and then renders the HTML page, passing the data to EJS.
 */
app.get('/', async (req, res) => {
  try {
    // 1. Fetch projects from PostgreSQL
    const { rows } = await db.query('SELECT * FROM projects');
    
    // 2. Render the index.ejs file
    // 3. Pass the 'projects' data to the template
    res.render('index', {
      projects: rows,
      emailServiceId: process.env.EMAILJS_SERVICE_ID,
      emailTemplateId: process.env.EMAILJS_TEMPLATE_ID,
      emailPublicKey: process.env.EMAILJS_PUBLIC_KEY
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});