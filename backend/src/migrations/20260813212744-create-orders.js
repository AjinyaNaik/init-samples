"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      total_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      currency: {
        type: Sequelize.STRING(3),
        allowNull: false,
        defaultValue: "usd",
      },

      status: {
        type: Sequelize.ENUM(
          "PENDING",
          "PAID",
          "FAILED",
          "CANCELLED",
          "REFUNDED"
        ),
        allowNull: false,
        defaultValue: "PENDING",
      },

      stripe_checkout_session_id: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("orders");

    // PostgreSQL ENUM cleanup
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_orders_status";'
    );
  },
};