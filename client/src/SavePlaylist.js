import React, { Component } from 'react';
import Loading from './components/Loading';

function SavePlaylist(props) {
	const { songs, title, updateTitle, save, saving, saved } = props;
	return (
		<div className="d-flex justify-content-center my-3">
			<input
				className="playlist-title mx-3"
				type="text"
				placeholder="Name the playlist"
				value={title}
				onChange={updateTitle}
			/>
			<button className="btn btn-success" onClick={save}>
				Save Playlist
			</button>
			{saving && <Loading />}
			{saved && <p className="text-success">Saved</p>}
		</div>
	);
}

export default SavePlaylist;
