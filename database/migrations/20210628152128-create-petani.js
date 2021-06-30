'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('petanis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      name: {
        type: Sequelize.STRING,
      },
      lahan: {
        type: Sequelize.FLOAT,
      },
      kepemilikan: {
        type: Sequelize.FLOAT,
      },
      dokumentasi: {
        type: Sequelize.FLOAT,
      },
      ekonomi: {
        type: Sequelize.FLOAT,
      },
      panen: {
        type: Sequelize.FLOAT,
      },
      bantuan: {
        type: Sequelize.FLOAT,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('petanis');
  },
};
