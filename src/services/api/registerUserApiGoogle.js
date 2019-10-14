import { rest } from "../api/rest";
export const registerUserApiGoogle = body =>
  rest.post("/users/api/register", { ...body, role: "customer" });
