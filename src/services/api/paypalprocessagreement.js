import { rest } from "./rest";

export const paypalprocessagreement = body =>
  rest.post("/paypal/processagreement", body);
