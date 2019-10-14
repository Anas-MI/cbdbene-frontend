import { TOGGLE_CART_BAR } from "../actions/type";

const initialState = {
  isOpen: false
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case TOGGLE_CART_BAR:
      return {
        ...state,
        isOpen: !state.isOpen
      };

    default:
      return state;
  }
};
