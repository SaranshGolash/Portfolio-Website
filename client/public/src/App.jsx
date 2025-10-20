import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <>
      <Header />
      <main>
        <section id="home" className="section">
          <Home />
        </section>
        
        <section id="projects" className="section" style={{ backgroundColor: '#111' }}>
          <Projects />
        </section>
        
        <section id="contact" className="section">
          <Contact />
        </section>
      </main>
      
      {/* Chatbot will be fixed on the page */}
      <Chatbot />
    </>
  );
}

export default App;