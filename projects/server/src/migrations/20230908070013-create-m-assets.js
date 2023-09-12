'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      m_category_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      m_cabang_id: {
        type: Sequelize.INTEGER
      },
      m_stock_id: {
        type: Sequelize.INTEGER
      },
      m_sub_category_id: {
        type: Sequelize.INTEGER
      },
      createdBy: {
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
    await queryInterface.dropTable('m_assets');
  }
};