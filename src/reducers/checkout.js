import {
  SET_EXPRESS_CHECKOUT,
  SET_EXPRESS_PAYPAL_CHECKOUT,
  SET_OD_FOR_PAYPAL,
  SET_ORDER_FLAG,
  SET_SP_PRODUCTS,
  // SET_BILL_PLAN,
  // SET_PAYPAL_FAIL,
  SET_PAYPAL_SUCCESS,
  CLEAR_PAYPAL_SUCCESS,
  HEADER_POP_UP_MODAL,
  SET_GUEST
} from "../actions/type";

const initialState = {
  isExpressCheckout: false,
  expressCheckout: {},
  isExpressPaypalCheckout: false,
  expressPaypalCheckout: {},
  paypalOrderDetails: {},
  isPaypalSuccess: null,
  billingPlan: {},
  orderFlag: null,
  subscribedProducts: [],
  headerPopUpModalData: false,
  isGuest: false
};

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_EXPRESS_CHECKOUT:
      return {
        ...state,
        isExpressCheckout: payload
      };

    case SET_EXPRESS_PAYPAL_CHECKOUT:
      return {
        ...state,
        isExpressPaypalCheckout: payload
      };

    case SET_OD_FOR_PAYPAL:
      return {
        ...state,
        paypalOrderDetails: payload
      };

    case SET_ORDER_FLAG:
      return {
        ...state,
        orderFlag: payload
      };

    case SET_SP_PRODUCTS:
      return {
        ...state,
        subscribedProducts: payload
      };

    case SET_PAYPAL_SUCCESS:
      return {
        ...state,
        isPaypalSuccess: true
      };

    case CLEAR_PAYPAL_SUCCESS:
      return {
        ...state,
        isPaypalSuccess: null
      };
    case HEADER_POP_UP_MODAL:
      return {
        ...state,
        headerPopUpModalData: payload
      };
    case SET_GUEST:
      return {
        ...state,
        isGuest: payload
      };
    default:
      return state;
  }
};
