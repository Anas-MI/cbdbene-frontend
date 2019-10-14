import { SET_WISHLIST, UNSET_WISHLIST } from "./type";
import { encodeUrlFn } from "../components";

const wishListParser = wishList =>
  wishList.map(el => {
    if (el.productDetails) {
      const { productDetails } = el;
      if (productDetails.combo) {
        const { comboid } = productDetails;
        const productSlug = encodeUrlFn(comboid.title);
        return {
          ...el,
          productDetails: {
            ...productDetails,
            comboid: {
              ...comboid,
              productSlug
            }
          }
        };
      } else if (productDetails.productid) {
        const { productid } = productDetails;
        const productSlug = encodeUrlFn(productid.producttitle);
        return {
          ...el,
          productDetails: {
            ...productDetails,
            productid: {
              ...productid,
              productSlug
            }
          }
        };
      } else {
        return el;
      }
    }
    return el;
  });

export const setWishList = wishList => dispatch => {
  const newWishList = wishListParser(wishList);
  console.log({
    wishList,
    newWishList
  });
  dispatch({
    type: SET_WISHLIST,
    payload: newWishList
  });
};
export const unsetWishList = () => ({
  type: UNSET_WISHLIST,
  payload: {}
});
