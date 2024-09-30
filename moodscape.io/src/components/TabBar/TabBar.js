// src/TabBar.js
import React from 'react';
import './TabBar.css';

const TabBar = () => {
  return (
    <div className="tab-bar">
      <a href="#home" className="tab">Home</a>
      <a href="#download" className="tab">Download</a>
      <a href="#features" className="tab">Features</a>
      <a href="#contact" className="tab">Contact</a>
    </div>
  );
};

export default TabBar;
