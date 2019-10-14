import {
  SHOW_SUB_MENU,
  SET_SUB_MENU_PRODUCTS,
  SET_ACTIVE_SUB_MENU,
  SET_POS_UP,
  SET_LEARN_SUB_MENU
} from "./type";

export const subMenuVisible = (payload = true) => ({
  type: SHOW_SUB_MENU,
  payload
});

export const setSubMenuProducts = (payload = []) => ({
  type: SET_SUB_MENU_PRODUCTS,
  payload
});
export const setActiveMenu = (activeMenuName = "") => ({
  type: SET_ACTIVE_SUB_MENU,
  payload: activeMenuName
});
export const setPosUp = (payload = true) => ({
  type: SET_POS_UP,
  payload
});
export const setLearnSubMenu = (payload = []) => ({
  type: SET_LEARN_SUB_MENU,
  payload
});
