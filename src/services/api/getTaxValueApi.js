import { rest } from "./rest";

export const getTaxValueApi = (countrycode = "US") =>
  rest.get(`/getinfo/gettax/${countrycode}`);
