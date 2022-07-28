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
      Post.hasMany(models.Like, { onDelete: 'cascade' });
      Post.hasMany(models.SavedPost, { onDelete: 'cascade' });
      Post.belongsTo(models.User);
    }
  }
  Post.init(
    {
      userId: DataTypes.INTEGER.UNSIGNED,
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
