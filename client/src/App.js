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
import Song from "./components/Song";
// import ShowSongsPage from "./pages/ShowSongsPage"
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
      songs: []
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

  getGenres = async () => {
    const genres = await spotifyWebApi.getAvailableGenreSeeds();
    return genres.genres;
  };

  getASong = async () => {
    let tracks;
    let foundTrack = false;
    while (!foundTrack) {
      const genres = await this.getGenres();
      const randomGenre = genres[Math.floor(Math.random() * genres.length)];
      console.log(randomGenre);
      tracks = await spotifyWebApi.searchTracks(`genre:${randomGenre}`, {
        limit: 1,
        offset: Math.floor(Math.random() * 10001)
      });
      if (tracks.tracks.items[0]) {
        foundTrack = true;
      }
    }
    console.log(tracks.tracks.items[0]);
    this.setState(state => {
      const songs = [...state.songs, tracks.tracks.items[0]];
      return {
        songs
      };
    });
    return tracks.tracks.items[0];
  };

  render() {
    const songItems = this.state.songs.map(song => <Song songItem={song} />);
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
          <button>Log in to spotify</button>
        </a>
        <button onClick={this.getMe}>Do other stuff</button>
        <button onClick={this.getASong}>Do other stuff</button>
        {songItems}
      </Router>
    );
  }
}

export default App;
