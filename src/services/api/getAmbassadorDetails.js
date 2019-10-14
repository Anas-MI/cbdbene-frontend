import { rest } from "./rest";

export const getAmbassadorDetails = id =>
  rest.get("/ambassador-portal/stats/", id);
