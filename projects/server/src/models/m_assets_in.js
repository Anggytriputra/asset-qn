"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_assets_in extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.m_assets, {
        foreignKey: "m_asset_id",
      });

      this.belongsTo(models.m_form, {
        foreignKey: "m_form_id",
      });

      this.hasMany(models.m_trans_d, {
        // Tambahkan asosiasi ke m_trans_d
        foreignKey: "m_asset_id",
        as: "m_trans_d",
      });
    }
  }
  m_assets_in.init(
    {
      m_form_id: DataTypes.INTEGER,
      value: DataTypes.STRING,
      m_asset_id: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "m_assets_in",
      tableName: "m_assets_in",
    }
  );
  return m_assets_in;
};
