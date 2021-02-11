import React from 'react';
import { Redirect } from 'react-router-dom';
import Song from '../components/Song';
import Loading from '../components/Loading';
import Search from '../components/Search';
import Spotify from 'spotify-web-api-js';
import { getMe, getGenres, getDateString } from '../SpotifyHelper';
import SavePlaylist from '../SavePlaylist';

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
		const genres = await getGenres();
		this.setDefaultTitle();
		this.setState({
			genres: genres,
			loading: false
		});
	};

	getASong = async () => {
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
		const title = getDateString;
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
		const me = await getMe();
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
		const { loggedIn } = this.props;
		const { songs, playingSong, loading, numberOfSongs, saving, saved, playlistName } = this.state;

		const songItems = songs.map((song) => (
			<Song
				songItem={song}
				playingSong={playingSong}
				setPlayingSong={this.setPlayingSong}
				saveSong={this.saveSong}
				key={song.name}
			/>
		));
		if (!loggedIn) return <Redirect to="/login" />;
		else {
			return (
				<div className="playlist">
					{loading ? (
						<Loading />
					) : (
						<div>
							<Search
								numberOfSongs={numberOfSongs}
								updateNumber={this.updateNumber}
								incrementNumber={this.incrementNumber}
								decrementNumber={this.decrementNumber}
								getAPlaylist={this.getAPlaylist}
							/>
							<SavePlaylist
								songs={songs}
								title={playlistName}
								updateTitle={this.updateTitleField}
								save={this.savePlaylist}
								saving={saving}
								saved={saved}
							/>
							{songItems}
						</div>
					)}
				</div>
			);
		}
	}
}

export default GetPlaylist;
