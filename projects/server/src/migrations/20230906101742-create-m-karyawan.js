'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_karyawans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nik: {
        type: Sequelize.STRING
      },
      no_karyawan: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      kode_jabatan: {
        type: Sequelize.STRING
      },
      jabatan: {
        type: Sequelize.STRING
      },
      loc_provinsi: {
        type: Sequelize.INTEGER
      },
      loc_kota: {
        type: Sequelize.INTEGER
      },
      flag_active: {
        type: Sequelize.INTEGER
      },
      isUpdated: {
        type: Sequelize.INTEGER
      },
      isDeleted: {
        type: Sequelize.INTEGER
      },
      gaji_harian: {
        type: Sequelize.DECIMAL
      },
      tunjangan_jabatan: {
        type: Sequelize.DECIMAL
      },
      gaji_kerajinan: {
        type: Sequelize.DECIMAL
      },
      gaji_disiplin: {
        type: Sequelize.DECIMAL
      },
      rekening_bank: {
        type: Sequelize.STRING
      },
      bank: {
        type: Sequelize.INTEGER
      },
      photo_path: {
        type: Sequelize.STRING
      },
      join_date: {
        type: Sequelize.DATE
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      updatedBy: {
        type: Sequelize.INTEGER
      },
      noktp: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      id_jabatan: {
        type: Sequelize.INTEGER
      },
      name_rekening: {
        type: Sequelize.STRING
      },
      tgl_lahir: {
        type: Sequelize.DATE
      },
      tempat_lahir: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      nama_kontak_darurat: {
        type: Sequelize.STRING
      },
      perusahaan_pengalaman: {
        type: Sequelize.STRING
      },
      total_pengalaman: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('m_karyawans');
  }
};