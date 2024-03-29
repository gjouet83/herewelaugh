'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.User);
      Like.belongsTo(models.Post);
    }
  }
  Like.init(
    {
      userId: DataTypes.INTEGER.UNSIGNED,
      postId: DataTypes.INTEGER.UNSIGNED,
      like: DataTypes.INTEGER.UNSIGNED,
    },
    {
      sequelize,
      modelName: 'Like',
    }
  );
  return Like;
};
