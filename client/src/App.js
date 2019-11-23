import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import PostsListPage from "./pages/PostsListPage";
import PostFormPage from "./pages/PostFormPage";
import ShowPostPage from "./pages/ShowPostPage";
import AboutUsPage from "./pages/AboutUsPage";
import Spotify from "spotify-web-api-js";

import "./App.css";

const spotifyWebApi = new Spotify();

function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <Link className="navbar-brand" to="/">
        Micro Blog
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/posts/new">
            Create a Micro Post
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/about-us">
            About Us
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
      nowPlaying: {
        name: "not checked",
        image: ""
      }
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getMe = async () => {
    const me = await spotifyWebApi.getMe();
    console.log(me);
    return me;
  };

  getNowPlaying = async () => {
    const response = await spotifyWebApi.getMyCurrentPlaybackState();
    console.log(response);
    this.setState({
      nowPlaying: {
        name: response.item.name,
        image: response.item.album.images[0].url
      }
    });
  };

  getGenres = async () => {
    const genres = await spotifyWebApi.getAvailableGenreSeeds();
    return genres.genres;
  };

  login = async () => {
    const auth = await fetch("/api/spotify/login");
    spotifyWebApi.setAccessToken(auth);
  }

  getSong = async () => {
    const song = await fetch("/api/spotify/song");
    const genres = await song.json();
    console.log(genres);
  }

  render() {
    return (
      <Router>
        <Navigation />
        {/* <div className="container-fluid text-center">
          <div className="row justify-content-center">
            <Switch>
              <Route path="/posts/new" component={PostFormPage} />
              <Route path="/posts/:id" component={ShowPostPage} />
              <Route path="/about-us" component={AboutUsPage} />
              <Route path="/" component={PostsListPage} />
            </Switch>
          </div>
        </div> */}
        <a href="http://localhost:8080/login">
          Log in to spotify
        </a>
        <button onClick={this.getMe}>Do other stuff</button>
      </Router>
    );
  }
}

export default App;
