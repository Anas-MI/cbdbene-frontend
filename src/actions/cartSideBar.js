import { TOGGLE_CART_BAR } from "./type";

export const toggleCartBar = () => dispatch => {
  dispatch({
    type: TOGGLE_CART_BAR
  });
  document.body.classList.toggle("cart-open");
};
