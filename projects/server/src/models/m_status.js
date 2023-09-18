"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_status.hasMany(models.m_transh_orders, {
        foreignKey: "m_status_id",
      });
    }
  }
  m_status.init(
    {
      status_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "m_status", // Sesuaikan dengan nama model yang ingin Anda gunakan
      tableName: "m_status",
      timestamps: false, // Menonaktifkan timestamps
    }
  );
  return m_status;
};
