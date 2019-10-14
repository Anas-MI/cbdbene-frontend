import { SET_ENTRY_MSG } from "../actions/type";

const initialState = {
  entryMsg: true
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ENTRY_MSG:
      return {
        ...state,
        entryMsg: payload
      };

    default:
      return state;
  }
};
