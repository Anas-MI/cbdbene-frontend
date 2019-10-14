import { SET_CONTINENT, SET_COUNTRY, SET_LOCATION } from "../actions/type";

const initialState = {
  country: null,
  countryCode: null,
  continent: null
};

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_CONTINENT:
      return {
        ...state,
        continent: payload
      };

    case SET_COUNTRY:
      return {
        ...state,
        country: payload
      };

    case SET_LOCATION:
      console.log({
        state,
        payload
      });
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
};
