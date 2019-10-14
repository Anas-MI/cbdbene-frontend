import { SET_WISHLIST, UNSET_WISHLIST } from "../actions/type";

const initialState = [];

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_WISHLIST:
      return payload;

    case UNSET_WISHLIST:
      return payload;

    default:
      return state;
  }
};
