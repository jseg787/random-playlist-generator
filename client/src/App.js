import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import ShowPlaylists from "./pages/ShowPlaylists";
import GetPlaylist from "./pages/GetPlaylist";
import Spotify from "spotify-web-api-js";

import "./App.css";

const spotifyWebApi = new Spotify();

function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <Link className="navbar-brand" to="/">
        Random Playlist Generator
      </Link>
      <ul className="navbar-nav mr-auto">
        {/* <li className="nav-item">
          <NavLink className="nav-link" exact to="/posts/new">
            Create a Micro Post
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/about-us">
            About Us
          </NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/playlists">
            Other Page
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

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
    if (this.state.loggedIn) {
      return (
        <Router>
          <Navigation />
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                {/* <Route path="/posts/new" component={PostFormPage} />
                <Route path="/posts/:id" component={ShowPostPage} />
                <Route path="/about-us" component={AboutUsPage} />
                <Route path="/" component={PostsListPage} /> */}
                <Route path="/playlists" component={ShowPlaylists} />
                <Route path="/" component={GetPlaylist} />
              </Switch>
            </div>
          </div>
        </Router>
      );
    } else {
      return (
        <a href="http://localhost:8080/login">
          <button>Log in to spotify</button>
        </a>
      );
    }
  }
}

export default App;
