'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      userId: DataTypes.STRING,
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
      image: { type: DataTypes.STRING, defaultValue: 'image' },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
