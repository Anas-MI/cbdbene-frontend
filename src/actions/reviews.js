import { GET_REVIEWS, CLEAR_REVIEWS, REVIEW_POSTED } from "./type";

import {
  postReviewApi,
  getProductReviews
  // getAllProductApi, getAllComboApi
} from "../services/api";
// import { setProducts } from "./products";

export const postReview = (review, countryCode) => dispatch => {
  postReviewApi(review)
    .then(res => res.json())
    .then(res => {
      if (res.status) {
        dispatch({
          type: REVIEW_POSTED,
          payload: true
        });
        // getAllProductApi().then(res => res.json())
        //   .then(resJson => {
        //     if (resJson.products) {
        //       setProducts({
        //         products: resJson.products,
        //         countryCode
        //       });
        //       getAllComboApi().then(res => res.json())
        //         .then(resJson1 => {
        //           if (resJson1.combos) {
        //             const products = [...resJson.products, ...resJson1.combos];
        //             setProducts({
        //               products,
        //               countryCode
        //             });
        //           }
        //         })
        //     }else{
        //       getAllComboApi().then(res => res.json())
        //         .then(resJson => {
        //           if (resJson.combos) {
        //             const products = [...resJson.combos];
        //             setProducts({
        //               products,
        //               countryCode
        //             });
        //           }
        //         })
        //     }
        //   })
        //   .catch(err => {
        //     getAllComboApi().then(res => res.json())
        //       .then(resJson => {
        //         if (resJson.combos) {
        //           const products = [...resJson.combos];
        //           setProducts({
        //             products,
        //             countryCode
        //           });
        //         }
        //       })
        //     console.log({
        //       err
        //     })
        //   })
      }
    });
};
export const clearReviewPosted = () => ({
  type: REVIEW_POSTED,
  payload: false
});
export const getReviews = productId => dispatch => {
  // console.log("adf");
  getProductReviews(productId)
    .then(res => res.json())
    .then(res => {
      console.log({
        res
      });
      if (res.status && res.reviews) {
        dispatch({
          type: GET_REVIEWS,
          payload: res.reviews
        });
      }
    })
    .catch(err => console.log({ err }));
};

export const clearReviews = () => ({
  type: CLEAR_REVIEWS,
  payload: []
});
