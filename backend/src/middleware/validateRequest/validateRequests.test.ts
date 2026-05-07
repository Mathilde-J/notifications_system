import { describe, expect, test, beforeEach, vi } from "vitest";
import { validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";
import {
  validateMessageCreation,
  validateRequestMiddleware,
} from "./validateRequest.js";
import { messageFixtureBase, mockReq, mockRes } from "../../helpers/fixtures.js";
import { errorMessageFixtureBase } from "../../helpers/fixtures.js";

const runValidators = async (req: Request) => {
  for (const validator of validateMessageCreation) {
    await validator.run(req);
  }
  return validationResult(req);
};

describe("validateMessageCreation", () => {
  let fakeReq: Request;

  beforeEach(() => {
    fakeReq = mockReq();
  });

  test("Valid message — no errors", async () => {
    fakeReq.body = { message: messageFixtureBase.emailInput };
    const result = await runValidators(fakeReq);
    expect(result.isEmpty()).toBe(true);
  });

  test("Empty body — missing message error", async () => {
    fakeReq.body = {};
    const result = await runValidators(fakeReq);
    const errors = result.array();
    expect(result.isEmpty()).toBe(false);
    expect(errors[0]?.msg).toBe(errorMessageFixtureBase.missingMessage);
  });

  test("Missing content — missing content error", async () => {
    const { content, ...withoutContent } = messageFixtureBase.emailInput;
    fakeReq.body = { message: withoutContent };
    const result = await runValidators(fakeReq);
    const errors = result.array();
    expect(result.isEmpty()).toBe(false);
    expect(errors[0]?.msg).toBe(errorMessageFixtureBase.missingContent);
  });

  test("Missing messageType — missing messageType error", async () => {
    const { messageType, ...withoutType } = messageFixtureBase.emailInput;
    fakeReq.body = { message: withoutType };
    const result = await runValidators(fakeReq);
    const errors = result.array();
    expect(result.isEmpty()).toBe(false);
    expect(errors[0]?.msg).toBe(errorMessageFixtureBase.missingMessageType);
  });

  test("Invalid messageType — invalid messageType error", async () => {
    fakeReq.body = {
      message: { ...messageFixtureBase.emailInput, messageType: "carrier_pigeon" },
    };
    const result = await runValidators(fakeReq);
    const errors = result.array();
    expect(result.isEmpty()).toBe(false);
    expect(errors[0]?.msg).toBe(errorMessageFixtureBase.invalidMessageType);
  });

  test("Missing sender — missing sender error", async () => {
    const { sender, ...withoutSender } = messageFixtureBase.emailInput;
    fakeReq.body = { message: withoutSender };
    const result = await runValidators(fakeReq);
    const errors = result.array();
    expect(result.isEmpty()).toBe(false);
    expect(errors[0]?.msg).toBe(errorMessageFixtureBase.missingSender);
  });

  test("Missing receiver — missing receiver error", async () => {
    const { receiver, ...withoutReceiver } = messageFixtureBase.emailInput;
    fakeReq.body = { message: withoutReceiver };
    const result = await runValidators(fakeReq);
    const errors = result.array();
    expect(result.isEmpty()).toBe(false);
    expect(errors[0]?.msg).toBe(errorMessageFixtureBase.missingReceiver);
  });

  test("Title present but empty — empty title error", async () => {
    fakeReq.body = { message: { ...messageFixtureBase.emailInput, title: "" } };
    const result = await runValidators(fakeReq);
    const errors = result.array();
    expect(result.isEmpty()).toBe(false);
    expect(errors[0]?.msg).toBe(errorMessageFixtureBase.emptyTitle);
  });

  test("Title absent — no error (optional)", async () => {
    const { title, ...withoutTitle } = messageFixtureBase.emailInput;
    fakeReq.body = { message: withoutTitle };
    const result = await runValidators(fakeReq);
    expect(result.isEmpty()).toBe(true);
  });
});

describe("validateRequestMiddleware", () => {
  let fakeReq: Request;
  let fakeRes: Response;
  let nextMock: NextFunction;

  beforeEach(() => {
    fakeReq = mockReq();
    fakeRes = mockRes();
    nextMock = vi.fn();
  });

  test("No validation errors — next() is called", async () => {
    fakeReq.body = { message: messageFixtureBase.emailInput };
    for (const validator of validateMessageCreation) {
      await validator.run(fakeReq);
    }
    validateRequestMiddleware(fakeReq, fakeRes, nextMock);
    expect(nextMock).toHaveBeenCalledOnce();
  });

  test("Validation errors — returns 400", async () => {
    fakeReq.body = {};
    for (const validator of validateMessageCreation) {
      await validator.run(fakeReq);
    }
    validateRequestMiddleware(fakeReq, fakeRes, nextMock);

    expect(fakeRes.status).toHaveBeenCalledWith(400);
    expect(fakeRes.json).toHaveBeenCalledExactlyOnceWith({
      error: "Validation failed",
      details: expect.any(Array),
    });
    expect(nextMock).not.toHaveBeenCalled();
  });
});
