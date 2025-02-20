// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { translations } from './translations';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Chat from './components/Chat';
import Logo from "./components/Logo";




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

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="Logo">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/">{t.nav.home}</Link>
            <Link to="/about">{t.nav.about}</Link>
            <Link to="/services">{t.nav.services}</Link>
            <Link to="/contact">{t.nav.contact}</Link>
            <Link to="/chat" className="chat-button">{t.nav.chat}</Link>
            <LanguageSwitcher />
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>{t.footer.contact}</h3>
              <p>Phone: 1-888-RIVERA</p>
              <p>Email: info@riveraservices.com</p>
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
                <a href="#facebook">Facebook</a>
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
