"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      "order_items",
      "sample_id",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    );

    await queryInterface.addColumn(
      "order_items",
      "sample_pack_id",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "sample_packs",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      "order_items",
      "sample_pack_id"
    );

    await queryInterface.changeColumn(
      "order_items",
      "sample_id",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    );
  },
};