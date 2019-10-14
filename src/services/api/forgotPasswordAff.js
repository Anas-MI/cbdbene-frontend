import { rest } from "../api/rest";
export const forgotPasswordAff = data =>
  rest.post("/ambassador-portal/forgetpassword", data);
