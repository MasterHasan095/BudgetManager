import mongoose from "mongoose";

const expenseSchemaModelForBudget = new mongoose.Schema({
    userID: {type: Number, required: true, unique: true},
    expenseID: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    category: {type: String, required: true},
    amount: {type: Number, required: true},
    Comment: {type: Array, required: false}
});

const ExpenseModelForBudget = mongoose.model("expenseModelForBudget", expenseSchemaModelForBudget);

export default ExpenseModelForBudget;