import { rest } from "./rest";

export const createPaypalAgreementApi = body =>
  rest.post("/paypal/createagreement", body);
