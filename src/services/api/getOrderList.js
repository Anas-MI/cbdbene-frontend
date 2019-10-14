import { rest } from "./rest";
export const getOrderList = body => rest.get("/order/getorders", body);
export const getOrderByUser = body => rest.get("/order/api/getbyuser/", body);
