import { http, HttpResponse } from "msw";
import { urlApiBase, urlMessages } from "../constants";
import { fakeMessages } from "./data";

export const handlers = [
  http.get(`${urlApiBase}${urlMessages}`, () => {
    return HttpResponse.json({
      data: fakeMessages,
    });
  }),
];
