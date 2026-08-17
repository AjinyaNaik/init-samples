"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("samples", "category", {
      type: Sequelize.ENUM("sample", "loop", "track or stem"),
      allowNull: false,
      defaultValue: "sample", 
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("samples", "category");
    
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_samples_category";'
    );
  },
};