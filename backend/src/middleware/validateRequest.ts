import type { NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { MessageType } from "../types/message.js";
import type { Request, Response } from "express";
import { errorMessageFixtureBase } from "../helpers/fixtures.js";

export const validateMessageCreation = [
  body("message")
    .isObject()
    .withMessage(errorMessageFixtureBase.missingMessage),
  body("message.content").notEmpty().isString().trim(),
  body("message.messageType")
    .notEmpty()
    .isString().isIn(Object.values(MessageType)),
  body("message.sender").notEmpty().isString().trim(),
  body("message.receiver").notEmpty().isString().trim(),
  body("message.title").optional().notEmpty().isString().trim(),
];

export const validateRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: errors.array() });
  }

  return next();
};
