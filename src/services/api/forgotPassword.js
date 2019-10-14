import { rest } from "../api/rest";
export const forgotPassword = data =>
  rest.post("/users/api/forgetpassword", data);
