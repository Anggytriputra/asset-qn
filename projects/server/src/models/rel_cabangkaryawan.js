"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rel_cabangkaryawan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rel_cabangkaryawan.init(
    {
      id_cabang: DataTypes.INTEGER,
      id_karyawan: DataTypes.INTEGER,
      notes: DataTypes.TEXT,
      flag_active: DataTypes.INTEGER,
      isUpdated: DataTypes.INTEGER,
      isDeleted: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "rel_cabangkaryawan",
      freezeTableName: true,
    }
  );
  return rel_cabangkaryawan;
};
