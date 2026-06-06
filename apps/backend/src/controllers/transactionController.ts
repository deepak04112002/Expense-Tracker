import type { Request, Response } from "express";
import { prismaClient, Prisma } from "db/client";

export const createTransactions = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const transactions = Array.isArray(body) ? body : [body];

    for (const t of transactions) {
      if (!t.title || !t.category || !t.userId || t.amount === undefined) {
        return res.status(400).json({ message: "All fields are required" });
      }
    }

    const data = await prismaClient.transactions.createMany({
      data: transactions,
    });
    console.log("Transactions Created Successfully", data);
    res.status(201).json({ count: data.count });
  } catch (error) {
    console.log("Error Creating the transactions", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;
    const data = await prismaClient.transactions.findMany({
      where: { userId },
      orderBy: { created_at: "desc" },
    });

    res.status(200).json(data);
  } catch (error) {
    console.log("Error Getting the transactions", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const transactionId = parseInt(id);

    if (isNaN(transactionId)) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    await prismaClient.transactions.delete({
      where: { id: transactionId },
    });

    console.log("Transaction Deleted Successfully");
    res.status(200).json({ message: "Transaction Deleted Successfully" });
  } catch (error) {
    console.log("Error Deleting the transactions", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSummary = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;

    const balanceResult = await prismaClient.transactions.aggregate({
      where: { userId },
      _sum: { amount: true },
    });

    const incomeResult = await prismaClient.transactions.aggregate({
      where: { userId, amount: { gt: 0 } },
      _sum: { amount: true },
    });

    const expensesResult = await prismaClient.transactions.aggregate({
      where: { userId, amount: { lt: 0 } },
      _sum: { amount: true },
    });

    const expenses = expensesResult._sum?.amount
      ? new Prisma.Decimal(expensesResult._sum.amount).abs()
      : new Prisma.Decimal(0);

    res.status(200).json({
      balance: balanceResult._sum?.amount || new Prisma.Decimal(0),
      income: incomeResult._sum?.amount || new Prisma.Decimal(0),
      expenses,
    });
  } catch (error) {
    console.log("Error Getting the transactions summary", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
