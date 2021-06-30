'use strict';
const dataLaporan = require('../../src/helpers/dataLaporan');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('kriteria', {
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
      bobot: {
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
    await dataLaporan(1);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('kriteria');
  },
};
