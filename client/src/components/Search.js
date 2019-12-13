import React from "react";

function Search({
  numberOfSongs,
  updateNumber,
  incrementNumber,
  decrementNumber,
  getAPlaylist
}) {
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
      <p className="text-light mr-3" style={{ fontSize: "1.5rem" }}>
        songs
      </p>
      <button className="btn btn-primary" onClick={getAPlaylist}>
        Get a playlist
      </button>
    </div>
  );
}

export default Search;
