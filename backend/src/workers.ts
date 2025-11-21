import express, { Request, Response } from "express";
import { PrismaClient } from "./generated/prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const { category, name, location } = req.query;

  const where: any = {};

  if (category) {
    where.categories = {
      some: {
        name: {
          contains: category as string,
        },
      },
    };
  }

  if (name) {
    where.user = {
      name: {
        contains: name as string,
      },
    };
  }

  if (location) {
    where.location = {
      contains: location as string,
    };
  }

  try {
    const workers = await prisma.workerProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        portfolio: true,
        reviews: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        categories: true,
      },
    });
    res.json(workers);
  } catch (error) {
    console.error("Error fetching workers:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const worker = await prisma.workerProfile.findUnique({
      where: { id: String(id) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        portfolio: true,
        reviews: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        categories: true,
      },
    });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json(worker);
  } catch (error) {
    console.error("Error fetching worker:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
