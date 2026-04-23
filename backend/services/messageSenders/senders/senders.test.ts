import { beforeAll, describe, expect, test, vi } from "vitest";
import { EmailSender } from "./emailSender";
import type { EmailMessage } from "../../../types/message";
import { messageFixtureBase } from "../../../utils/fixtures";

describe("sender group", () => {
  const email: EmailMessage = messageFixtureBase.email;
  let sender: EmailSender;

  beforeAll(() => {
    sender = new EmailSender();
  });

  test("test method send in sender uses sendMessage", async () => {
    const spy = vi.spyOn(sender! as any, "sendMessage");
    await sender!.send(email);
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledExactlyOnceWith(email);
  });

  test("test method send throw an error when an error is thrown by sendMessage", async () => {
    vi.spyOn(sender! as any, "sendMessage").mockRejectedValue(
      new Error("fail"),
    )
    await expect(async () => await sender!.send(email)).rejects.toThrow(
      Error("An error Occured, error: Error: fail"),
    );
  });
});
