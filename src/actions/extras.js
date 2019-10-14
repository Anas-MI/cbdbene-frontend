import { SET_CHECKOUT_PAGE, SET_REDIRECT_CHECKOUT } from "./type";

export const setCheckoutPage = (payload = false) => ({
  type: SET_CHECKOUT_PAGE,
  payload
});
export const setRedirectCheckout = (payload = false) => ({
  type: SET_REDIRECT_CHECKOUT,
  payload
});
