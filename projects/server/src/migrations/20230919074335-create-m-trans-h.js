'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_trans_hs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cabang_id_out: {
        type: Sequelize.INTEGER
      },
      cabang_id_in: {
        type: Sequelize.INTEGER
      },
      desc: {
        type: Sequelize.STRING
      },
      desc_received: {
        type: Sequelize.STRING
      },
      m_status_id: {
        type: Sequelize.INTEGER
      },
      no_transfer: {
        type: Sequelize.STRING
      },
      cretedBy: {
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
    await queryInterface.dropTable('m_trans_hs');
  }
};