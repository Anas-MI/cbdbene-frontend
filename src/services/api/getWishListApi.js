import { rest } from "../api/rest";

export const getWishListApi = userid =>
  rest.post("/wishlist/api/byuser", { userid });
