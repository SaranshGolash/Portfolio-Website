import React from 'react';

function Home() {
  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.5rem' }}>
        Hi, I'm <span className="gradient-text">Your Name</span>
      </h1>
      <h2 style={{ fontSize: '2rem', color: '#ccc' }}>
        I'm a Full-Stack Developer
      </h2>
      <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
        Welcome to my portfolio. I build modern, responsive, and unique web applications using React, Node.js, and more.
      </p>
      <a href="#projects" className="btn" style={{ marginTop: '1rem' }}>
        View My Work
      </a>
    </div>
  );
}

export default Home;