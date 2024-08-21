import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";

const router = express.Router();

//Adding an expense
router.post("/add",authenticateToken, async(req, res)=>{
    return res.sendStatus(234).send("Adding");
})

//Editing an expense
router.put("/edit",authenticateToken, async(req, res)=>{
    return res.sendStatus(234).send("Editing");
})

//Deleting an expense
router.delete("/delete",authenticateToken, async(req, res)=>{

    return res.sendStatus(234).send("Deleting");
})

//For devs get all expenses
router.get("/getAll",authenticateToken, async(req, res)=>{
    return res.sendStatus(234).send("Get all expenses");
})

//Get all expenses for an id
router.get("/getAll/:id",authenticateToken, async(req, res)=>{
    const { id } = req.params;
    return res.sendStatus(234).send("Get all expenses");
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