import express, { Request, Response } from "express";
import { PrismaClient, Role } from "./generated/prisma/client";
import { authMiddleware } from "./auth";

const prisma = new PrismaClient();
const router = express.Router();

interface AuthRequest extends Request {
  user?: { userId: string; role: Role };
}

// Update worker profile
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (req.user.role !== Role.TRABALHADOR) {
    return res
      .status(403)
      .json({ message: "Only workers can update profiles" });
  }

  const { bio, location, categories } = req.body;

  try {
    // Check if profile exists
    const existingProfile = await prisma.workerProfile.findUnique({
      where: { userId: req.user.userId },
    });

    let profile;

    if (existingProfile) {
      // Update existing profile
      profile = await prisma.workerProfile.update({
        where: { userId: req.user.userId },
        data: {
          bio,
          location,
          ...(categories && {
            categories: {
              set: [],
              connect: categories.map((id: string) => ({ id })),
            },
          }),
        },
        include: {
          user: true,
          portfolio: true,
          reviews: true,
          categories: true,
        },
      });
    } else {
      // Create new profile
      profile = await prisma.workerProfile.create({
        data: {
          userId: req.user.userId,
          bio,
          location,
          ...(categories && {
            categories: {
              connect: categories.map((id: string) => ({ id })),
            },
          }),
        },
        include: {
          user: true,
          portfolio: true,
          reviews: true,
          categories: true,
        },
      });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(400).json({ message: "Error updating profile" });
  }
});

// Add portfolio item
router.post(
  "/portfolio",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (req.user.role !== Role.TRABALHADOR) {
      return res
        .status(403)
        .json({ message: "Only workers can add portfolio items" });
    }

    const { title, description, imageUrl } = req.body;

    if (!title || !imageUrl) {
      return res
        .status(400)
        .json({ message: "Title and image URL are required" });
    }

    try {
      // Get worker profile
      const profile = await prisma.workerProfile.findUnique({
        where: { userId: req.user.userId },
      });

      if (!profile) {
        return res.status(404).json({ message: "Worker profile not found" });
      }

      const portfolioItem = await prisma.portfolioItem.create({
        data: {
          title,
          description,
          imageUrl,
          profileId: profile.id,
        },
      });

      res.status(201).json(portfolioItem);
    } catch (error) {
      console.error("Error adding portfolio item:", error);
      res.status(400).json({ message: "Error adding portfolio item" });
    }
  }
);

// Remove portfolio item
router.delete(
  "/portfolio/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { id } = req.params;

    try {
      // Get worker profile
      const profile = await prisma.workerProfile.findUnique({
        where: { userId: req.user.userId },
      });

      if (!profile) {
        return res.status(404).json({ message: "Worker profile not found" });
      }

      // Check if portfolio item belongs to this worker
      const portfolioItem = await prisma.portfolioItem.findUnique({
        where: { id: String(id) },
      });

      if (!portfolioItem || portfolioItem.profileId !== profile.id) {
        return res
          .status(403)
          .json({ message: "You can only delete your own portfolio items" });
      }

      await prisma.portfolioItem.delete({
        where: { id: String(id) },
      });

      res.json({ message: "Portfolio item deleted successfully" });
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
      res.status(400).json({ message: "Error deleting portfolio item" });
    }
  }
);

export default router;
