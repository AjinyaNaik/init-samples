"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("sample_packs", "is_selling", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
    });

    await queryInterface.addColumn("samples", "is_selling", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("samples", "is_selling");
    await queryInterface.removeColumn("sample_packs", "is_selling");
  },
};