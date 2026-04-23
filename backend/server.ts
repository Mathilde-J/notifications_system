import express from "express";

const PORT = process.env["PORT"] || 3000;
const NODEENV = process.env["NODE_ENV"] || "development";
const app = express();

console.log(`Running in ${NODEENV} mode`);

app.use(express.json());

app.get("/", (_request, response) => {
  response.send("Hello World!");
});

app.listen(PORT, (): void => {
  console.log(`Typescript API server http://localhost:${PORT}/`);
});

export { app };
