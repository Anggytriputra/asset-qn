"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_trans_h extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_trans_h.hasMany(models.m_trans_d, {
        foreignKey: "m_trans_h_id",
      });
      models.m_trans_h.belongsTo(models.m_cabang, {
        foreignKey: "cabang_id_out",
        as: "CabangOut", // Alias untuk cabang_id_out
      });
      models.m_trans_h.belongsTo(models.m_cabang, {
        foreignKey: "cabang_id_in",
        as: "CabangIn", // Alias untuk cabang_id_in
      });
      models.m_trans_h.belongsTo(models.m_users, {
        foreignKey: "createdAt",
      });
      models.m_trans_h.belongsTo(models.m_status, {
        foreignKey: "m_status_id",
      });
      models.m_trans_h.belongsTo(models.m_users, {
        foreignKey: "createdBy",
        as: "user_transfer", // Anda bisa memberikan alias yang sesuai
      });
      models.m_trans_h.belongsTo(models.m_users, {
        foreignKey: "user_id_confirmation",
        as: "user_confirmation", // Anda bisa memberikan alias yang sesuai
      });
      models.m_trans_h.belongsTo(models.m_users, {
        foreignKey: "user_id_penerima",
        as: "user_penerima", // Anda bisa memberikan alias yang sesuai
      });
    }
  }
  m_trans_h.init(
    {
      cabang_id_out: DataTypes.INTEGER,
      cabang_id_in: DataTypes.INTEGER,
      desc: DataTypes.STRING,
      desc_received: DataTypes.STRING,
      user_id_confirmation: DataTypes.STRING,
      m_status_id: DataTypes.INTEGER,
      no_transfer: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      user_id_penerima: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      recipient_name: DataTypes.STRING,
      date: {
        type: DataTypes.DATEONLY,
        get() {
          const rawDate = this.getDataValue("date");
          if (rawDate) {
            const dateObject = new Date(rawDate);
            return dateObject.toISOString().slice(0, 10);
          }
          return null;
        },
      },
    },

    {
      sequelize,
      modelName: "m_trans_h",
      tableName: "m_trans_h",
    }
  );
  return m_trans_h;
};
