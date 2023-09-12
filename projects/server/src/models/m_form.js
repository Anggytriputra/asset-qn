"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.m_assets_in, {
        foreignKey: "m_form_id",
      });
    }
  }
  m_form.init(
    {
      column_name: DataTypes.STRING,
      m_category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "m_form",
      tableName: "m_form",
    }
  );
  return m_form;
};
