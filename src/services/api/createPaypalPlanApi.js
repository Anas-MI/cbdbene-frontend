import { rest } from "../api/rest";

export const createPaypalPlanApi = body =>
  rest.post("/paypal/createplan", body);
