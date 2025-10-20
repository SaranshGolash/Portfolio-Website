const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const session = require('express-session'); // <-- ADD THIS
require('dotenv').config();

// --- Import Routes ---
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin'); // <-- ADD THIS

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <-- ADD THIS (for forms)

// --- EJS Setup ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Static Files Setup ---
app.use(express.static(path.join(__dirname, 'public')));

// --- Session Setup --- (ADD THIS SECTION)
app.use(session({
  secret: process.env.ADMIN_PASSWORD, // Use your password as the secret
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hour session
}));

// --- API Routes ---
app.use('/api', apiRoutes);

// --- Admin Routes --- (ADD THIS)
app.use('/', adminRoutes); // Use the new admin routes

// --- Page Routes ---
app.get('/', async (req, res) => {
  try {
    // Order by ID to show newest projects first
    const { rows } = await db.query('SELECT * FROM projects ORDER BY id DESC'); 
    
    res.render('index', {
      projects: rows,
      // Pass the Email.js keys to the template
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