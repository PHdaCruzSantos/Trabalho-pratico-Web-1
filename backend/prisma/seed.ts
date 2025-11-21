import { PrismaClient, Role } from "../src/generated/prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  // Clean up existing data
  await prisma.review.deleteMany();
  await prisma.portfolioItem.deleteMany();
  await prisma.workerProfile.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.user.deleteMany();
  console.log("Cleaned up database.");

  // Create Service Categories
  const electrician = await prisma.serviceCategory.create({
    data: { name: "Eletricista" },
  });
  const plumber = await prisma.serviceCategory.create({
    data: { name: "Encanador" },
  });
  await prisma.serviceCategory.create({ data: { name: "Pedreiro" } });
  await prisma.serviceCategory.create({ data: { name: "Pintor" } });
  await prisma.serviceCategory.create({ data: { name: "Jardineiro" } });
  console.log("Created service categories.");

  // Create a CONTRATANTE user
  const clientUser = await prisma.user.create({
    data: {
      name: "Maria Cliente",
      email: "maria.cliente@example.com",
      password: await bcrypt.hash("password123", 10),
      role: Role.CONTRATANTE,
    },
  });
  console.log(`Created client user: ${clientUser.name}`);

  // Create a TRABALHADOR user
  const workerUser = await prisma.user.create({
    data: {
      name: "João Profissional",
      email: "joao.profissional@example.com",
      password: await bcrypt.hash("password123", 10),
      role: Role.TRABALHADOR,
      workerProfile: {
        create: {
          bio: "Eletricista experiente com mais de 10 anos de atuação no mercado. Especializado em instalações residenciais e comerciais.",
          location: "Belo Horizonte, MG",
          categories: {
            connect: [{ id: electrician.id }],
          },
          portfolio: {
            create: [
              {
                title: "Instalação Elétrica Residencial Completa",
                description:
                  "Projeto e execução de toda a parte elétrica de uma nova residência, incluindo quadro de distribuição, tomadas e iluminação.",
                imageUrl:
                  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
              },
              {
                title: "Manutenção de Quadro de Força",
                description:
                  "Revisão e manutenção preventiva em quadro de força de um condomínio, garantindo a segurança e o bom funcionamento.",
                imageUrl:
                  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2070&auto=format&fit=crop",
              },
            ],
          },
        },
      },
    },
    include: {
      workerProfile: true,
    },
  });
  console.log(`Created worker user: ${workerUser.name}`);

  // Create another TRABALHADOR user
  const workerUser2 = await prisma.user.create({
    data: {
      name: "Ana Encanadora",
      email: "ana.encanadora@example.com",
      password: await bcrypt.hash("password123", 10),
      role: Role.TRABALHADOR,
      workerProfile: {
        create: {
          bio: "Encanadora profissional com especialização em reparos de vazamentos e instalações hidráulicas.",
          location: "São Paulo, SP",
          categories: {
            connect: [{ id: plumber.id }],
          },
        },
      },
    },
    include: {
      workerProfile: true,
    },
  });
  console.log(`Created worker user: ${workerUser2.name}`);

  // Create a review from the client to the worker
  if (workerUser.workerProfile) {
    await prisma.review.create({
      data: {
        rating: 5,
        comment:
          "Excelente profissional! Resolveu meu problema elétrico rapidamente e com muita competência. Recomendo!",
        authorId: clientUser.id,
        workerId: workerUser.workerProfile.id,
      },
    });
    console.log(
      `Created review from ${clientUser.name} for ${workerUser.name}`
    );
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
