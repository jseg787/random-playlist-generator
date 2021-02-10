import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import ShowPlaylists from './pages/ShowPlaylists';
import GetPlaylist from './pages/GetPlaylist';
import LoginToSpotify from './pages/LoginToSpotify';
import NavBar from './components/NavBar';
import Spotify from 'spotify-web-api-js';

import './App.css';

const spotifyWebApi = new Spotify();

class App extends React.Component {
	constructor() {
		super();
		const params = this.getHashParams();
		this.state = {
			loggedIn: params.access_token ? true : false,
			user: {}
		};
		if (params.access_token) {
			spotifyWebApi.setAccessToken(params.access_token);
		}
	}

	getHashParams = () => {
		var hashParams = {};
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		while ((e = r.exec(q))) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
		}
		return hashParams;
	};

	getMe = async () => {
		const me = await spotifyWebApi.getMe();
		console.log(me);
		return me;
	};

	render() {
		// if (this.state.loggedIn) {
		return (
			<Router>
				<NavBar />
				<div className="container-fluid text-center">
					<div className="row justify-content-center">
						<Switch>
							{/* <Route path="/playlists/:id" component={ShowPlaylists} /> */}
							<Route path="/login" component={LoginToSpotify} />
							<Route path="/playlists" component={ShowPlaylists} />
							<Route
								path="/"
								/* component={GetPlaylist} */ render={(props) => (
									<GetPlaylist loggedIn={this.state.loggedIn} /* {...props} */ />
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
		// } else {
		//   return (
		//     <a href="http://localhost:8080/login">
		//       <button>Log in to spotify</button>
		//     </a>
		//   );
		// }
	}
}

export default App;
