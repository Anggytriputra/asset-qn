'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rel_cabangkaryawans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_cabang: {
        type: Sequelize.INTEGER
      },
      id_karyawan: {
        type: Sequelize.INTEGER
      },
      notes: {
        type: Sequelize.TEXT
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
      createdBy: {
        type: Sequelize.INTEGER
      },
      updatedBy: {
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
    await queryInterface.dropTable('rel_cabangkaryawans');
  }
};