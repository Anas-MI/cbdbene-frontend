import { rest } from "../api/rest";

export const updatePassword = body =>
  rest.post("/users/api/profile/password", body);
