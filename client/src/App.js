import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import GetPlaylist from './pages/GetPlaylist';
import LoginToSpotify from './pages/LoginToSpotify';
import NavBar from './components/NavBar';
import { getHashParams, setAccessToken } from './SpotifyHelper';

import './App.css';

class App extends Component {
	constructor() {
		super();
		const params = getHashParams();
		this.state = {
			access_token: params.access_token
		};
		if (params.access_token) {
			setAccessToken(params.access_token);
		}
	}

	render() {
		return (
			<Router>
				<NavBar />
				<div className="container-fluid text-center">
					<div className="row justify-content-center">
						<Switch>
							<Route path="/login" component={LoginToSpotify} />
							<Route path="/" render={() => <GetPlaylist loggedIn={this.state.access_token} />} />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
