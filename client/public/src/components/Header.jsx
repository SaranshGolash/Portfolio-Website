import React from 'react';

function Header() {
  return (
    <nav className="navbar">
      <div className="container">
        <a href="#home" className="logo">
          YourName<span>.</span>
        </a>
        <ul>
          {/* Add more links as needed */}
          <li><a href="#home">Home</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
          {/* Social Links */}
          <li><a href="https://github.com/YOUR_USERNAME" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://linkedin.com/in/YOUR_USERNAME" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://instagram.com/YOUR_USERNAME" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;