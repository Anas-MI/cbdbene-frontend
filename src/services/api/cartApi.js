import { rest } from "./rest";

export const setCartApi = body => rest.post("/order/add/cart", body);
