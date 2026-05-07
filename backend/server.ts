import "dotenv/config";
import express from "express";
import cors from "cors";
import { MessageController } from "./src/controllers/messagecontroller/messageController.js";
import { createMessageRouter } from "./src/routes/messageRouter/messageRouter.js";
import { messageController } from "./src/controllers/index.js";
import { createMainRouter } from "./src/routes/index.js";
import { checkEnvVariables } from "./src/helpers/functions.js";
import { limiter } from "./src/middleware/rateLimit/rateLimit.js";

export const createApp = (messageController: MessageController) => {
  const router = createMainRouter(createMessageRouter(messageController));
  const app = express();
  app.use(limiter, express.json(), cors());
  app.use("/api", router);
  return app;
};

checkEnvVariables();

const PORT = process.env["PORT"] || 3000;
const NODEENV = process.env["NODE_ENV"] || "development";
console.log(`Running in ${NODEENV} mode`);

const app = createApp(messageController);

app.listen(PORT, (): void => {
  console.log(`Typescript API server http://localhost:${PORT}/`);
});
