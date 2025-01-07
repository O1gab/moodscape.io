import React from 'react';
import styles from './TabBar.css';

const TabBar = () => {
  return (
    <div className="tabBarContainer">
      <div className="logo">MoodScape</div>
      <nav className="tabBar">
        
        <div className="tabList">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#download">Download</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
    </div>
  );
};

export default TabBar;