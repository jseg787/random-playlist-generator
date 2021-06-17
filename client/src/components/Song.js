import React from 'react';
import '../styles/Song.css';

function Song(props) {
  const { songItem, playingSong, setPlayingSong, saveSong } = props;
  const { album, artists, name, id } = songItem;
  const src = `https://open.spotify.com/embed/track/${id}`;
  return (
    <div className="Song">
      <div className="Song--card">
        <div className="Song--image">
          <img src={album.images[2].url} alt={name} />
        </div>

        <div className="Song--info">
          <div className="title">{name}</div>
          <div className="artist">{artists[0].name}</div>
          <div className="album">{album.name}</div>
        </div>

        <div className="Song--buttons">
          <button className="Song--buttons__save" onClick={() => saveSong(id)}>
            &#x2665;
          </button>
          <button
            className="Song--buttons__play"
            onClick={() => setPlayingSong(id)}
          >
            &#9658;
          </button>
        </div>
      </div>

      {playingSong === id && (
        <div className="player">
          <iframe
            src={src}
            width="250"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
            title={name}
          />
        </div>
      )}
    </div>
  );
}

export default Song;
