import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const IS_PROD = process.env.NODE_ENV === "production";
const databaseUrl = IS_PROD ? process.env.PROD_DATABASE_URL : process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(`${IS_PROD ? "PROD_DATABASE_URL" : "DATABASE_URL"} is not defined`);
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: IS_PROD ? false : console.log,
  dialectOptions: IS_PROD 
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
      }
    : {},
});

export default sequelize;