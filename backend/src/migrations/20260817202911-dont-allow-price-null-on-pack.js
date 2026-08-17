'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("sample_packs", "price", {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0.00,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("sample_packs", "price", {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0.00,
    });
  }
};