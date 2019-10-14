import { rest } from "../api/rest";
export const addUpdateUserDetails = data =>
  rest.post("/users/api/profile/", data);
