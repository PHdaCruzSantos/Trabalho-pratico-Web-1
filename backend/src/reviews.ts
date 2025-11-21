import express, { Request, Response, NextFunction } from "express";
import { PrismaClient, Role } from "./generated/prisma/client";
import { authMiddleware } from "./auth";

const prisma = new PrismaClient();
const router = express.Router();

interface AuthRequest extends Request {
  user?: { userId: string; role: Role };
}

// Middleware to check for CONTRATANTE role
const isContractor = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "CONTRATANTE") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

// Submit a review
router.post(
  "/",
  authMiddleware,
  isContractor,
  async (req: AuthRequest, res: Response) => {
    const { rating, comment, workerId } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const authorId = req.user.userId;

    // TODO: Add logic to confirm that the service was provided

    try {
      const review = await prisma.review.create({
        data: {
          rating,
          comment,
          authorId,
          workerId,
        },
      });
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
