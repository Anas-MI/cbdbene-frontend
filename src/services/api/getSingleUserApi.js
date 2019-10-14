import { rest } from "../api/rest";
export const getSingleUserApi = userid =>
  rest.get("/users/api/profile/" + userid);
