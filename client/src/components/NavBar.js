import React from 'react';
import logo from '../logo.png';

function NavBar() {
	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
			<img src={logo} alt="logo" style={{ width: '1.8rem' }} />
		</nav>
	);
}

export default NavBar;
