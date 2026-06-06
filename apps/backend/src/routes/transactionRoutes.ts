import express from "express";
import {
  createTransactions,
  getTransactions,
  deleteTransaction,
  getSummary,
} from "../controllers/transactionController";

const router = express.Router();

router.post("/api/transactions", createTransactions);
router.get("/api/transactions/:userId", getTransactions);
router.delete("/api/transactions/:id", deleteTransaction);
router.get("/api/transactions/summary/:userId", getSummary);

export default router;
