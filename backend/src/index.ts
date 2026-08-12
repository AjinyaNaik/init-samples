import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/databse";
import authRoutes from "./routes/auth.routes";


dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the TypeScript Express backend!");
});

async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("Database connected successfully.");

    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to database:", error);
    process.exit(1);
  }
}

startServer();