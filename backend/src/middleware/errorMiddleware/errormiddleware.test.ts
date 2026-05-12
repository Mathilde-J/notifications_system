import { beforeEach, describe, expect, test, vi } from "vitest";
import { mockReq, mockRes } from "../../helpers/fixtures.js";
import type { NextFunction, Request, Response } from "express";
import { mock } from "vitest-mock-extended";
import { ClientError } from "../../class/ErrorClass.js";
import { errorMiddleware } from "./errorMiddleware.js";

describe("errorMiddleware tests", () => {
  let fakeReq: Request;
  let fakeRes: Response;
  let mockNextFunction: ReturnType<typeof mock<NextFunction>>;

  beforeEach(() => {
    fakeReq = mockReq();
    fakeRes = mockRes();
    mockNextFunction = mock<NextFunction>();
  });

  test("Error Client - should return response 400 and error message", () => {
    const errorClient = new ClientError();
    const consoleSpy = vi.spyOn(console, "error");

    errorMiddleware(
      errorClient,
      fakeReq,
      fakeRes,
      mockNextFunction,
    );

    expect(fakeRes.status).toHaveBeenCalledExactlyOnceWith(400);

    expect(fakeRes.json).toHaveBeenCalledExactlyOnceWith({
      error: errorClient.message,
    });
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test("Error Server - should return response 500 and Internal server error", () => {
    const error = new Error();
    const consoleSpy = vi.spyOn(console, "error");

    errorMiddleware(
      error,
      fakeReq,
      fakeRes,
      mockNextFunction,
    );

    expect(fakeRes.status).toHaveBeenCalledExactlyOnceWith(500);
    expect(fakeRes.json).toHaveBeenCalledExactlyOnceWith({
      error: "Internal server error",
    });
    expect(consoleSpy).toHaveBeenCalledExactlyOnceWith(error);
  });
});
