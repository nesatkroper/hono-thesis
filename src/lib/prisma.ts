import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma: PrismaClient =
  global.prisma ||
  (() => {
    if (process.env.NODE_ENV === "production") {
      return new PrismaClient({
        log: ["warn", "error"],
        datasources: {
          db: {
            url: process.env.DATABASE_URL,
          },
        },
      });
    } else {
      return new PrismaClient({
        log: ["query", "info", "warn", "error"],
      });
    }
  })();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

prisma.$use(async (params, next) => {
  try {
    return await next(params);
  } catch (error) {
    console.error("Prisma Error:", error);
    throw error;
  }
});

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export default prisma;
