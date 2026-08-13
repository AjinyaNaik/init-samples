"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("samples", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      audio_url: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      sample_pack_id: {
        type: Sequelize.INTEGER,
        allowNull: true, 
        references: {
          model: "sample_packs",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL", 
      },
      sample_type: {
        type: Sequelize.ENUM("DRUMS", "BASS", "MIDS", "HIGHS", "VOCALS"), 
        allowNull: false,
      },
      genres: {
        type: Sequelize.JSON, 
        allowNull: false,
        defaultValue: [], 
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {},
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
    await queryInterface.dropTable("samples");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_samples_sample_type";'
    );
  },
};