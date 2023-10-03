"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_trans_d extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // m_trans_d.hasMany(models.m_assets_in, {
      //   foreignKey: "m_trans_h_id",
      // });

      m_trans_d.belongsTo(models.m_assets_in, {
        // Tambahkan asosiasi ke m_assets_in
        foreignKey: "m_asset_id",
      });

      m_trans_d.belongsTo(models.m_trans_h, {
        foreignKey: "m_trans_h_id",
      });

      m_trans_d.belongsTo(models.m_categories, {
        foreignKey: "m_category_id",
      });
    }
  }
  m_trans_d.init(
    {
      m_asset_id: DataTypes.INTEGER,
      m_asset_name: DataTypes.STRING,
      serial_number: DataTypes.STRING,
      no_polisi: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      m_category_id: DataTypes.INTEGER,
      m_trans_h_id: DataTypes.INTEGER,
      flag_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "m_trans_d",
      tableName: "m_trans_d",
    }
  );
  return m_trans_d;
};
