import { SET_WISHLIST_LOGIN, UNSET_WISHLIST_LOGIN } from "./type";
export const setWishListLogin = wishListLogin => ({
  type: SET_WISHLIST_LOGIN,
  payload: wishListLogin
});
export const unsetWishListLogin = () => ({
  type: UNSET_WISHLIST_LOGIN,
  payload: {}
});
