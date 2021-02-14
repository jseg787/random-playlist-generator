import { Component } from 'react';
import React, { Component } from 'react';

class LoginToSpotify extends Component {
	render() {
		return (
			<a href={window.location.href.replace('3000', '8000')}>
				<button className="btn btn-lg btn-success">Log in to spotify</button>
			</a>
		);
	}
}

export default LoginToSpotify;
