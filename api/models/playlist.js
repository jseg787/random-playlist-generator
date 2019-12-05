"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {}

  Playlist.init(
    {
      name: { type: DataTypes.STRING }
    },
    {
      sequelize,
      modelName: "playlist"
    }
  );

  Playlist.associate = models => {
    // associations can be defined here
    models.Playlist.belongsToMany(models.Song, { through: "SongPlaylist" });
  };

  return Playlist;
};
