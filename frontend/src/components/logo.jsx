import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <img 
      src="/images/logo.png" 
      alt="Rivera All Services"
      style={{
        maxHeight: "90px",
        width: "auto",
        display: "block",
        borderRadius: "10px" // Added rounded corners here
      }}
    />
    <span style={{
      fontFamily: "'YourCustomFont', sans-serif",
      fontSize: "40px",
      fontWeight: "bold",
      color: "#777"  // Adjust color as needed
    }}>
      Rivera All Services
    </span>
  </div>
);

export default Logo;
