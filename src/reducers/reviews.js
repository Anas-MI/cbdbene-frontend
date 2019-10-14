import { GET_REVIEWS, CLEAR_REVIEWS, REVIEW_POSTED } from "../actions/type";

const initialState = {
  reviews: [],
  isPosted: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      };

    case CLEAR_REVIEWS:
      return {
        ...state,
        reviews: []
      };

    case REVIEW_POSTED:
      return {
        ...state,
        isPosted: action.payload
      };

    default:
      return state;
  }
};
