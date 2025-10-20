document.addEventListener('DOMContentLoaded', () => {
  // --- PASTE YOUR EMAIL.JS KEYS HERE ---
  const SERVICE_ID = 'service_kguy2u3';
  const TEMPLATE_ID = 'template_wquch4e';
  const PUBLIC_KEY = 'pHcs_3o6GkNB5zYl3';
  
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