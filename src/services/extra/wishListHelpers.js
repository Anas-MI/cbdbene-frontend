import { addToWishListApi, deleteWishList } from "../api";

export const getWishList = (userid = "guest") => {
  return [];
};
export const addToWhisList = (productmeta, productid, userid = "guest") => {
  if (!isProductInWishList(productmeta)) {
  }

  if (userid !== "guest") {
    const wishList = getWishList();
    addToWishListApi(userid, productid, productmeta)
      .then(res => res.json())
      .then(resJson2 => {
        if (resJson2.status) {
          var wishListId = resJson2.wishlist._id;
          //var setinde
          wishList.map((itm, index) => {
            if (itm.productmeta === resJson2.wishlist.productmeta) {
              wishList[index] = {
                productmeta,
                productid,
                userid,
                wishListId
              };
            } else {
            }
            return null;
          });
        }
      })
      .catch(err => {});
  }
};
export const isProductInWishList = (productmeta, list = []) => {
  const wishList = list || [];
  // console.log({
  //   wishList
  // });
  return wishList.some(pr => pr.productmeta === productmeta);
};
export const removeFromWhisList = (
  productmeta,
  productid,
  productDetails,
  userid = "guest"
) => {
  const wishList = getWishList();

  if (isProductInWishList(productmeta)) {
    if (wishList.length > 0) {
      wishList.map(itm => {
        if (itm.productmeta === productmeta && itm.userid !== "guest") {
          var id = itm.wishListId;
          deleteWishList({ id })
            .then(res => res.json())
            .then(resJson => {
              if (resJson.success) {
              }
            })
            .catch();
        }
        return null;
      });
    }
  }
};
export const toggleWishListItem = (
  productmeta,
  productid,
  productDetails,
  userid = "guest"
) => {
  if (isProductInWishList(productmeta)) {
    removeFromWhisList(productmeta, productid, productDetails, userid);
  } else {
    addToWhisList(productmeta, productid, productDetails, userid);
  }
};
