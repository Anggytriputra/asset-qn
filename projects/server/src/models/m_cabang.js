const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class m_cabang extends Model {
    static associate(models) {
      // define association here
      m_cabang.hasMany(models.m_transh_orders, {
        foreignKey: "m_cabang_id",
      });
    }
  }

  m_cabang.init(
    {
      cabang_no: DataTypes.INTEGER,
      cabang_name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      flag_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isUpdated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      lat: DataTypes.STRING,
      lng: DataTypes.STRING,
      initial: DataTypes.STRING,
      max_jarak_absen: DataTypes.INTEGER,
      createdDtm: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedDtm: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    },
    {
      sequelize,
      modelName: "m_cabang",
      tableName: "m_cabang",
      timestamps: false, // Nonaktifkan createdAt dan updatedAt bawaan Sequelize
    }
  );

  return m_cabang;
};
