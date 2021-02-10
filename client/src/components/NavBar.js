import React from 'react';
import logo from './logo.png';

function NavBar() {
	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
			<Link className="navbar-brand" to="/">
				<img src={logo} alt="logo" style={{ width: '1.8rem' }} />
			</Link>
			<ul className="navbar-nav mr-auto">
				<li className="nav-item">
					{/* <NavLink className="nav-link" exact to="/playlists">
            Other Page
          </NavLink> */}
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
