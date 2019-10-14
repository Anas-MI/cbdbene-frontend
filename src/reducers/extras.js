import { SET_CHECKOUT_PAGE, SET_REDIRECT_CHECKOUT } from "../actions/type";

const initialState = {
  isCheckoutPage: false,
  isRedirectToCheckout: false
};

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_CHECKOUT_PAGE:
      return {
        ...state,
        isCheckoutPage: payload
      };
    case SET_REDIRECT_CHECKOUT:
      return {
        ...state,
        isRedirectToCheckout: payload
      };
    default:
      return state;
  }
};
