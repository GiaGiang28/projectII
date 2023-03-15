import express from "express";
import { order, getBill, editBill } from "../controllers/bill.js";

const router = express.Router();

router.post("/order", order);
router.get("/getBill/:id", getBill);
router.put("/editBill/:id", editBill);

export default router;
