import { rest } from "../api/rest";

export const stripeTokanCreate = body =>
  rest.post("/stripe/token/create", body);
