'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_karyawan: {
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
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
      id_role: {
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
    await queryInterface.dropTable('m_users');
  }
};