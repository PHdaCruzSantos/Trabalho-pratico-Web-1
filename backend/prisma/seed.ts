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

  const clientUser2 = await prisma.user.create({
    data: {
      name: "Rafael Moraes",
      email: "rafael.moraes@example.com",
      password: await bcrypt.hash("password123", 10),
      role: Role.CONTRATANTE,
    },
  });

  // Create a TRABALHADOR user
  const workerUser = await prisma.user.create({
    data: {
      name: "João Profissional",
      email: "joao.profissional@example.com",
      password: await bcrypt.hash("password123", 10),
      role: Role.TRABALHADOR,
      workerProfile: {
        create: {
          bio: "Eletricista experiente com mais de 10 anos de atuação no mercado. Especializado em instalações residenciais, comerciais e manutenção preventiva de alta tensão.",
          location: "Belo Horizonte, MG",
          categories: {
            connect: [{ id: electrician.id }],
          },
          portfolio: {
            create: [
              {
                title: "Instalação Elétrica Residencial Completa",
                description:
                  "Projeto e execução de toda a parte elétrica de uma nova residência, incluindo quadro de distribuição, tomadas e pilar de iluminação.",
                imageUrl:
                  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
              },
              {
                title: "Manutenção de Quadro de Força",
                description:
                  "Revisão e manutenção preventiva em quadro de força de um grande condomínio, substituindo barramentos e disjuntores com oxidação.",
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
          bio: "Encanadora profissional com especialização em reparos de vazamentos ocultos, tubulações de gás e instalações hidráulicas em geral.",
          location: "São Paulo, SP",
          categories: {
            connect: [{ id: plumber.id }],
          },
          portfolio: {
            create: [
              {
                title: "Caixa D'água e Conexões",
                description: "Instalação completa do sistema de distribuição de água residencial.",
                imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2070&auto=format&fit=crop"
              }
            ]
          }
        },
      },
    },
    include: {
      workerProfile: true,
    },
  });
  console.log(`Created worker user: ${workerUser2.name}`);

  // Create Pedreiro user
  const workerUser3 = await prisma.user.create({
    data: {
      name: "Carlos Pedreiro",
      email: "carlos.pedreiro@example.com",
      password: await bcrypt.hash("password123", 10),
      role: Role.TRABALHADOR,
      workerProfile: {
        create: {
          bio: "Empreiteiro autônomo e pedreiro há mais de 20 anos. Qualidade garantida em alvenaria estrutural, porcelanatos, reboco e gesso.",
          location: "Rio de Janeiro, RJ",
          categories: {
            connect: [{ name: "Pedreiro" }],
          },
        },
      },
    },
    include: {
      workerProfile: true,
    },
  });
  console.log(`Created worker user: ${workerUser3.name}`);

  // Create Pintor user
  const workerUser4 = await prisma.user.create({
    data: {
      name: "Pedro Pintor",
      email: "pedro.pintor@example.com",
      password: await bcrypt.hash("password123", 10),
      role: Role.TRABALHADOR,
      workerProfile: {
        create: {
          bio: "Pintor residencial e comercial focado em acabamentos de alto padrão. Tinta lousa, marmorato, efeitos decorativos e restauração de fachadas.",
          location: "Belo Horizonte, MG",
          categories: {
            connect: [{ name: "Pintor" }],
          },
        },
      },
    },
    include: {
      workerProfile: true,
    },
  });
  console.log(`Created worker user: ${workerUser4.name}`);

  // Create Jardineiro user
  const workerUser5 = await prisma.user.create({
    data: {
      name: "Lucas Jardineiro",
      email: "lucas.jardineiro@example.com",
      password: await bcrypt.hash("password123", 10),
      role: Role.TRABALHADOR,
      workerProfile: {
        create: {
          bio: "Especialista em paisagismo e revitalização de áreas verdes. Poda, adubagem, projetos 3D para jardins verticais e orquidários.",
          location: "Curitiba, PR",
          categories: {
            connect: [{ name: "Jardineiro" }],
          },
        },
      },
    },
    include: {
      workerProfile: true,
    },
  });
  console.log(`Created worker user: ${workerUser5.name}`);

  // Create reviews
  if (workerUser.workerProfile) {
    await prisma.review.create({
      data: {
        rating: 5,
        comment:
          "Excelente profissional! Resolveu meu problema elétrico rapidamente, organizou os fios e me explicou tudo com muita simpatia e competência. Recomendo de olhos fechados!",
        authorId: clientUser.id,
        workerId: workerUser.workerProfile.id,
      },
    });
    await prisma.review.create({
      data: {
        rating: 4,
        comment: "Fez um bom trabalho no meu apartamento, mas atrasou um pouco no segundo dia da instalação.",
        authorId: clientUser2.id,
        workerId: workerUser.workerProfile.id,
      },
    });
    console.log(`Created reviews for ${workerUser.name}`);
  }

  if (workerUser2.workerProfile) {
    await prisma.review.create({
      data: {
        rating: 5,
        comment: "A Ana achou o vazamento que 3 encanadores não acharam antes. Foi incrível! Salvou o piso da minha sala.",
        authorId: clientUser.id,
        workerId: workerUser2.workerProfile.id,
      }
    });
  }

  if (workerUser3.workerProfile) {
    await prisma.review.create({
      data: {
        rating: 5,
        comment: "O Carlos fez o muro de arrimo com maestria, pontual e sujou pouquíssimo a obra.",
        authorId: clientUser2.id,
        workerId: workerUser3.workerProfile.id,
      }
    });
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
