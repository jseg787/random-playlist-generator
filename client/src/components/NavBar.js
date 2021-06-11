import React from 'react';
import logo from '../logo.png';
import '../styles/Navbar.css';

function NavBar() {
  return (
    <nav className="Navbar">
      <img class="Navbar-logo" src={logo} alt="logo" />
    </nav>
  );
}

export default NavBar;
