import { SET_REFERRER } from "../actions/type";

const initialState = {
  referralUrl: null,
  ambassadorId: null,
  ambassadorUrl: null,
  referralUrlId: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_REFERRER:
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
};
