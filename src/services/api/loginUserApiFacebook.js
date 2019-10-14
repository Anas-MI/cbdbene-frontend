import { rest } from "../api/rest";

export const loginUserApiFacebook = (email, facebook) =>
  rest.post("/users/api/login", { email, facebook });
