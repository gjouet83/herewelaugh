'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, { onDelete: 'cascade' });
      User.hasMany(models.Rate, { onDelete: 'cascade' });
      User.hasMany(models.SavedPost, { onDelete: 'cascade' });
    }
  }
  User.init(
    {
      username: DataTypes.STRING(40),
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      activated: DataTypes.BOOLEAN,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      birthdate: DataTypes.DATEONLY,
      describ: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
