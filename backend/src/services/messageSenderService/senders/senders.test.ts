import { beforeAll, describe, expect, test, vi } from "vitest";
import { EmailSender } from "./emailSender.js";
import { messageFixtureBase } from "../../../helpers/fixtures.js";

describe("sender group", () => {
  const emailInput = messageFixtureBase.emailInput;
  let sender: EmailSender;

  beforeAll(() => {
    sender = new EmailSender();
  });

  test("test method send in sender uses sendMessage", async () => {
    const spy = vi.spyOn(sender! as any, "sendMessage");
    await sender!.send(emailInput);
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledExactlyOnceWith(emailInput);
  });

  test("test method send throw an error when an error is thrown by sendMessage", async () => {
    vi.spyOn(sender! as any, "sendMessage").mockRejectedValue(
      new Error("fail"),
    );
    await expect(async () => await sender!.send(emailInput)).rejects.toThrow(
      Error("An error Occured, error: Error: fail"),
    );
  });
});
