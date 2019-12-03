import React from "react";

function Song(props) {
  const { songItem } = props;
  const { album, artists, name } = songItem;
  return (
    <div className="song">
      <div className="artwork">
        <img src={album.images[2].url} />
      </div>
      <div className="info">
        <div className="title">{name}</div>
        <div className="artist">{artists[0].name}</div>
        <div className="album">{album.name}</div>
      </div>
      <div className="buttons">
        <button className="add-to-likes">
          {/* add the functionality for adding a song to spotify likes */}
          Add to likes
        </button>
      </div>
    </div>
  );
}

export default Song;
