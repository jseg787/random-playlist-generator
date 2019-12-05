import React from "react";
import Song from "../components/Song";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

class GetPlaylist extends React.Component {
  state = {
    playlistName: "Default Name",
    numberOfSongs: 10,
    loading: false,
    songs: []
  };

  getGenres = async () => {
    const genres = await spotifyWebApi.getAvailableGenreSeeds();
    return genres.genres;
  };

  getMe = async () => {
    const me = await spotifyWebApi.getMe();
    console.log(me);
    return me;
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
    //   name: "Look ma I made a playlist"
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

  render() {
    const songItems = this.state.songs.map(song => <Song songItem={song} />);
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
          <div>
            {/* <button onClick={this.getMe}>Do other stuff</button> */}
            {/* <button onClick={this.getASong}>Get a song</button> */}
            {/* <button onClick={this.resetSongs}>Reset songs</button> */}
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
