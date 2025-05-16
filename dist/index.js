"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const hono_1 = require("hono");
const node_server_1 = require("@hono/node-server");
const logger_1 = require("./middlewares/logger");
const user_router_1 = require("./router/user-router");
const app = new hono_1.Hono();
const PORT = process.env.PORT || 4100;
app.use("*", logger_1.logger);
app.route("/users", user_router_1.default);
app.notFound((c) => c.json({ error: "Not Found" }, 404));
app.onError((err, c) => {
    console.error(err);
    return c.json({ error: "Something went wrong" }, 500);
});
(0, node_server_1.serve)(app, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
