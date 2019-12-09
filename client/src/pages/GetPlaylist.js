import React from "react";
import Song from "../components/Song";
import Loading from "../components/Loading";
// import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

class GetPlaylist extends React.Component {
  state = {
    playlistName: "Default Name",
    numberOfSongs: 10,
    loading: false,
    genres: [],
    songs: [],
    playingSong: ""
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    const genres = await this.getGenres();
    this.setState({
      genres: genres,
      loading: false
    });
  };

  getGenres = async () => {
    const genreData = await spotifyWebApi.getAvailableGenreSeeds();
    return genreData.genres;
  };

  getMe = async () => {
    const me = await spotifyWebApi.getMe();
    return me;
  };

  getASong = async () => {
    let newSongData;
    let foundTrack = false;
    while (!foundTrack) {
      const randomGenre = this.state.genres[
        Math.floor(Math.random() * this.state.genres.length)
      ];
      newSongData = await spotifyWebApi.searchTracks(`genre:${randomGenre}`, {
        limit: 1,
        offset: Math.floor(Math.random() * 10001)
      });
      if (newSongData.tracks.items[0]) {
        foundTrack = true;
      }
    }
    console.log(newSongData.tracks.items[0]);
    this.setState(state => {
      const songs = [...state.songs, newSongData.tracks.items[0]];
      return {
        songs
      };
    });
  };

  getAPlaylist = async () => {
    // const me = await this.getMe();
    this.setState({
      loading: true
    });
    this.resetSongs();
    for (let i = 0; i < this.state.numberOfSongs; i++) {
      await this.getASong();
    }
    this.setState({
      loading: false
    });
    // const playlist = await spotifyWebApi.createPlaylist(me.id, {
    //   name: this.state.playlistName
    // });
  };

  resetSongs = () => {
    this.setState({ songs: [] });
  };

  updateNumber = e => {
    this.setState({
      numberOfSongs: e.target.value
    });
  };

  setPlayingSong = id => {
    this.setState({
      playingSong: id
    });
  };

  render() {
    const songItems = this.state.songs.map(song => (
      <Song
        songItem={song}
        playingSong={this.state.playingSong}
        setPlayingSong={this.setPlayingSong}
      />
    ));
    return (
      <div className="playlist">
        {this.state.loading ? (
          <Loading />
        ) : (
          <div>
            <button onClick={this.getAPlaylist}>Get a playlist</button>
            <input
              type="number"
              min="1"
              max="20"
              step="1"
              onChange={this.updateNumber}
              value={this.state.numberOfSongs}
            />
            {songItems}
          </div>
        )}
      </div>
    );
  }
}

export default GetPlaylist;
