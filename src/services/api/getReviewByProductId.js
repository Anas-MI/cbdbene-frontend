import { rest } from "./rest";
export const getReviewByProductId = body =>
  rest.post("/products/single-product-reviews", body);
