import { rest } from "./rest";

export const authorizeChargeApi = data => rest.post("/authorize/charge", data);

export const authorizeProfileChargeApi = data =>
  rest.post("/authorize/chargeprofile", data);

export const authorizeBankChargeApi = data =>
  rest.post("/authorize/charge/bank", data);

export const authorizeSubscriptionApi = data =>
  rest.post("/authorize/create/subscription", data);

export const authorizeSubscriptionProfileApi = data =>
  rest.post("/authorize/create/subscription/profile", data);

export const authorizeSubscriptionBankApi = data =>
  rest.post("/authorize/create/subscription/bank", data);
