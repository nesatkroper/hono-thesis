import prisma from "@/lib/prisma";
import { Hono } from "hono";
import { handleAsync } from "@/utils/error-handler";

const router = new Hono();

router.get(
  "/",
  handleAsync(async (c) => {
    const users = await prisma.user.findMany();
    return c.json({ users }, 200);
  })
);

export default router;
