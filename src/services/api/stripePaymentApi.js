import { rest } from "../api/rest";

export const stripePaymentApi = body => rest.post("/stripe/charge", body);
