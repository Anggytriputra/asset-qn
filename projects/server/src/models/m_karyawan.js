"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class m_karyawan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_karyawan.init(
    {
      nik: DataTypes.STRING,
      no_karyawan: DataTypes.INTEGER,
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      mobile: DataTypes.STRING,
      kode_jabatan: DataTypes.STRING,
      jabatan: DataTypes.STRING,
      loc_provinsi: DataTypes.INTEGER,
      loc_kota: DataTypes.INTEGER,
      flag_active: DataTypes.INTEGER,
      isUpdated: DataTypes.INTEGER,
      isDeleted: DataTypes.INTEGER,
      gaji_harian: DataTypes.DECIMAL,
      tunjangan_jabatan: DataTypes.DECIMAL,
      gaji_kerajinan: DataTypes.DECIMAL,
      gaji_disiplin: DataTypes.DECIMAL,
      rekening_bank: DataTypes.STRING,
      bank: DataTypes.INTEGER,
      photo_path: DataTypes.STRING,
      join_date: DataTypes.DATE,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      noktp: DataTypes.STRING,
      notes: DataTypes.STRING,
      id_jabatan: DataTypes.INTEGER,
      name_rekening: DataTypes.STRING,
      tgl_lahir: DataTypes.DATE,
      tempat_lahir: DataTypes.STRING,
      alamat: DataTypes.STRING,
      nama_kontak_darurat: DataTypes.STRING,
      perusahaan_pengalaman: DataTypes.STRING,
      total_pengalaman: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "m_karyawan",
      freezeTableName: true,
    }
  );
  return m_karyawan;
};
