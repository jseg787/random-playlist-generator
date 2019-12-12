import React from "react";

function Song({ songItem, playingSong, setPlayingSong }) {
  const { album, artists, name, id } = songItem;
  const src = `https://open.spotify.com/embed/track/${id}`;
  return (
    <div className="song">
      <div className="artwork">
        <img src={album.images[2].url} alt={name} />
      </div>
      <div className="info">
        <div className="title">{name}</div>
        <div className="artist">{artists[0].name}</div>
        <div className="album">{album.name}</div>
      </div>
      <div className="buttons">
        <button className="add-to-likes">
          {/* add the functionality for adding a song to spotify likes */}
          &#x2665;
        </button>
        <button onClick={() => setPlayingSong(id)}>Show player</button>
      </div>
      {playingSong === id && (
        <div className="player">
          <iframe
            src={src}
            width="250"
            height="80"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
            title={name}
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Song;
