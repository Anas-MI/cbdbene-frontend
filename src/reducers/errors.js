import { CLEAR_ERRORS, SET_ERRORS } from "../actions/type";

const initialState = {};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case CLEAR_ERRORS:
      return initialState;

    case SET_ERRORS:
      return payload;

    default:
      return state;
  }
};
