"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Add category JSON array column
    await queryInterface.addColumn("sample_packs", "category", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
    });

    // 2. Add sample_type JSON array column
    await queryInterface.addColumn("sample_packs", "sample_type", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
    });

    // 3. Add genres JSON array column
    await queryInterface.addColumn("sample_packs", "genres", {
      type: Sequelize.JSON,
      allowNull: true, // Nullable to match the samples schema decision
      defaultValue: [],
    });
  },

  async down(queryInterface) {
    // Drop all three lookup columns if rolling back
    await queryInterface.removeColumn("sample_packs", "genres");
    await queryInterface.removeColumn("sample_packs", "sample_type");
    await queryInterface.removeColumn("sample_packs", "category");
  },
};