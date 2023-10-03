'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_trans_d_returns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      m_asset_id: {
        type: Sequelize.INTEGER
      },
      m_asset_name: {
        type: Sequelize.STRING
      },
      qty: {
        type: Sequelize.INTEGER
      },
      m_category_id: {
        type: Sequelize.INTEGER
      },
      m_trans_h_id: {
        type: Sequelize.INTEGER
      },
      serial_number: {
        type: Sequelize.STRING
      },
      no_polisi: {
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
    await queryInterface.dropTable('m_trans_d_returns');
  }
};