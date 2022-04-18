'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      },
      userId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      postId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        onDelete: 'CASCADE',
        references: {
          model: 'Posts',
          key: 'id',
        },
      },
      like: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      dislike: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rates');
  },
};
