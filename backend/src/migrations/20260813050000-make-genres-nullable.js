"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("samples", "genres", {
      type: Sequelize.JSON,
      allowNull: true,      // Changed from false to true
      defaultValue: [],
    });
  },

  async down(queryInterface, Sequelize) {
    // If we roll back, restore the non-null constraint.
    // Note: Before running this rollback, ensure there are no rows with null in the genres column,
    // otherwise the database will throw a constraint error.
    await queryInterface.changeColumn("samples", "genres", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
    });
  },
};