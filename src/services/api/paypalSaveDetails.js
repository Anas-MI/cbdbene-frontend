import { rest } from "./rest";

export const paypalSaveDetails = body =>
  rest.post("/paypal/save/paymentdetails", body);
