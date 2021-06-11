import React from 'react';
import '../styles/Search.css';

function Search(props) {
  const {
    numberOfSongs,
    updateNumber,
    incrementNumber,
    decrementNumber,
    getAPlaylist,
  } = props;

  return (
    <div className="Search">
      <p>Get</p>
      <input
        className="Search-number"
        type="number"
        min="1"
        max="20"
        step="1"
        onChange={updateNumber}
        value={numberOfSongs}
      />
      <div className="Search-number--buttons">
        <button onClick={incrementNumber}>+</button>
        <button onClick={decrementNumber}>-</button>
      </div>
      <p className="">songs</p>
      <button className="Search-button" onClick={getAPlaylist}>
        Get a playlist
      </button>
    </div>
  );
}

export default Search;
