import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"
import expressRoutes from "./routes/expenseRoutes.js"
config();
const app = express();
app.use(express.json());

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

app.get("/", (req, res) => {
  return res.sendStatus(234).send("Initial link");
});



app.use("/api/users", userRoutes);
app.use("/api/expense", expressRoutes);