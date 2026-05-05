import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { path: '/', icon: '🏠  ', label: 'Accueil' },
    { path: '/recherche', icon: '🔍', label: 'Rechercher Demande' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>MENU PRINCIPAL</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <span className={`icon-${item.label.toLowerCase().replace(/\s/g, '-')}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;