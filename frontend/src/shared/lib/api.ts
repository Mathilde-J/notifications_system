import { urlApiBase, urlMessages } from "../../constants";
import type { Message } from "../../features/messages/types/message";

type MethodAuthorized = "GET" | "POST";
const defaultHeaders = { "Content-Type": "application/json" };

const fetchHandler = async <T>(
  url: string,
  method: MethodAuthorized,
  headers: HeadersInit = defaultHeaders,
  body?: BodyInit,
): Promise<T> => {
  let requestConfig: RequestInit = { method: method, headers: headers };
  if (body) {
    requestConfig = { ...requestConfig, body: body };
  }
  const response = await fetch(url, requestConfig);
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(
      responseBody.error ?? `Statut de réponse : ${response.status}`,
    );
  }

  return responseBody.data as T;
};

export const getAllMessages = async (): Promise<Message[]> => {
  const fetchResult: Message[] = await fetchHandler(
    `${urlApiBase}${urlMessages}`,
    "GET",
  );
  return fetchResult;
};
