import { rest } from "./rest";

export const deleteWishList = body => rest.post("/wishlist/api/delete/", body);
