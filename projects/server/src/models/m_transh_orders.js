"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_transh_orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Hubungan dengan model m_transd_orders
      models.m_transh_orders.hasMany(models.m_transd_orders, {
        foreignKey: "m_transh_order_id",
      });

      models.m_transh_orders.belongsTo(models.m_cabang, {
        foreignKey: "m_cabang_id",
      });

      models.m_transh_orders.belongsTo(models.m_users, {
        foreignKey: "m_user_id",
      });

      models.m_transh_orders.belongsTo(models.m_status, {
        foreignKey: "m_status_id",
      });
    }
  }
  m_transh_orders.init(
    {
      m_cabang_id: DataTypes.INTEGER,
      m_user_id: DataTypes.INTEGER,
      m_status_id: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "m_transh_orders",
    }
  );
  return m_transh_orders;
};
