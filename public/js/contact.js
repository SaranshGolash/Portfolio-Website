document.addEventListener('DOMContentLoaded', () => {
  // --- Use the global variables created in footer.ejs ---
  const SERVICE_ID = EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = EMAILJS_PUBLIC_KEY;
  
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