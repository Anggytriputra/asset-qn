"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.m_categories.hasMany(models.m_transd_orders, {
        foreignKey: "m_category_id",
      });
    }
  }
  m_categories.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "m_categories",
      timestamps: false,
    }
  );
  return m_categories;
};
