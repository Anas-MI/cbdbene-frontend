import { rest } from "./rest";

export const orderDelete = body => rest.post("/order/api/delete", body);
