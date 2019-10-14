import { rest } from "./rest";

export const placeOrderApi = body => rest.post("/order/add", body);
export const placeOrderApiNew = body => rest.post("/order/process/order", body);
