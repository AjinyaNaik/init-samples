'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("sample_packs", "price", {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0.00,
    });

    await queryInterface.addColumn("samples", "price", {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0.00,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("samples", "price");
    await queryInterface.removeColumn("sample_packs", "price");
  }
};