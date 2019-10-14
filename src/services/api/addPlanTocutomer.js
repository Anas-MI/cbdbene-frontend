import { rest } from "../api/rest";
export const addPlanTocutomer = data =>
  rest.post("/stripe/subscription/attach", data);
