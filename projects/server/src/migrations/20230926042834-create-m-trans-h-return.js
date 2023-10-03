'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_trans_h_returns', {
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
      createdBy: {
        type: Sequelize.INTEGER
      },
      m_status_return_id: {
        type: Sequelize.INTEGER
      },
      no_return: {
        type: Sequelize.STRING
      },
      updatedBy: {
        type: Sequelize.INTEGER
      },
      recipient_name: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('m_trans_h_returns');
  }
};