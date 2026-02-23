import express, { Request, Response } from "express";
import { PrismaClient, Role } from "./generated/prisma/client";
import { authMiddleware } from "./auth";

const prisma = new PrismaClient();
const router = express.Router();

interface AuthRequest extends Request {
    user?: { userId: string; role: Role };
}

// POST /requests - Create a new service request (Client only)
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
    if (req.user?.role !== Role.CONTRATANTE) {
        return res.status(403).json({ message: "Apenas contratantes podem solicitar serviços." });
    }

    const { title, description, workerId } = req.body;

    if (!title || !description || !workerId) {
        return res.status(400).json({ message: "Título, descrição e workerId são obrigatórios." });
    }

    try {
        const serviceRequest = await prisma.serviceRequest.create({
            data: {
                title,
                description,
                clientId: req.user.userId,
                workerId,
            },
        });

        res.status(201).json(serviceRequest);
    } catch (error) {
        console.error("Error creating service request:", error);
        res.status(500).json({ message: "Erro ao criar a solicitação de serviço." });
    }
});

// GET /requests/client - List requests made by the current client
router.get("/client", authMiddleware, async (req: AuthRequest, res: Response) => {
    if (req.user?.role !== Role.CONTRATANTE) {
        return res.status(403).json({ message: "Acesso negado." });
    }

    try {
        const requests = await prisma.serviceRequest.findMany({
            where: { clientId: req.user.userId },
            include: {
                worker: {
                    include: {
                        user: {
                            select: { name: true, email: true },
                        },
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        res.json(requests);
    } catch (error) {
        console.error("Error fetching client requests:", error);
        res.status(500).json({ message: "Erro ao buscar solicitações." });
    }
});

// GET /requests/worker - List requests received by the current worker
router.get("/worker", authMiddleware, async (req: AuthRequest, res: Response) => {
    if (req.user?.role !== Role.TRABALHADOR) {
        return res.status(403).json({ message: "Acesso negado." });
    }

    try {
        const workerProfile = await prisma.workerProfile.findUnique({
            where: { userId: req.user.userId },
        });

        if (!workerProfile) {
            return res.status(404).json({ message: "Perfil de trabalhador não encontrado." });
        }

        const requests = await prisma.serviceRequest.findMany({
            where: { workerId: workerProfile.id },
            include: {
                client: {
                    select: { name: true, email: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        res.json(requests);
    } catch (error) {
        console.error("Error fetching worker requests:", error);
        res.status(500).json({ message: "Erro ao buscar solicitações." });
    }
});

// PATCH /requests/:id/status - Update the status of a request
router.patch("/:id/status", authMiddleware, async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { status } = req.body; // PENDING, ACCEPTED, REJECTED, CANCELLED

    if (!id) {
        return res.status(400).json({ message: "ID da solicitação inválido." });
    }

    const validStatuses = ["PENDING", "ACCEPTED", "REJECTED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Status inválido." });
    }

    try {
        const serviceRequest = await prisma.serviceRequest.findUnique({
            where: { id: id as string },
        });

        if (!serviceRequest) {
            return res.status(404).json({ message: "Solicitação não encontrada." });
        }

        // Role-based authorization check
        if (req.user?.role === Role.CONTRATANTE) {
            // Clients can only cancel their own unaccepted requests
            if (serviceRequest.clientId !== req.user.userId) {
                return res.status(403).json({ message: "Sem permissão para alterar esta solicitação." });
            }
            if (status !== "CANCELLED") {
                return res.status(400).json({ message: "Clientes só podem cancelar (CANCELLED) a solicitação." });
            }
        } else if (req.user?.role === Role.TRABALHADOR) {
            // Workers can only accept or reject requests sent to them
            const workerProfile = await prisma.workerProfile.findUnique({
                where: { userId: req.user.userId },
            });
            if (serviceRequest.workerId !== workerProfile?.id) {
                return res.status(403).json({ message: "Sem permissão para alterar esta solicitação." });
            }
            if (status !== "ACCEPTED" && status !== "REJECTED") {
                return res.status(400).json({ message: "Trabalhadores só podem aceitar (ACCEPTED) ou recusar (REJECTED) solicitações." });
            }
        }

        const updatedRequest = await prisma.serviceRequest.update({
            where: { id: id as string },
            data: { status },
        });

        res.json(updatedRequest);
    } catch (error) {
        console.error("Error updating request status:", error);
        res.status(500).json({ message: "Erro ao atualizar status." });
    }
});

export default router;
