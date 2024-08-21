import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";

config();
const app = express();

mongoose
  .connect(process.env.mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`App connected to database`);
    app.listen(process.env.PORT || 5500, () => {
      console.log(`App is running on port ${process.env.PORT || 5500}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });