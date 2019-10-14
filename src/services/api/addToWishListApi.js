import { rest } from "../api/rest";

export const addToWishListApi = (userid, productid, productmeta, productSlug) =>
  rest.post("/wishlist/api/add", {
    userid,
    productid,
    productmeta,
    productSlug
  });
