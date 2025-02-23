import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function OllamaChat() {
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [input, setInput] = useState(''); // Input field state
  const [loading, setLoading] = useState(false); // Loading state
  const chatContainerRef = useRef(null); // Ref for auto-scrolling

  // Scroll to the latest message when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage = { text: input, sender: 'Client' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: 'llama2',
        prompt: input + ' 30 words or less. ',
        stream: false,
      });

      const ollamaMessage = { text: response.data.response, sender: 'Rivera All Services' };
      setMessages((prevMessages) => [...prevMessages, ollamaMessage]);
    } catch (error) {
      console.error('Error fetching response from Ollama:', error);
      const errorMessage = {
        text: 'Sorry, there was an error processing your request.',
        sender: 'ollama',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Chat</h1>
      <div ref={chatContainerRef} style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((msg, index) => (
          <p key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Ask a question..."
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}

export default OllamaChat;



