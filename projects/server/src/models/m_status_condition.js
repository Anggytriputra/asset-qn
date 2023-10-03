"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_status_condition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_status_condition.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "m_status_condition",
      tableName: "m_status_condition",
      timestamps: false, // Menonaktifkan timestamps
    }
  );
  return m_status_condition;
};
