import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]); // Stores chat history

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message) return;

    const userMessage = { role: 'user', content: message };
    setChat([...chat, userMessage]); // Add user message to chat
    setMessage('');

    try {
      // Send message to backend /api/chat
      const { data } = await axios.post('/api/chat', { message });
      const aiMessage = { role: 'ai', content: data.reply };
      setChat((prevChat) => [...prevChat, userMessage, aiMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage = { role: 'ai', content: 'Sorry, I am having trouble connecting.' };
      setChat((prevChat) => [...prevChat, userMessage, errorMessage]);
    }
  };

  if (!isOpen) {
    return (
      <div className="chatbot-header" style={{ position: 'fixed', bottom: '2rem', right: '2rem', borderRadius: '10px', padding: '1rem 1.5rem' }} onClick={() => setIsOpen(true)}>
        Chat with my AI
      </div>
    );
  }

  return (
    <div className="chatbot">
      <div className="chatbot-header" onClick={() => setIsOpen(false)}>
        AI Assistant (Close)
      </div>
      <div className="chatbot-body">
        {chat.map((msg, index) => (
          <div key={index} style={{ marginBottom: '0.5rem', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <span style={{ 
              background: msg.role === 'user' ? '#FF8C00' : '#333',
              color: msg.role === 'user' ? '#000' : '#fff',
              padding: '0.25rem 0.5rem', 
              borderRadius: '5px' 
            }}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything..."
        />
      </form>
    </div>
  );
}

export default Chatbot;