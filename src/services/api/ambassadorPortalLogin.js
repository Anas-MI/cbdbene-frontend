import { rest } from "../api/rest";
export const ambassadorPortalLogin = (email, password) =>
  rest.post("/ambassador-portal/login", { email, password });
