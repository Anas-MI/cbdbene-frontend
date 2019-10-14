import { SET_APUSER, UNSET_APUSER } from "../actions/type";

const initialState = {};

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_APUSER:
      return payload;

    case UNSET_APUSER:
      return payload;

    default:
      return state;
  }
};
