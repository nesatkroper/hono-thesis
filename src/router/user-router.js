"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("@/lib/prisma");
const hono_1 = require("hono");
const error_handler_1 = require("@/utils/error-handler");
const router = new hono_1.Hono();
router.get("/", (0, error_handler_1.handleAsync)(async (c) => {
    const users = await prisma_1.default.user.findMany();
    return c.json({ users }, 200);
}));
exports.default = router;
