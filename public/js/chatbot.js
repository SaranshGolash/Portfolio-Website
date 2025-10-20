document.addEventListener('DOMContentLoaded', () => {
  const openButton = document.getElementById('chatbot-open-button');
  const chatbot = document.getElementById('chatbot-window');
  const closeButton = document.getElementById('chatbot-close-button');
  const chatBody = document.getElementById('chatbot-body');
  const chatForm = document.getElementById('chatbot-form');
  const chatInput = document.getElementById('chatbot-input');

  // --- Event Listeners ---
  openButton.addEventListener('click', () => {
    chatbot.style.display = 'block';
    openButton.style.display = 'none';
  });

  closeButton.addEventListener('click', () => {
    chatbot.style.display = 'none';
    openButton.style.display = 'block';
  });

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    // 1. Add user message to UI
    addMessageToUI('user', message);
    chatInput.value = '';

    try {
      // 2. Send message to backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const aiReply = data.reply;

      // 3. Add AI reply to UI
      addMessageToUI('ai', aiReply);

    } catch (error) {
      console.error('Chatbot error:', error);
      addMessageToUI('ai', 'Sorry, I am having trouble connecting.');
    }
  });

  // --- Helper Function ---
  function addMessageToUI(role, content) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${role}`;
    msgDiv.textContent = content;
    chatBody.appendChild(msgDiv);
    // Auto-scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
  }
});