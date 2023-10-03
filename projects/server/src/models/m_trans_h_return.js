"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_trans_h_return extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      m_trans_h_return.hasMany(models.m_trans_d_return, {
        foreignKey: "m_trans_hr_id",
      });

      models.m_trans_h_return.belongsTo(models.m_cabang, {
        foreignKey: "cabang_id_out",
        as: "CabangOut", // Alias untuk cabang_id_out
      });

      // models.m_trans_h_return.belongsTo(models.m_cabang, {
      //   foreignKey: "cabang_id_in",
      //   as: "CabangIn", // Alias untuk cabang_id_in
      // });

      models.m_trans_h_return.belongsTo(models.m_status_condition, {
        foreignKey: "m_status_id",
      });

      models.m_trans_h_return.belongsTo(models.m_users, {
        foreignKey: "createdBy",
        as: "userReturn", // Anda bisa memberikan alias yang sesuai
      });

      models.m_trans_h_return.belongsTo(models.m_status_condition, {
        foreignKey: "m_status_return_id",
        as: "statusReturn", // Anda bisa memberikan alias yang sesuai
      });

      models.m_trans_h_return.belongsTo(models.m_status, {
        foreignKey: "m_status_id",
      });
      models.m_trans_h_return.belongsTo(models.m_owner, {
        foreignKey: "m_owner_id",
        as: "owner",
      });
    }
  }
  m_trans_h_return.init(
    {
      cabang_id_out: DataTypes.INTEGER,
      // cabang_id_in: DataTypes.INTEGER,
      destination: DataTypes.STRING,
      desc: DataTypes.STRING,
      desc_received: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      m_status_return_id: DataTypes.INTEGER,
      m_owner_id: DataTypes.INTEGER,
      m_status_id: DataTypes.INTEGER,
      no_return: DataTypes.STRING,
      courier: DataTypes.STRING,
      updatedBy: DataTypes.INTEGER,
      flag_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      destination: DataTypes.ENUM(
        "PT. QUANTUM NUSATAMA PUSAT",
        "PT. INDORENT",
        "PT. TUNAS RENTAL",
        "PT. MPM RENTAL"
      ),
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
      modelName: "m_trans_h_return",
      tableName: "m_trans_h_return",
    }
  );
  return m_trans_h_return;
};
