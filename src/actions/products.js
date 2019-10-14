import { SET_PRODUCTS, SET_PRODUCT, CLEAR_PRODUCT } from "./type";
import { addSlugToProduct } from "../services/extra";

export const setProducts = products => dispatch => {
  // console.log("asdfasdf", products);
  const parsedProduct = products.products.map(el => addSlugToProduct(el));
  // console.log({
  //   parsedProduct
  // });
  dispatch({
    type: SET_PRODUCTS,
    payload: {
      ...products,
      products: parsedProduct
    }
  });
};
export const setProduct = product => dispatch => {
  if (product.productSlug) {
    dispatch({
      type: SET_PRODUCT,
      payload: product
    });
  } else {
    dispatch({
      type: SET_PRODUCT,
      payload: addSlugToProduct(product)
    });
  }
};
export const clearProduct = () => ({
  type: CLEAR_PRODUCT,
  payload: null
});
