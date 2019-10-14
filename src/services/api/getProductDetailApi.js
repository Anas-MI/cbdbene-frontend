import { rest } from "./rest";

export const getProductDetailApi = id => rest.get("/products/api/getbyid/", id);
