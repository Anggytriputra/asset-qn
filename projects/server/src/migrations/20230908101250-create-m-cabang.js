'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_cabangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cabang_no: {
        type: Sequelize.INTEGER
      },
      cabang_name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
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
      lat: {
        type: Sequelize.STRING
      },
      lng: {
        type: Sequelize.STRING
      },
      initial: {
        type: Sequelize.STRING
      },
      max_jarak_absen: {
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
    await queryInterface.dropTable('m_cabangs');
  }
};