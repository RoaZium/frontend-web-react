import React from 'react';
import  '../App.css'

const App = () => {
  return (
    <div className="app-container">
      <NavigationSidebar />
      <MainContent />
    </div>
  );
};

const NavigationSidebar = () => {
  // This is a placeholder for your sidebar
  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      {/* Add your navigation items here */}
    </div>
  );
};

const MainContent = () => {
  return (
    <div className="main-content">
      <Header />
      <ItemList />
    </div>
  );
};

const Header = () => {
  // This is a placeholder for your header
  return (
    <div className="header">
      <h1>Header Content</h1>
    </div>
  );
};

const ItemList = () => {
  // This would be a list of items - a placeholder for your content
  const items = ['Item 1', 'Item 2', 'Item 3']; // Replace with your actual items
  return (
    <ul className="item-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default App;
