import { SET_WISHLIST_LOGIN, UNSET_WISHLIST_LOGIN } from "../actions/type";
const initialState = [];
export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_WISHLIST_LOGIN:
      return payload;

    case UNSET_WISHLIST_LOGIN:
      return payload;

    default:
      return state;
  }
};
