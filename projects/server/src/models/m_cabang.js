"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_cabang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_cabang.init(
    {
      cabang_no: DataTypes.INTEGER,
      cabang_name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      flag_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        // allowNull: false,
      },
      isUpdated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        // allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        // allowNull: false,
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      lat: DataTypes.STRING,
      lng: DataTypes.STRING,
      initial: DataTypes.STRING,
      max_jarak_absen: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "m_cabang",
      tableName: "m_cabang",
    }
  );
  return m_cabang;
};
