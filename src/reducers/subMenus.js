import {
  SHOW_SUB_MENU,
  SET_SUB_MENU_PRODUCTS,
  SET_ACTIVE_SUB_MENU,
  SET_POS_UP,
  SET_LEARN_SUB_MENU
} from "../actions/type";

const initialState = {
  isVisible: false,
  contentType: "products",
  products: [],
  links: [],
  activeMenu: "",
  isPosUp: window.scrollY > 45 ? false : true
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_SUB_MENU:
      return {
        ...state,
        isVisible: payload
      };
    case SET_SUB_MENU_PRODUCTS:
      return {
        ...state,
        products: payload,
        contentType: "products"
      };
    case SET_ACTIVE_SUB_MENU:
      return {
        ...state,
        activeMenu: payload
      };
    case SET_LEARN_SUB_MENU:
      return {
        ...state,
        links: payload,
        contentType: "links"
      };
    case SET_POS_UP:
      return {
        ...state,
        isPosUp: payload
      };

    default:
      return state;
  }
};
