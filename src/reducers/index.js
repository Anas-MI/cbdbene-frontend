import { reducer as formReducer } from "redux-form";
import cart from "./cart";
import user from "./user";
import location from "./location";
import ambassadoruser from "./ambassadoruser";
import wishList from "./wishList";
import wishListLogin from "./wishListLogin";
import products from "./products";
import checkout from "./checkout";
import referrer from "./referrer";
import address from "./address";
import cards from "./cards";
import reviews from "./reviews";
import firstSetting from "./firstSetting";
import cartSideBar from "./cartSideBar";
import subMenus from "./subMenus";
import errors from "./errors";
import extras from "./extras";

export default {
  cart,
  form: formReducer,
  user,
  location,
  ambassadoruser,
  wishList,
  products,
  checkout,
  wishListLogin,
  referrer,
  address,
  cards,
  reviews,
  firstSetting,
  cartSideBar,
  subMenus,
  errors,
  extras
};
