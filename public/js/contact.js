document.addEventListener('DOMContentLoaded', () => {
  // --- PASTE YOUR EMAIL.JS KEYS HERE ---
  const SERVICE_ID = process.env.SERVICE_ID;
  const TEMPLATE_ID = process.env.SERVICE_ID;
  const PUBLIC_KEY = process.env.SERVICE_ID;
  
  // Initialize Email.js
  emailjs.init(PUBLIC_KEY);

  const form = document.getElementById('contact-form');
  const messageEl = document.getElementById('contact-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    messageEl.textContent = 'Sending...';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
      .then(() => {
        messageEl.textContent = 'Message sent successfully!';
        form.reset();
      }, (err) => {
        console.error('Email.js Error:', err);
        messageEl.textContent = 'Failed to send message. Please try again.';
      });
  });
});