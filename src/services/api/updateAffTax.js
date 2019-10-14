import { rest } from "./rest";

export const updateAffTax = (id, tax) =>
  rest.post("/ambassador-portal/update", {
    id,
    tax
  });
