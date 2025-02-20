import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';




function Chat() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message,
          language // Send language preference to backend
        }),
      });
      
      const data = await res.json();
      setResponse(data.reply);
    } catch (error) {
      console.error('Error:', error);
      setResponse(t.chat.errorMessage);
    }
    setIsLoading(false);
  };

  return (
    <div className="chat-page">
      <h1>{t.chat.title}</h1>
      <div className="chat-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.chat.placeholder}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? t.chat.sending : t.chat.sendButton}
        </button>
        {response && (
          <div className="response">
            <strong>{t.chat.responseLabel}</strong>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat; 