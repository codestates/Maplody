'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {}
  }
  Post.init(
    {
      musicArtist: DataTypes.STRING,
      musicTitle: DataTypes.STRING,
      getAddress: DataTypes.STRING,
      storyBoard: DataTypes.STRING,
      url: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      lat: DataTypes.STRING,
      lng: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Post',
    },
  );
  return Post;
};
