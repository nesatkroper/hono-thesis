export const handleAsync = (fn: Function) => async (c: any) => {
  try {
    return await fn(c);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};
