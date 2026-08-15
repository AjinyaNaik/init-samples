"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Remove is_selling from samples
    await queryInterface.removeColumn("samples", "is_selling");

    // 2. Remove is_selling from sample_packs
    await queryInterface.removeColumn("sample_packs", "is_selling");

    // 3. Add can_preview to samples
    await queryInterface.addColumn("samples", "can_preview", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Default to true so standard uploads remain previewable
    });
  },

  async down(queryInterface, Sequelize) {
    // Revert changes if rolling back
    await queryInterface.removeColumn("samples", "can_preview");

    await queryInterface.addColumn("samples", "is_selling", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.addColumn("sample_packs", "is_selling", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },
};