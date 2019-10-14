import { rest } from "./rest";

export const updateAffData = (id, account) =>
  rest.post("/ambassador-portal/update", {
    id,
    account
  });
