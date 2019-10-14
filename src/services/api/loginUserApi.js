import { rest } from "../api/rest";

export const loginUserApi = (email, password) =>
  rest.post("/users/api/login", { email, password });
