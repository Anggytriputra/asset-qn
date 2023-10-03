"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.m_users, {
        foreignKey: {
          name: "user_id",
        },
      });
    }
  }
  m_tokens.init(
    {
      user_id: DataTypes.INTEGER,
      token: {
        type: DataTypes.STRING,
      },
      expired: {
        type: DataTypes.DATE,
      },

      valid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      status: {
        type: DataTypes.ENUM("LOGIN", "FORGOT-PASSWORD"),
      },
    },
    {
      sequelize,
      modelName: "m_tokens",
      tableName: "m_tokens",
      updatedAt: false,
    }
  );
  return m_tokens;
};
