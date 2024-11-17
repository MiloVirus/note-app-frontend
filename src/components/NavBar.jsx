import React from 'react';
import '../styles/navbar.css'

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navbar">
      <ul>
        <li
          className={activeTab === 'active' ? 'active' : ''}
          onClick={() => setActiveTab('active')}
        >
          Active Notes
        </li>
        <li
          className={activeTab === 'archived' ? 'active' : ''}
          onClick={() => setActiveTab('archived')}
        >
          Archived Notes
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
