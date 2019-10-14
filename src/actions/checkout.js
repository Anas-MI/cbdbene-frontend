import {
  SET_EXPRESS_CHECKOUT,
  SET_EXPRESS_PAYPAL_CHECKOUT,
  SET_OD_FOR_PAYPAL,
  SET_ORDER_FLAG,
  SET_SP_PRODUCTS,
  SET_BILL_PLAN,
  SET_PAYPAL_FAIL,
  SET_PAYPAL_SUCCESS,
  CLEAR_PAYPAL_SUCCESS,
  HEADER_POP_UP_MODAL,
  SET_GUEST
} from "./type";

export const setExpressCheckout = payload => ({
  type: SET_EXPRESS_CHECKOUT,
  payload
});

export const setExpressPaypalCheckout = payload => ({
  type: SET_EXPRESS_PAYPAL_CHECKOUT,
  payload
});
export const setPaypalOrderDetails = payload => ({
  type: SET_OD_FOR_PAYPAL,
  payload
});
export const setOrderFlag = payload => ({
  type: SET_ORDER_FLAG,
  payload
});
export const setSubscribedProducts = payload => ({
  type: SET_SP_PRODUCTS,
  payload
});
export const setBillingPlan = payload => ({
  type: SET_BILL_PLAN,
  payload
});
export const setPaypalFail = () => ({
  type: SET_PAYPAL_FAIL
});
export const setPaypalSuccess = payload => ({
  type: SET_PAYPAL_SUCCESS,
  payload
});
export const clearPaypalSuccess = payload => ({
  type: CLEAR_PAYPAL_SUCCESS,
  payload
});
export const headerPopUpModal = payload => ({
  type: HEADER_POP_UP_MODAL,
  payload
});
export const setGuest = payload => ({
  type: SET_GUEST,
  payload
});
