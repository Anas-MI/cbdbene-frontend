import { rest } from "../api/rest";

export const registerUserApi = body =>
  rest.post("/users/api/register", { ...body, role: "customer" });
