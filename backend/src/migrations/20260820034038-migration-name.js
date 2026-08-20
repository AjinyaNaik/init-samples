"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("samples", "pack_rank", {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("samples", "pack_rank");
  },
};