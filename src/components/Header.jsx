import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.querySelector('.sidebar')?.classList.toggle('open');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <Link to="/" className="logo">
          <h1>VisaFlow</h1>
        </Link>
      </div>
      
      <div className="header-center">
        <div className="search-bar">
          <input type="text" placeholder="Rechercher un test, un visa..." />
          <button>🔍 Rechercher</button>
        </div>
      </div>
      
      <div className="header-right">
        <div className="user-info">
          <span className="user-name">Thomas Martin</span>
          <div className="avatar">
            <img src="https://ui-avatars.com/api/?background=F2B544&color=030BA6&name=TM" alt="Avatar" />
          </div>
        </div>
        <button className="logout-btn">Déconnexion</button>
      </div>
    </header>
  );
};

export default Header;