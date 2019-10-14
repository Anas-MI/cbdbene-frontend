import { rest } from "../api/rest";

export const loginUserApiGoogle = (email, google) =>
  rest.post("/users/api/login", { email, google });
