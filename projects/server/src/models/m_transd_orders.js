"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_transd_orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Hubungan dengan model m_transh_orders
      models.m_transd_orders.belongsTo(models.m_transh_orders, {
        foreignKey: "m_transh_order_id",
      });

      models.m_transd_orders.belongsTo(models.m_categories, {
        foreignKey: "m_category_id",
      });
    }
  }
  m_transd_orders.init(
    {
      m_transh_order_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      desc: DataTypes.STRING,
      m_category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "m_transd_orders",
    }
  );
  return m_transd_orders;
};
