'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.hasMany(models.Rate, { onDelete: 'cascade' });
      Post.belongsTo(models.User);
    }
  }
  Post.init(
    {
      userId: DataTypes.INTEGER.UNSIGNED,
      username: DataTypes.STRING(40),
      content: DataTypes.TEXT,
      attachment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
