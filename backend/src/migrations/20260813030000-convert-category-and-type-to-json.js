"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Remove the old columns
    await queryInterface.removeColumn("samples", "category");
    await queryInterface.removeColumn("samples", "sample_type");

    // 2. Clean up any leftover database ENUM data types
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_samples_category";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_samples_sample_type";'
    );

    // 3. Re-add both columns as clean JSON columns
    await queryInterface.addColumn("samples", "category", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
    });

    await queryInterface.addColumn("samples", "sample_type", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop the JSON columns
    await queryInterface.removeColumn("samples", "category");
    await queryInterface.removeColumn("samples", "sample_type");

    // Restore old standard string columns (if rolling back)
    await queryInterface.addColumn("samples", "category", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "sample",
    });

    await queryInterface.addColumn("samples", "sample_type", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};