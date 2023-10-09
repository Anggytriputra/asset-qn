"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.m_assets, { foreignKey: "m_asset_id" });
    }
  }
  m_stock.init(
    {
      quantity: DataTypes.INTEGER,
      m_asset_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "m_stock",
      tableName: "m_stock",
    }
  );
  return m_stock;
};
