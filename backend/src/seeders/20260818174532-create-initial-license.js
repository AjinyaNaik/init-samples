"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [existingLicense] = await queryInterface.sequelize.query(
      `SELECT id FROM licenses WHERE version = 1 LIMIT 1;`
    );

    if (existingLicense.length === 0) {
      await queryInterface.bulkInsert("licenses", [
        {
          version: 1,
          terms: "Standard Royalty-Free License",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("licenses", {
      version: 1,
    });
  },
};