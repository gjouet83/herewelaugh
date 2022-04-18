'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SavedPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SavedPost.belongsTo(models.User);
      SavedPost.belongsTo(models.Post);
    }
  }
  SavedPost.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'SavedPost',
    }
  );
  return SavedPost;
};
