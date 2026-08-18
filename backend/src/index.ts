import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database";
import "./models/association";
import authRoutes from "./routes/auth.routes";
import sellerRequestRoutes from "./routes/seller_request.routes";
import sampleRoutes from "./routes/sample.routes";
import samplePackRoutes from "./routes/sample-pack.routes";
import filterRoutes from "./routes/filter.routes";
import path from "path";
import orderRoutes from "./routes/order.routes";
import stripeRoutes from "./routes/stripe.routes";
import { handleStripeWebhook } from "./controller/stripe.controller";

dotenv.config();

const app = express();

app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

app.use("/uploads", cors(), express.static(path.join(__dirname, "../uploads")));

const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/seller-requests", sellerRequestRoutes);
app.use("/admin/samples", sampleRoutes);
app.use("/admin/sample-packs", samplePackRoutes);
app.use("/filters", filterRoutes); 
app.use("/orders", orderRoutes);
app.use("/stripe", stripeRoutes);

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