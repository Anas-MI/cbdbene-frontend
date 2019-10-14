import { rest } from "./rest";

export const paypalApi = body => rest.paypal("/paypal/buy", body);
