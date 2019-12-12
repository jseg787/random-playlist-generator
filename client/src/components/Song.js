import React from "react";

function Song({ songItem, playingSong, setPlayingSong }) {
  const { album, artists, name, id } = songItem;
  const src = `https://open.spotify.com/embed/track/${id}`;
  return (
    <div className="song">
      <div className="container d-flex justify-content-between">
        <div className="row w-100">
          <div className="artwork col-3">
            <img
              // className="img-thumbnail"
              src={album.images[2].url}
              alt={name}
            />
          </div>
          <div className="info col-6 d-flex flex-column">
            <div className="title">{name}</div>
            <div className="artist">{artists[0].name}</div>
            <div className="album">{album.name}</div>
          </div>
          <div className="buttons col-3 d-flex flex-column">
            <button className="btn btn-light add-to-likes d-block">
              {/* add the functionality for adding a song to spotify likes */}
              &#x2665;
            </button>
            <button className="btn btn-success d-block" onClick={() => setPlayingSong(id)}>&#9658;</button>
          </div>
        </div>
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
