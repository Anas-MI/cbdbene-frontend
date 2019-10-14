import { rest } from "./rest";

export const updateAmbassadorProfileApi = (id, detail) =>
  rest.post("/ambassador-portal/update", {
    id,
    ...detail
  });
