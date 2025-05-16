"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = global.prisma ||
    (() => {
        if (process.env.NODE_ENV === "production") {
            return new client_1.PrismaClient({
                log: ["warn", "error"],
                datasources: {
                    db: {
                        url: process.env.DATABASE_URL,
                    },
                },
            });
        }
        else {
            return new client_1.PrismaClient({
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
    }
    catch (error) {
        console.error("Prisma Error:", error);
        throw error;
    }
});
process.on("beforeExit", async () => {
    await prisma.$disconnect();
});
exports.default = prisma;
