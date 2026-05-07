import type { NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { MessageType } from "../../types/message.js";
import type { Request, Response } from "express";
import { errorMessageFixtureBase } from "../../helpers/fixtures.js";

export const validateMessageCreation = [
  body("message")
    .isObject()
    .withMessage(errorMessageFixtureBase.missingMessage),
  body("message.content")
    .notEmpty().withMessage(errorMessageFixtureBase.missingContent)
    .isString().withMessage(errorMessageFixtureBase.missingContent)
    .trim(),
  body("message.messageType")
    .notEmpty().withMessage(errorMessageFixtureBase.missingMessageType)
    .isString().withMessage(errorMessageFixtureBase.missingMessageType)
    .isIn([MessageType.EMAIL]).withMessage(errorMessageFixtureBase.invalidMessageType),
  body("message.sender")
    .notEmpty().withMessage(errorMessageFixtureBase.missingSender)
    .isString().withMessage(errorMessageFixtureBase.missingSender)
    .trim(),
  body("message.receiver")
    .notEmpty().withMessage(errorMessageFixtureBase.missingReceiver)
    .isString().withMessage(errorMessageFixtureBase.missingReceiver)
    .trim(),
  body("message.title")
    .optional()
    .notEmpty().withMessage(errorMessageFixtureBase.emptyTitle)
    .isString().withMessage(errorMessageFixtureBase.emptyTitle)
    .trim(),
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
