import React from 'react';

class LoginToSpotify extends React.Component {
	render() {
		return (
			<a href="http://localhost:8000/login">
				<button className="btn btn-lg btn-success">Log in to spotify</button>
			</a>
		);
	}
}

export default LoginToSpotify;
