import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import mongoose from "mongoose";
import { connectDB } from "./db/connect.js";
import dotenv from "dotenv";
dotenv.config();

//Routes
import userRoutes from "./routes/User.js";

const app = express();

//Extra packages
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  })
);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Blog Api working perfectly");
});

app.use("/user", userRoutes);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
