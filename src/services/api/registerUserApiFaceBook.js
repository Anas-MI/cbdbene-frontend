import { rest } from "../api/rest";
export const registerUserApiFaceBook = body =>
  rest.post("/users/api/register", { ...body, role: "customer" });
