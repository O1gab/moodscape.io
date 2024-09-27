// src/TabBar.js
import React from 'react';
import './TabBar.css'; // You can create a CSS file for styling

const TabBar = () => {
  return (
    <div className="tab-bar">
      <a href="#home" className="tab">Home</a>
      <a href="#features" className="tab">Features</a>
      <a href="#signup" className="tab">Sign Up</a>
      <a href="#contact" className="tab">Contact</a>
    </div>
  );
};

export default TabBar;
