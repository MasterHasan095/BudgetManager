import mongoose from "mongoose";

const userSchemaForBudget = new mongoose.Schema({
  userID: {type: Number, required: true, unique: true},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserForBudget = mongoose.model("UserForBudget", userSchemaForBudget);

export default UserForBudget;
