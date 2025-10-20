const express = require('express');
const db = require('../db');
const router = express.Router();

// --- Middleware to protect admin routes ---
const isAuth = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
};

// --- Login Routes ---
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    req.session.isLoggedIn = true;
    res.redirect('/admin');
  } else {
    res.render('login', { error: 'Incorrect password' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// --- Admin Dashboard Routes ---
router.get('/admin', isAuth, async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM projects ORDER BY id DESC');
    res.render('admin', { projects: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// --- Add Project Route ---
router.post('/admin/add', isAuth, async (req, res) => {
  const { title, description, repo_link, thumbnail_url, video_url } = req.body;
  
  // Use NULL for empty strings
  const thumb = thumbnail_url || null;
  const video = video_url || null;

  try {
    const sql = `
      INSERT INTO projects (title, description, repo_link, thumbnail_url, video_url)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await db.query(sql, [title, description, repo_link, thumb, video]);
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// --- Delete Project Route ---
router.post('/admin/delete/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM projects WHERE id = $1', [id]);
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;