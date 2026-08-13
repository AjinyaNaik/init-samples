"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
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

    await queryInterface.createTable("sample_types", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
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

    await queryInterface.createTable("genres", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
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

    await queryInterface.bulkInsert("categories", [
      { name: "Samples", created_at: new Date(), updated_at: new Date() },
      { name: "Loops", created_at: new Date(), updated_at: new Date() },
      { name: "Tracks (or Stems)", created_at: new Date(), updated_at: new Date() },
    ]);

    await queryInterface.bulkInsert("sample_types", [
      { name: "Drums", created_at: new Date(), updated_at: new Date() },
      { name: "Bass", created_at: new Date(), updated_at: new Date() },
      { name: "Mids", created_at: new Date(), updated_at: new Date() },
      { name: "Highs", created_at: new Date(), updated_at: new Date() },
      { name: "Vocals", created_at: new Date(), updated_at: new Date() },
    ]);

    await queryInterface.bulkInsert("genres", [
      { name: "Soul", created_at: new Date(), updated_at: new Date() },
      { name: "Hip Hop", created_at: new Date(), updated_at: new Date() },
      { name: "R&B", created_at: new Date(), updated_at: new Date() },
      { name: "Trap", created_at: new Date(), updated_at: new Date() },
      { name: "Lofi", created_at: new Date(), updated_at: new Date() },
      { name: "Rock", created_at: new Date(), updated_at: new Date() },
      { name: "Folk", created_at: new Date(), updated_at: new Date() },
      { name: "Exotic", created_at: new Date(), updated_at: new Date() },
      { name: "Random", created_at: new Date(), updated_at: new Date() },
      { name: "Pop", created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("genres");
    await queryInterface.dropTable("sample_types");
    await queryInterface.dropTable("categories");
  },
};