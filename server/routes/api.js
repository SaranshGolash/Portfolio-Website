const express = require('express');
const db = require('../db');
const { OpenAI } = require('openai');
require('dotenv').config();

const router = express.Router();

// --- OpenAI Setup ---
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// GET: Fetch all projects from PostgreSQL
router.get('/projects', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM projects');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST: Handle chatbot messages
router.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    // Send message to OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Or gpt-4
      messages: [
        // You can add a system prompt to define your bot's personality
        { role: 'system', content: 'You are a helpful assistant for my portfolio website.' },
        { role: 'user', content: message },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
});

module.exports = router;