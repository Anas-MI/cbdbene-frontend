import { rest } from "../api/rest";

export const ambassadorPortalRegistration = body =>
  rest.post("/ambassador-portal/register", { ...body });
