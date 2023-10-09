"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_assets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.m_assets_in, { foreignKey: "m_asset_id" });
      this.belongsTo(models.m_cabang, { foreignKey: "m_cabang_id" });
      // this.belongsTo(models.m_stock, { foreignKey: "m_stock_id" });
      this.belongsTo(models.m_categories, { foreignKey: "m_category_id" });
      this.belongsTo(models.m_sub_categories, {
        foreignKey: "m_sub_category_id",
      });
      this.hasOne(models.m_stock, { foreignKey: "m_asset_id" });
      // this.hasMany(models.m_owner, { foreignKey: "m_owner_id" });
      this.hasMany(models.m_images, { foreignKey: "m_asset_id" });
      this.belongsTo(models.m_status_condition, {
        foreignKey: "m_status_condition_id",
      });

      models.m_assets.belongsTo(models.m_owner, {
        foreignKey: "m_owner_id",
        as: "owner", // Anda bisa memberikan alias yang sesuai
      });
    }
  }
  m_assets.init(
    {
      m_category_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
      m_cabang_id: DataTypes.INTEGER,
      m_stock_id: DataTypes.INTEGER,
      m_sub_category_id: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      m_owner_id: DataTypes.INTEGER,
      m_status_condition_id: DataTypes.INTEGER,
      pic: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "m_assets",
    }
  );
  return m_assets;
};
