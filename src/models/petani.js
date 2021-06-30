'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class petani extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }
  petani.init(
    {
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      lahan: DataTypes.FLOAT,
      kepemilikan: DataTypes.FLOAT,
      dokumentasi: DataTypes.FLOAT,
      ekonomi: DataTypes.FLOAT,
      panen: DataTypes.FLOAT,
      bantuan: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'petani',
    }
  );
  return petani;
};
