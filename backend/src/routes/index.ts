import { Router } from "express";

export const createMainRouter = (messageRouter: Router): Router => {
  const router = Router();
  router.use("/messages", messageRouter);
  return router;
};
