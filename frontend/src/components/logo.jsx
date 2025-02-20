import { Logo as LogoImage } from '../assets';

// components/Logo.jsx
export const Logo = () => (
  <div className="logo-container">
    <img 
      src="/images/logo.png"  
      alt="Rivera All Services"
      style={{ maxHeight: '50px', width: 'auto', display: 'block' }}
    />
    <span className="logo-text">Rivera All Services</span>
  </div>
);

