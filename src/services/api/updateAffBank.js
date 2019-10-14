import { rest } from "./rest";

export const updateAffBank = (id, bank) =>
  rest.post("/ambassador-portal/update", {
    id,
    bank
  });
