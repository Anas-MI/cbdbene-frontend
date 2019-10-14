import {
  ADD_ITEM,
  REMOVE_ITEM,
  MODIFY_ITEM,
  CLEAR_CART,
  SET_SHIPPING_CHARGE,
  SET_TAX_VALUE,
  SET_SHIPPING_TYPE,
  SET_COUPON_CODE_DISCOUNT_VALUE,
  SET_FAV_COUNTITY,
  SET_CART,
  SET_CART_NULL_ITEM
} from "./type";

import { setCartApi, getSingleUserApi } from "../services/api";
import { initialCart } from "../components/Constants";

import {
  addItem,
  removeItem,
  modifyProduct
} from "../services/extra/cartHealpers";

export const addToCart = (item, cart = null, userMetaId = null) => dispatch => {
  // console.log("0");
  dispatch({
    type: ADD_ITEM,
    payload: item
  });
  // console.log("1");
  if (cart) {
    // console.log("2");
    const newCart = addItem(cart, item);
    const isNulled = newCart.items.find(el => el.isNull);
    // console.log({
    //   isNulled
    // });
    if (isNulled && !newCart.hasNulled) {
      dispatch(setCartNullItem());
    } else if (newCart.hasNulled) {
      dispatch(setCartNullItem(false));
    }
    if (userMetaId) {
      setCartApi({
        usermetaid: userMetaId,
        cart: newCart
      });
    }
  } else {
    if (item.isNull) {
      dispatch(setCartNullItem());
    }
  }
};
export const fetchCart = userId => dispatch => {
  // console.log({ userId });

  getSingleUserApi(userId)
    .then(res => res.json())
    .then(res => {
      console.log({ res });
      if (res.status && res.user && res.user.cart) {
        dispatch({
          type: SET_CART,
          payload: res.user.cart
        });
      }
    });
};
export const removeFromCart = (
  id,
  cart = null,
  userMetaId = null
) => dispatch => {
  dispatch({
    type: REMOVE_ITEM,
    payload: id
  });
  if (cart && userMetaId) {
    const newCart = removeItem(cart, id);
    setCartApi({
      usermetaid: userMetaId,
      cart: newCart
    });
  }
};

export const modifyItem = (
  oldItem,
  cart = null,
  userMetaId = null
) => dispatch => {
  dispatch({
    type: MODIFY_ITEM,
    payload: oldItem
  });
  if (cart && userMetaId) {
    const newCart = modifyProduct(oldItem.oldItem, oldItem.newItem, cart);
    setCartApi({
      usermetaid: userMetaId,
      cart: newCart
    });
  }
};
export const clearCart = (userMetaId = null) => dispatch => {
  // console.log("cleared =========== ")
  dispatch({
    type: CLEAR_CART
  });
  if (userMetaId) {
    setCartApi({
      usermetaid: userMetaId,
      cart: initialCart
    });
  }
};
export const clearCartA = ()=> {
  // console.log("clear AAAAAAAAAA")
  return({
    type: CLEAR_CART
  })
}
export const setShippingCharge = (
  charge,
  cart = null,
  userMetaId = null
) => dispatch => {
  dispatch({
    type: SET_SHIPPING_CHARGE,
    payload: charge
  });
  if (cart && userMetaId) {
    setCartApi({
      usermetaid: userMetaId,
      cart: {
        ...cart,
        shippingCharge: charge
      }
    });
  }
};

export const setShippingType = (
  type,
  cart = null,
  userMetaId = null
) => dispatch => {
  dispatch({
    type: SET_SHIPPING_TYPE,
    payload: type
  });
  if (cart && userMetaId) {
    setCartApi({
      usermetaid: userMetaId,
      cart: {
        ...cart,
        shippingType: type
      }
    });
  }
};

export const setTax = (tax, cart = null, userMetaId = null) => dispatch => {
  dispatch({
    type: SET_TAX_VALUE,
    payload: tax
  });
  if (cart && userMetaId) {
    setCartApi({
      usermetaid: userMetaId,
      cart: {
        ...cart,
        taxPersent: tax.taxPersent,
        taxCountry: tax.taxCountry
      }
    });
  }
};

export const setCoupon = (
  coupon,
  cart = null,
  userMetaId = null
) => dispatch => {
  dispatch({
    type: SET_COUPON_CODE_DISCOUNT_VALUE,
    payload: coupon
  });
  if (cart && userMetaId) {
    setCartApi({
      usermetaid: userMetaId,
      cart: {
        ...cart,
        taxCouponCode: coupon.taxCouponCode,
        taxCouponDiscount: coupon.taxCouponDiscount
      }
    });
  }
};

export const setFav = (fav, cart = null, userMetaId = null) => dispatch => {
  dispatch({
    type: SET_FAV_COUNTITY,
    payload: fav
  });
  if (cart && userMetaId) {
    setCartApi({
      usermetaid: userMetaId,
      cart: {
        ...cart,
        setFav: fav.setFav
      }
    });
  }
};

export const setCartNullItem = (isNull = true) => ({
  type: SET_CART_NULL_ITEM,
  payload: isNull
});
