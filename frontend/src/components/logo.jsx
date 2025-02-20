import React from "react";

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <img 
      src="/images/logo.png" 
      alt="Rivera All Services"
      style={{
        maxHeight: "60px",
        width: "auto",
        display: "block"
      }}
    />
    <span style={{
      fontFamily: "'YourCustomFont', sans-serif",
      fontSize: "28px",
      fontWeight: "bold",
      color: "#777"  // Adjust color as needed
    }}>
      Rivera All Services
    </span>
  </div>
);

export default Logo;


