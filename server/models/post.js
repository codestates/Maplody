'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` fil e will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      musicArtist: DataTypes.STRING,
      musicTitle: DataTypes.STRING,
      place: DataTypes.STRING,
      storyboard: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Post',
    },
  );
  return Post;
};
