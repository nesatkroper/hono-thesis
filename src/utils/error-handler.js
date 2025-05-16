"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAsync = void 0;
const handleAsync = (fn) => async (c) => {
    try {
        return await fn(c);
    }
    catch (err) {
        console.error(err);
        return c.json({ error: "Internal Server Error" }, 500);
    }
};
exports.handleAsync = handleAsync;
