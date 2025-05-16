import "dotenv/config";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { logger } from "@/middlewares/logger";
import userRoutes from "@/router/user-router";

const app = new Hono();

const PORT = Number(process.env.PORT) || 4100;

app.use("*", logger);

app.route("/users", userRoutes);

app.notFound((c) => c.json({ error: "Not Found" }, 404));

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Something went wrong" }, 500);
});

serve({
  fetch: app.fetch,
  port: PORT,
});

console.log(`🚀 Server running at http://localhost:${PORT}`);