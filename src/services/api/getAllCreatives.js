import { rest } from "./rest";

export const getAllCreatives = () =>
  rest.get("/ambassador-portal/creatives/api/all");
