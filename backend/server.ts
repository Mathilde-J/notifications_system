import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./src/routes/index.js";

const PORT = process.env["PORT"] || 3000;
const NODEENV = process.env["NODE_ENV"] || "development";
const app = express();

console.log(`Running in ${NODEENV} mode`);

app.use(express.json(), cors());

app.use("/api", router);

app.listen(PORT, (): void => {
  console.log(`Typescript API server http://localhost:${PORT}/`);
});

export { app };
