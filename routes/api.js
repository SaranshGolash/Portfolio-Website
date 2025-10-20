const express = require('express');
const { OpenAI } = require('openai');
require('dotenv').config();

const router = express.Router();

// --- OpenAI Setup ---
// This finds your OPENAI_API_KEY in the .env file
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST: Handle all chatbot messages
router.post('/chat', async (req, res) => {
  // Get the user's message from the request
  const { message } = req.body;

  // Simple validation
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    // Send the message to the OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // You can change this to gpt-4 if you have access
      messages: [
        // This is the "system prompt" that defines your bot's personality
        { role: 'system', content: 'You are a helpful assistant for my portfolio website. Keep your answers concise.' },
        // This is the user's actual message
        { role: 'user', content: message },
      ],
    });

    // Send the AI's reply back to the frontend
    res.json({ reply: completion.choices[0].message.content });

  } catch (err) {
    // Handle any errors from the API
    console.error('OpenAI API error:', err);
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
});

// Don't forget to export the router!
module.exports = router;