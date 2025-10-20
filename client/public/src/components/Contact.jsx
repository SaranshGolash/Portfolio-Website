import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

function Contact() {
  const form = useRef();
  const [message, setMessage] = useState('');

  // Get keys from .env
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const sendEmail = (e) => {
    e.preventDefault();
    setMessage('Sending...');

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
        console.log(result.text);
        setMessage('Message sent successfully!');
        form.current.reset();
      }, (error) => {
        console.log(error.text);
        setMessage('Failed to send message. Please try again.');
      });
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center' }}>Get In <span className="gradient-text">Touch</span></h2>
      <form ref={form} onSubmit={sendEmail} style={{ maxWidth: '600px', margin: 'auto' }}>
        <label>Name</label>
        <input type="text" name="user_name" required />
        <label>Email</label>
        <input type="email" name="user_email" required />
        <label>Message</label>
        <textarea name="message" required />
        <button type="submit" className="btn">Send Message</button>
      </form>
      {message && <p style={{ textAlign: 'center', marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}

export default Contact;