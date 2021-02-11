import React from 'react';

function Search(props) {
	const { numberOfSongs, updateNumber, incrementNumber, decrementNumber, getAPlaylist } = props;

	return (
		<div className="d-flex justify-content-center mb-3">
			<input
				className="number"
				type="number"
				min="1"
				max="20"
				step="1"
				onChange={updateNumber}
				value={numberOfSongs}
			/>
			<div className="number-buttons d-flex flex-column">
				<button className="change-number" onClick={incrementNumber}>
					+
				</button>
				<button className="change-number" onClick={decrementNumber}>
					-
				</button>
			</div>
			<p className="text-light" style={{ fontSize: '1.5rem', margin: '.5rem 1rem' }}>
				songs
			</p>
			<button className="btn btn-primary" onClick={getAPlaylist}>
				Get a playlist
			</button>
		</div>
	);
}

export default Search;
