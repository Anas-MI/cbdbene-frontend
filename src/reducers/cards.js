import { SET_CARDS, CLEAR_CARDS } from "../actions/type";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CARDS:
      return action.payload;
    case CLEAR_CARDS:
      return initialState;

    default:
      return state;
  }
};
