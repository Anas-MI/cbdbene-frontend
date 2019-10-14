import { rest } from "./rest";

export const getProductReviews = id => rest.get("/review/getall/", id);
