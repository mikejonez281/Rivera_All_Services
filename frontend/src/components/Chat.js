import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.js';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // For unique keys
import './Chat.css';

// --- Start of Data Integration ---

// New, topic-based structure for conversational flow
const faqData = {
  en: {
    deck: {
      keywords: ['deck', 'patio', 'porch'],
      service: "Yes, we build, repair, and refinish decks, patios, and porches. A beautiful outdoor space is a great addition to any home. Let us know what you have in mind!",
      cost: {
        keywords: ['cost', 'price', 'how much', 'quote', 'estimate'],
        answer: "The cost for a new deck can vary widely. On average, you can expect a range of $25-$50 per square foot. For a standard 12x12 ft deck (144 sq ft), this could be $3,600 - $7,200. The final price depends heavily on materials (like wood vs. composite), size, and design complexity. For an accurate price, we highly recommend a free, on-site estimate."
      }
    },
    bathroom: {
      keywords: ['bathroom', 'shower', 'tub', 'vanity', 'restroom'],
      service: "Absolutely! We provide complete bathroom renovation services, from updating showers and tubs to installing new vanities and toilets. We can help transform your bathroom into a modern, relaxing space.",
      cost: {
        keywords: ['cost', 'price', 'how much', 'quote', 'estimate'],
        answer: "A standard bathroom renovation is approximately between $2,500 to $3,500. For a more accurate quote based on your specific needs and materials, please contact us to schedule a free estimate."
      }
    },
    kitchen: {
      keywords: ['kitchen', 'cabinets', 'countertop', 'backsplash', 'island'],
      service: "Yes, we specialize in full kitchen renovations. This includes installing new cabinets, countertops, backsplashes, and kitchen islands to create your dream kitchen.",
      cost: {
        keywords: ['cost', 'price', 'how much', 'quote', 'estimate'],
        answer: "A standard kitchen renovation can range from $5,000 to $25,000 or more, depending on the scope and materials. We recommend a free consultation for a precise quote tailored to your vision."
      }
    },
    plumbing: {
      keywords: ['plumbing', 'leak', 'faucet', 'toilet', 'pipe', 'water heater', 'drain', 'clog', 'plumber'],
      service: "Yes, Rivera All Services offers comprehensive plumbing work, including repairs for leaks, faucets, and toilets, as well as new installations.",
      cost: {
        keywords: ['cost', 'price', 'how much', 'quote', 'estimate'],
        answer: "Plumbing costs vary greatly depending on the job. A simple repair might be a small service call fee, while new installations require a custom quote. We offer free estimates for all general repairs!"
      }
    },
    electrical: {
      keywords: ['electrical', 'outlet', 'light fixture', 'ceiling fan', 'wiring', 'switch', 'power', 'electrician'],
      service: "Our electrical services cover everything from installing new outlets and light fixtures to ceiling fans and minor wiring repairs. For safety, it's always best to hire a professional.",
      cost: {
        keywords: ['cost', 'price', 'how much', 'quote', 'estimate'],
        answer: "Like plumbing, electrical work pricing depends on the task. Installing a new fixture is different from a wiring project. We'd be happy to provide a free estimate for your specific needs."
      }
    },
    // --- Standalone Questions ---
    estimates: {
      keywords: ['free estimate', 'general repair estimate', 'repair cost'],
      service: "Yes, we absolutely provide free, no-obligation estimates for all general repairs. Please contact us to schedule an appointment."
    },
    contact: {
      keywords: ['contact', 'phone', 'email', 'information', 'call', 'reach out', 'address', 'number'],
      service: "You can reach us by phone at (786) 294-1207 or by email at riverallservices@gmail.com. For more details, please visit our [Contact Page](/contact)."
    },
    default: {
      answer: "I'm sorry, I can only answer a pre-set list of questions. Please try one of the common questions, or rephrase your question."
    }
  },
  es: {
    deck: {
      keywords: ['deck', 'terraza', 'patio', 'porche'],
      service: "¡Sí! Construimos, reparamos y restauramos terrazas, patios y porches. Un hermoso espacio al aire libre es una gran adición a cualquier hogar. ¡Díganos qué tiene en mente!",
      cost: {
        keywords: ['costo', 'precio', 'cuánto cuesta', 'cotización', 'estimado'],
        answer: "El costo de instalar una nueva terraza (deck) puede variar ampliamente. En promedio, puede esperar un rango de $25 a $50 por pie cuadrado. Para una terraza de 12x12 pies (144 pies cuadrados), esto podría ser de $3,600 a $7,200. El precio final depende de los materiales, el tamaño y la complejidad. Para un precio exacto, recomendamos un presupuesto gratuito en el sitio."
      }
    },
    bathroom: {
      keywords: ['baño', 'ducha', 'bañera', 'tocador'],
      service: "¡Por supuesto! Ofrecemos servicios completos de renovación de baños, desde la actualización de duchas y bañeras hasta la instalación de nuevos tocadores e inodoros. Podemos ayudar a transformar su baño en un espacio moderno y relajante.",
      cost: {
        keywords: ['costo', 'precio', 'cuánto cuesta', 'cotización', 'estimado'],
        answer: "Una renovación de baño estándar cuesta aproximadamente entre $2,500 y $3,500. Para una cotización más precisa basada en sus necesidades y materiales específicos, por favor contáctenos para programar un presupuesto gratuito."
      }
    },
    kitchen: {
      keywords: ['cocina', 'gabinetes', 'encimera', 'salpicadero', 'isla'],
      service: "Sí, nos especializamos en renovaciones completas de cocina. Esto incluye la instalación de nuevos gabinetes, encimeras, salpicaderos e islas de cocina para crear la cocina de sus sueños.",
      cost: {
        keywords: ['costo', 'precio', 'cuánto cuesta', 'cotización', 'estimado'],
        answer: "Una renovación de cocina estándar puede oscilar entre $5,000 y $25,000 o más, dependiendo del alcance y los materiales. Recomendamos una consulta gratuita para una cotización precisa adaptada a su visión."
      }
    },
    plumbing: {
      keywords: ['plomería', 'fuga', 'grifo', 'inodoro', 'tubería', 'fontanero'],
      service: "Sí, Rivera All Services ofrece trabajos de plomería completos, incluyendo reparaciones de fugas, grifos e inodoros, así como nuevas instalaciones.",
      cost: {
        keywords: ['costo', 'precio', 'cuánto cuesta', 'cotización', 'estimado'],
        answer: "Los costos de plomería varían mucho según el trabajo. Una reparación simple puede tener una tarifa de servicio pequeña, mientras que las nuevas instalaciones requieren una cotización personalizada. ¡Ofrecemos presupuestos gratuitos para todas las reparaciones generales!"
      }
    },
    electrical: {
      keywords: ['eléctrico', 'enchufe', 'lámpara', 'ventilador', 'cableado', 'interruptor', 'electricista'],
      service: "Nuestros servicios eléctricos cubren todo, desde la instalación de nuevos enchufes y lámparas hasta ventiladores de techo y reparaciones menores. Por seguridad, siempre es mejor contratar a un profesional.",
      cost: {
        keywords: ['costo', 'precio', 'cuánto cuesta', 'cotización', 'estimado'],
        answer: "Al igual que la plomería, el precio del trabajo eléctrico depende de la tarea. Instalar una lámpara nueva es diferente a un proyecto de cableado. Estaremos encantados de ofrecerle un presupuesto gratuito para sus necesidades específicas."
      }
    },
    // --- Standalone Questions ---
    estimates: {
      keywords: ['presupuesto gratis', 'estimado gratuito', 'reparación general'],
      service: "Sí, por supuesto, ofrecemos presupuestos gratuitos y sin compromiso para todas las reparaciones generales. Por favor, contáctenos para programar una cita."
    },
    contact: {
      keywords: ['contacto', 'teléfono', 'email', 'información', 'llamar', 'comunicarse', 'dirección', 'número'],
      service: "Puede comunicarse con nosotros por teléfono al (786) 294-1207 o por correo electrónico a riverallservices@gmail.com. Para más detalles, también puede visitar nuestra [Página de Contacto](/contact)."
    },
    default: {
      answer: "Lo siento, solo puedo responder a una lista preestablecida de preguntas. Por favor, intente una de las preguntas comunes o reformule su pregunta."
    }
  }
};

const getAnswer = (question, language, currentTopic) => {
  const lowerCaseQuestion = question.toLowerCase().trim();
  const qaSet = faqData[language];
  let newTopic = null;
  let response = null;

  // 1. Check for follow-up questions about the current topic
  if (currentTopic && qaSet[currentTopic] && qaSet[currentTopic].cost) {
    const isAskingForCost = qaSet[currentTopic].cost.keywords.some(kw => lowerCaseQuestion.includes(kw));
    if (isAskingForCost) {
      response = qaSet[currentTopic].cost.answer;
      // The topic is now "resolved," so we clear it to avoid repeated cost answers.
      newTopic = null; 
      return { response, newTopic };
    }
  }

  // 2. If not a follow-up, find a new topic
  const matchedTopicKey = Object.keys(qaSet).find(topicKey => {
    if (topicKey === 'default') return false;
    const topic = qaSet[topicKey];
    return topic.keywords && topic.keywords.some(kw => lowerCaseQuestion.includes(kw));
  });

  if (matchedTopicKey) {
    const topic = qaSet[matchedTopicKey];
    response = topic.service; // Give the general service answer
    // If this topic has a potential follow-up, set it as the new topic.
    newTopic = topic.cost ? matchedTopicKey : null;
  } else {
    response = qaSet.default.answer;
    newTopic = null; // No topic found, reset context
  }

  return { response, newTopic };
};

// --- End of Data Integration ---

const renderMessageWithLink = (text) => {
  const linkRegex = /\[(.*?)\]\((.*?)\)/;
  const match = text.match(linkRegex);

  if (!match) {
    return text;
  }

  const beforeText = text.substring(0, match.index);
  const linkText = match[1];
  const linkUrl = match[2];
  const afterText = text.substring(match.index + match[0].length);

  return (
    <>
      {beforeText}<Link to={linkUrl}>{linkText}</Link>{afterText}
    </>
  );
};

function Chat({ closeChat, isVisible }) {
  const { language } = useLanguage();
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [input, setInput] = useState(''); // Input field state
  const [loading, setLoading] = useState(false); // Loading state
  const [currentTopic, setCurrentTopic] = useState(null); // State for conversational context
  const inputRef = useRef(null); // Ref for the text input
  const chatContainerRef = useRef(null); // Ref for auto-scrolling

  // Get common questions from our new data file, excluding the 'default' key
  const commonQuestions = language === 'en' ? [
    "How much for a bathroom renovation?",
    "How much for a kitchen renovation?",
    "Do you provide free estimates for general repairs?",
  ] : [ 
    "¿Cuánto cuesta la renovación de un baño?", 
    "¿Cuánto cuesta la renovación de una cocina?", 
    "¿Ofrecen presupuestos gratuitos para reparaciones generales?"
  ];
  // Scroll to the latest message whenever messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Effect to focus the input when the bot is done responding
  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  useEffect(() => {
    const welcomeMessageText = language === 'en' 
        ? "Hello! I'm the virtual assistant for Rivera All Services. How can I help you today? You can ask me a question or select one of the common topics below."
        : "¡Hola! Soy el asistente virtual de Rivera All Services. ¿Cómo puedo ayudarte hoy? Puedes hacerme una pregunta o seleccionar uno de los temas comunes a continuación.";

    const welcomeMessage = {
        id: uuidv4(),
        text: welcomeMessageText,
        sender: 'Rivera All Services'
    };

    // Set the initial welcome message, but only if the chat is empty
    if (messages.length === 0) {
      setMessages([welcomeMessage]);
    }
  }, [language, messages.length]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    // Submit on Enter press, but allow new lines with Shift+Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!loading) handleSubmit(e);
    }
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || loading) return;
    setLoading(true);
    
    // Simulate a network delay for a better user experience
    setTimeout(() => {
      const { response, newTopic } = getAnswer(messageText, language, currentTopic);
      setCurrentTopic(newTopic); // Update the conversational topic
      const aiMessage = { id: uuidv4(), text: response, sender: 'Rivera All Services' };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setLoading(false);
    }, 500 + Math.random() * 500); // Respond in 0.5-1.0 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentInput = input;
    if (!currentInput.trim()) return;

    setInput('');
    const userMessage = { id: uuidv4(), text: currentInput, sender: 'Customer' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    await sendMessage(currentInput);
  };

  const handlePresetQuestionClick = (question) => {
    const userMessage = { id: uuidv4(), text: question, sender: 'Customer' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    sendMessage(question);
  };

  return (
    <div className={`chat-popup ${isVisible ? 'visible' : ''}`}>
      <div className="chat-header">
        <h1 className="chat-title">Rivera All Services Chat</h1>
        <button onClick={closeChat} className="close-chat-button">&times;</button>
      </div>
      <div ref={chatContainerRef} className="chat-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender === 'Customer' ? 'customer' : 'service'}`}>
            <div className="message-bubble">
              <strong>{msg.sender}:</strong> {renderMessageWithLink(msg.text)}
            </div>
          </div>
        ))}
        {loading && <div className="typing-indicator"><i>Typing...</i></div>}
      </div>
      <div className="preset-questions">
        <p><strong>Or ask one of these common questions:</strong></p>
        {commonQuestions.map((q, i) => (
          <button key={i} onClick={() => handlePresetQuestionClick(q)} disabled={loading} className="preset-button">
            {q}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about our services..."
          disabled={loading}
          className="chat-input"
        />
        <button type="submit" disabled={loading} className="send-button">
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default Chat;
