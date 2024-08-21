import UserForBudget from "../models/userModelForBudget.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";


const router = express.Router();


router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await UserForBudget.findOne({ username });

    if (existingUser) {
      return res.status(409).send("Username already taken");
    }

    // Find the highest userID and increment it
    const highestUser = await UserForBudget.findOne({}, {}, { sort: { userID: -1 } });
    const newUserID = highestUser ? highestUser.userID + 1 : 1; // Start from 1 if no users exist

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserForBudget({ username, password: hashedPassword, userID: newUserID });
    await newUser.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserForBudget.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send("Invalid credentials");

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).send("Error during login");
  }
});
router.get("/authenticationTest",authenticateToken, (rew, res) => {
    return res.sendStatus(234).send("Protected");
})



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

export default router;
