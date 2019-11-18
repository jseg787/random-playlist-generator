import React from "react";

function Song() {
  return (
    <div className="song">
      <div className="artwork"></div>
      <div className="info">
        <div className="title"></div>
        <div className="artist"></div>
        <div className="album"></div>
      </div>
      <div className="buttons">
        <button className="add-to-likes">
          {/* add the functionality for adding a song to spotify likes */}
        </button>
      </div>
    </div>
  );
}

export default Song;