import express from "express";
import { getfood, addFood, deleteFood, editFood } from "../controllers/food.js";

const router = express.Router();

router.get("/", getfood);
router.post("/addFood", addFood);
router.put("/editFood/:id", editFood);
router.delete("/deleteFood/:id", deleteFood);

export default router;
