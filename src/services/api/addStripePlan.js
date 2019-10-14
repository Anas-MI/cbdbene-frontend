import { rest } from "../api/rest";
export const addStripePlan = data =>
  rest.post("/stripe/subscription/create", data);
