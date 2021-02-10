import React from 'react';
import { Redirect } from 'react-router-dom';
import Song from '../components/Song';
import Loading from '../components/Loading';
import Search from '../components/Search';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class GetPlaylist extends React.Component {
	state = {
		playlistName: '',
		numberOfSongs: 5,
		loading: false,
		saving: false,
		saved: false,
		genres: [],
		songs: [],
		playingSong: ''
	};

	componentDidMount = async () => {
		this.setState({ loading: true });
		const genres = await this.getGenres();
		this.setDefaultTitle();
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
		console.log('getting a song');
		let newSongData;
		let foundTrack = false;
		while (!foundTrack) {
			const randomGenre = this.state.genres[Math.floor(Math.random() * this.state.genres.length)];
			try {
				newSongData = await spotifyWebApi.searchTracks(`genre:${randomGenre}`, {
					limit: 1,
					offset: Math.floor(Math.random() * 100)
				});
			} catch (err) {
				continue;
			}
			if (newSongData.tracks.items[0]) {
				foundTrack = true;
			}
		}
		console.log(newSongData.tracks.items[0]);
		this.setState((state) => {
			const songs = [ ...state.songs, newSongData.tracks.items[0] ];
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
		this.setDefaultTitle();
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

	updateNumber = (e) => {
		this.setState({ numberOfSongs: e.target.value }, this.validateNumber);
	};

	incrementNumber = () => {
		this.setState({ numberOfSongs: this.state.numberOfSongs + 1 }, this.validateNumber);
	};

	decrementNumber = () => {
		this.setState({ numberOfSongs: this.state.numberOfSongs - 1 }, this.validateNumber);
	};

	validateNumber = () => {
		if (this.state.numberOfSongs < 1) {
			this.setState({
				numberOfSongs: 1
			});
		} else if (this.state.numberOfSongs > 20) {
			this.setState({
				numberOfSongs: 20
			});
		}
	};

	setDefaultTitle = () => {
		const date = new Date();
		const day = date.getDay().toString();
		const month = date.getMonth().toString();
		const year = date.getFullYear().toString();
		const hour = date.getHours().toString();
		const minutes = date.getMinutes().toString();
		const title = `${year}-${month}-${day} ${hour}:${minutes}`;
		this.setState({ playlistName: title });
	};

	updateTitleField = (e) => {
		this.setState(
			{
				playlistName: e.target.value
			},
			() => {
				if (this.state.playlistName === '') {
					this.setDefaultTitle();
				}
			}
		);
	};

	savePlaylist = async () => {
		this.setState({ saving: true });
		const me = await this.getMe();
		const playlistSongs = this.state.songs.map((song) => song.uri);
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

	saveSong = async (id) => {
		await spotifyWebApi.addToMySavedTracks([ id ]);
	};

	setPlayingSong = (id) => {
		this.setState({
			playingSong: id
		});
	};

	render() {
		const songItems = this.state.songs.map((song) => (
			<Song
				songItem={song}
				playingSong={this.state.playingSong}
				setPlayingSong={this.setPlayingSong}
				saveSong={this.saveSong}
				key={song.name}
			/>
		));
		if (!this.props.loggedIn) return <Redirect to="/login" />;
		else {
			return (
				<div className="playlist">
					{this.state.loading ? (
						<Loading />
					) : (
						<div>
							<Search
								numberOfSongs={this.state.numberOfSongs}
								updateNumber={this.updateNumber}
								incrementNumber={this.incrementNumber}
								decrementNumber={this.decrementNumber}
								getAPlaylist={this.getAPlaylist}
							/>
							{songItems[0] && (
								<div className="d-flex justify-content-center my-3">
									<input
										className="playlist-title mx-3"
										type="text"
										placeholder="Name the playlist"
										onChange={this.updateTitleField}
									/>
									<button className="btn btn-success" onClick={this.savePlaylist}>
										Save Playlist
									</button>
									{this.state.saving && <Loading />}
									{this.state.saved && <p className="text-success">Saved</p>}
								</div>
							)}
							{songItems}
						</div>
					)}
				</div>
			);
		}
	}
}

export default GetPlaylist;
