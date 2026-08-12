import dotenv from "dotenv";
import sequelize from "../config/databse";
import { createAdmin } from "../service/admin.service";

dotenv.config();

async function main() {
  try {
    await sequelize.authenticate();

    console.log("Database connected.");

    const username = process.env.ADMIN_USERNAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !email || !password) {
      throw new Error(
        "ADMIN_USERNAME, ADMIN_EMAIL and ADMIN_PASSWORD must be provided."
      );
    }

    await createAdmin({
      username,
      email,
      password,
    });

    console.log("Admin created successfully.");
  } catch (error) {
    console.error("Failed to create admin:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

main();