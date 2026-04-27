import messageRouter from "./messageRouter/messageRouter.js";
import { Router } from "express";

const router = Router();
router.use("/messages", messageRouter);

export default router;
