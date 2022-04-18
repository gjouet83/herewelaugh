'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rate.belongsTo(models.User);
      Rate.belongsTo(models.Post);
    }
  }
  Rate.init(
    {
      userId: DataTypes.INTEGER.UNSIGNED,
      postId: DataTypes.INTEGER.UNSIGNED,
      like: DataTypes.INTEGER.UNSIGNED,
      dislike: DataTypes.INTEGER.UNSIGNED,
    },
    {
      sequelize,
      modelName: 'Rate',
    }
  );
  return Rate;
};
