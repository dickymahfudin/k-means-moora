'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kriteria extends Model {
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
  kriteria.init(
    {
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      bobot: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'kriteria',
    }
  );
  return kriteria;
};
