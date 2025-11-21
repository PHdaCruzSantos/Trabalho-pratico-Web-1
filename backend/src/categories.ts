import express, { Request, Response } from "express";
import { PrismaClient } from "./generated/prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Get all categories
router.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await prisma.serviceCategory.findMany({
      orderBy: {
        name: "asc",
      },
    });
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
