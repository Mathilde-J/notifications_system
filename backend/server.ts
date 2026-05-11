import "dotenv/config";
import express from "express";
import cors from "cors";
import { MessageController } from "./src/controllers/messagecontroller/messageController.js";
import { createMessageRouter } from "./src/routes/messageRouter/messageRouter.js";
import { messageController } from "./src/controllers/index.js";
import { createMainRouter } from "./src/routes/index.js";
import { checkEnvVariables } from "./src/helpers/functions.js";
import { rateLimiter } from "./src/middleware/rateLimit/rateLimit.js";
import type { RateLimitRequestHandler } from "express-rate-limit";
import helmet from "helmet";
import { errorMiddleware } from "./src/middleware/errorMiddleware/errorMiddleWare.js";

export const createApp = (
  messageController: MessageController,
  limiter: RateLimitRequestHandler,
) => {
  const router = createMainRouter(createMessageRouter(messageController));
  const app = express();
  app.use(
    limiter,
    helmet(),
    express.json(),
    cors({
      origin: process.env["ALLOWED_ORIGIN"],
    }),
  );
  app.use("/api", router);
  app.use(errorMiddleware)
  return app;
};

checkEnvVariables();

const PORT = process.env["PORT"] || 3000;
const NODEENV = process.env["NODE_ENV"] || "development";
console.log(`Running in ${NODEENV} mode`);

const app = createApp(messageController, rateLimiter);

app.listen(PORT, (): void => {
  console.log(`Typescript API server http://localhost:${PORT}/`);
});
