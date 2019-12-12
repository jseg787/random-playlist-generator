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
    saving: false,
    saved: false,
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
    this.setState({
      loading: true,
      saved: false
    });
    this.resetSongs();
    for (let i = 0; i < this.state.numberOfSongs; i++) {
      await this.getASong();
    }
    this.setState({
      loading: false
    });
  };

  resetSongs = () => {
    this.setState({ songs: [] });
  };

  updateNumber = e => {
    this.setState({
      numberOfSongs: e.target.value
    });
  };

  updateTitleField = e => {
    this.setState({
      playlistName: e.target.value
    });
  };

  savePlaylist = async () => {
    this.setState({ saving: true });
    const me = await this.getMe();
    const playlistSongs = this.state.songs.map(song => song.uri);
    const playlist = await spotifyWebApi.createPlaylist(me.id, {
      name: this.state.playlistName
    });
    await spotifyWebApi.addTracksToPlaylist(playlist.id, playlistSongs);
    this.setState({
      saving: false,
      saved: true
    });
    setTimeout(() => this.setState({ saved: false }), 3000);
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
        key={song.name}
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
            {songItems[0] && (
              <div>
                <button onClick={this.savePlaylist}>Save Playlist</button>
                {this.state.saving && <Loading />}
                {this.state.saved && <p className="text-success">Saved</p>}
                <input
                  type="text"
                  placeholder="Name the playlist"
                  onChange={this.updateTitleField}
                />
              </div>
            )}
            {songItems}
          </div>
        )}
      </div>
    );
  }
}

export default GetPlaylist;
