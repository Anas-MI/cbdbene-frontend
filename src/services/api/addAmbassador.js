import { rest } from "../api/rest";
export const addAmbassador = data =>
  rest.post("/ambassador-portal/add/url", data);
