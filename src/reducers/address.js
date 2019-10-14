import { SET_ADDRESS, CLEAR_ADDRESS } from "../actions/type";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESS:
      return action.payload;
    case CLEAR_ADDRESS:
      return initialState;

    default:
      return state;
  }
};
