"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the existing default first
    await queryInterface.sequelize.query(`
      ALTER TABLE "users"
      ALTER COLUMN "role" DROP DEFAULT;
    `);

    // Remove leftover enum from the failed migration, if it exists
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_users_role_new";
    `);

    // Create the new enum
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_users_role_new"
      AS ENUM ('USER', 'ADMIN');
    `);

    // Convert the existing values and change the column type
    await queryInterface.sequelize.query(`
      ALTER TABLE "users"
      ALTER COLUMN "role"
      TYPE "enum_users_role_new"
      USING (
        CASE
          WHEN "role"::text IN ('BUYER', 'SELLER')
            THEN 'USER'::"enum_users_role_new"

          WHEN "role"::text = 'ADMIN'
            THEN 'ADMIN'::"enum_users_role_new"
        END
      );
    `);

    // Remove the old enum
    await queryInterface.sequelize.query(`
      DROP TYPE "enum_users_role";
    `);

    // Rename the new enum to Sequelize's expected name
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_users_role_new"
      RENAME TO "enum_users_role";
    `);

    // Set the new default
    await queryInterface.sequelize.query(`
      ALTER TABLE "users"
      ALTER COLUMN "role"
      SET DEFAULT 'USER';
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "users"
      ALTER COLUMN "role" DROP DEFAULT;
    `);

    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_users_role_old"
      AS ENUM ('BUYER', 'SELLER', 'ADMIN');
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "users"
      ALTER COLUMN "role"
      TYPE "enum_users_role_old"
      USING (
        CASE
          WHEN "role"::text = 'USER'
            THEN 'BUYER'::"enum_users_role_old"

          WHEN "role"::text = 'ADMIN'
            THEN 'ADMIN'::"enum_users_role_old"
        END
      );
    `);

    await queryInterface.sequelize.query(`
      DROP TYPE "enum_users_role";
    `);

    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_users_role_old"
      RENAME TO "enum_users_role";
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "users"
      ALTER COLUMN "role"
      SET DEFAULT 'BUYER';
    `);
  },
};