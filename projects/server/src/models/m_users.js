"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class m_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  m_users.init(
    {
      id_karyawan: DataTypes.INTEGER,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      mobile: DataTypes.STRING,
      id_role: DataTypes.INTEGER,
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
      createdDtm: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedDtm: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "m_users",
      timestamps: true,
      createdAt: "createdDtm",
      updatedAt: "updatedDtm",
    }
  );

  return m_users;
};