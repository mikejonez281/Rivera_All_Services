import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { translations } from './translations';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Chat from './components/Chat';
import Logo from "./components/logo";





function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button onClick={toggleLanguage} className="language-switch">
      {language === 'en' ? 'Español' : 'English'}
    </button>
  );
}

function AppContent() {
  const { language } = useLanguage();
  const t = translations[language];
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleChat = () => {
    if (!isChatOpen) {
      setIsChatOpen(true);
      setIsChatVisible(true);
    } else {
      setIsChatVisible(false);
      // Wait for animation to finish before unmounting
      setTimeout(() => setIsChatOpen(false), 300);
    }
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="logo">
            <Link to="/" onClick={closeMenu}>              <Logo />
 </Link>
          </div>

          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" onClick={closeMenu}>{t.nav.home}</Link>
            <Link to="/about" onClick={closeMenu}>{t.nav.about}</Link>
            <Link to="/services" onClick={closeMenu}>{t.nav.services}</Link>
            <Link to="/contact" onClick={closeMenu}>{t.nav.contact}</Link>
            <LanguageSwitcher />
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home openChat={toggleChat} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {!isChatVisible && (
          <button onClick={toggleChat} className="chat-fab">
            <span className="chat-fab-icon">💬</span>
            <span className="chat-fab-text">Chat!</span>
          </button>
        )}

        {isChatOpen && <Chat closeChat={toggleChat} isVisible={isChatVisible} />}

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>{t.footer.contact}</h3>
              <p><a href="tel:+1 786-294-1207">Phone: +1 786-294-1207</a></p>
              <p><a href="https://mail.google.com/mail/?view=cm&fs=1&to=riverallservices@gmail.com" target="_blank">Email: riverallservices@gmail.com</a></p>
              </div>
            <div className="footer-section">
              <h3>{t.footer.quickLinks}</h3>
              <Link to="/services">{t.nav.services}</Link>
              <Link to="/about">{t.nav.about}</Link>
              <Link to="/contact">{t.nav.contact}</Link>
            </div>
            <div className="footer-section">
              <h3>{t.footer.followUs}</h3>
              <div className="social-links">
                <a href="https://www.facebook.com/profile.php?id=100090539895960" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="#instagram">Instagram</a>
                <a href="#twitter">Twitter</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t.footer.rights}</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
