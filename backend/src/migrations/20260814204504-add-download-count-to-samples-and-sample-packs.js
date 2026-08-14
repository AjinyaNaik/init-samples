"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("samples", "download_count", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addColumn("sample_packs", "download_count", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "samples",
      "download_count"
    );

    await queryInterface.removeColumn(
      "sample_packs",
      "download_count"
    );
  },
};