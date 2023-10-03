"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_sub_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_sub_categories.init(
    {
      name: DataTypes.STRING,
      m_categories_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "m_sub_categories",
      tableName: "m_sub_categories",
      timestamps: false,
    }
  );
  return m_sub_categories;
};
