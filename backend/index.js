import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import UserForBudget from "./models/userModelForBudget";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
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

app.get("/protected",authenticateToken, (rew, res) => {
    return res.sendStatus(234).send("Protected");
})

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const existingUser = await UserForBudget.findOne({ username });
  
      if (existingUser) {
        return res.status(409).send("Username already taken");
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(`Hashed : ${hashedPassword}`)
      const newUser = new UserForBudget({ username, password: hashedPassword });
      await newUser.save();
      res.status(201).send("User registered");
    } catch (error) {
      res.status(500).send("Error registering user");
    }
  });

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserForBudget.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send("Invalid credentials");

    console.log("ispasswordvalid")
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("tokencreated")
    res.json({ token });
  } catch (error) {
    res.status(500).send("Error during login");
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
