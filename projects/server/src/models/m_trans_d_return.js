"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_trans_d_return extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_trans_d_return.belongsTo(models.m_assets, {
        foreignKey: "m_asset_id",
        targetKey: "id", // Kolom utama dalam model m_assets
      });

      m_trans_d_return.belongsTo(models.m_trans_h, {
        foreignKey: "m_trans_hr_id",
      });

      m_trans_d_return.belongsTo(models.m_categories, {
        foreignKey: "m_category_id",
      });
    }
  }

  m_trans_d_return.init(
    {
      m_asset_id: DataTypes.INTEGER,
      m_asset_name: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      m_category_id: DataTypes.INTEGER,
      serial_number: DataTypes.STRING,
      no_polisi: DataTypes.STRING,
      m_trans_hr_id: DataTypes.INTEGER,
      flag_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "m_trans_d_return",
      tableName: "m_trans_d_return",
    }
  );
  return m_trans_d_return;
};
