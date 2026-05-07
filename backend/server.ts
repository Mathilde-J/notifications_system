import "dotenv/config";
import express from "express";
import cors from "cors";
import { MessageController } from "./src/controllers/messagecontroller/messageController.js";
import { createMessageRouter } from "./src/routes/messageRouter/messageRouter.js";
import { messageController } from "./src/controllers/index.js";
import { createMainRouter } from "./src/routes/index.js";

checkEnvVariables();

export const createApp = (messageController: MessageController) => {
  const router = createMainRouter(createMessageRouter(messageController));
  const app = express();
  app.use(express.json(), cors());
  app.use("/api", router);
  return app;
};

const PORT = process.env["PORT"] || 3000;
const NODEENV = process.env["NODE_ENV"] || "development";
console.log(`Running in ${NODEENV} mode`);

const app = createApp(messageController);

app.listen(PORT, (): void => {
  console.log(`Typescript API server http://localhost:${PORT}/`);
});
function checkEnvVariables() {
  throw new Error("Function not implemented.");
}

