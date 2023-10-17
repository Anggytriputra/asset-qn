"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_assets_name extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      m_assets_name.belongsTo(models.m_categories, {
        foreignKey: "m_category_id",
      });
    }
  }
  m_assets_name.init(
    {
      name: DataTypes.STRING,
      m_category_id: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      flag_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "m_assets_name",
      tableName: "m_assets_name",
    }
  );
  return m_assets_name;
};
