"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Song extends Model {}

  Song.init(
    {
      name: { type: DataTypes.STRING },
      artist: { type: DataTypes.STRING },
      album: { type: DataTypes.STRING },
      artwork: { type: DataTypes.STRING },
      songID: { type: DataTypes.STRING }
    },
    {
      sequelize,
      modelName: "song"
    }
  );

  Song.associate = models => {
    // associations can be defined here
    models.Song.belongsToMany(models.Playlist, { through: "SongPlaylist" });
  };

  return Song;
};
