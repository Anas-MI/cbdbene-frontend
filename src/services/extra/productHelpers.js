import { getCountryName } from "./";
import { variablePriceSet } from "./cartHealpers";
import { encodeUrlFn } from "../../components";

export const filteredAttr = (variation, attr) => {
  const attrX = variation.map(el => {
    const { sale_price, sku, bar, regular_price, ...rest } = el;
    return {
      ...rest
    };
  });
  const attrY = attrX.filter(el => Object.keys(el).length === attr.length);
  const attrZ = removeDuplicateObjAr(attrY);

  return attrZ;
};
export const removeDuplicateObjAr = arr =>
  arr.reduce(
    (r, i) =>
      !r.some(
        j =>
          Object.keys(i).length === Object.keys(j).length &&
          !Object.keys(i).some(k => i[k] !== j[k])
      )
        ? [...r, i]
        : r,
    []
  );
export const findByMatchingProperties = (set, properties) =>
  set.filter(function(entry) {
    return Object.keys(properties).every(function(key) {
      return entry[properties[key].names] === properties[key].values;
    });
  });
export const findByMatchingProperties2 = (set, properties) =>
  set.filter(function(entry) {
    return Object.keys(properties).every(function(key) {
      console.log({
        entry,
        properties
      });
      return entry[key] === properties[key];
    });
  });
export const getBasicPrice = product => {
  const { verifiedAttr, variation, combo, producttype } = product;
  if (combo || producttype !== "variable") {
    return {
      regular_price: product.dregularprice,
      sale_price: product.dsaleprice
    };
  }
  if (verifiedAttr) {
    if (verifiedAttr.constructor === Array) {
      if (verifiedAttr.length > 0) {
        const findItem = variation.find(el => {
          const keyList = Object.keys(verifiedAttr[0]);
          const flag = keyList.every(elx => el[elx]);
          return flag;
        });
        if (findItem) {
          const { regular_price, sale_price } = findItem;
          return {
            regular_price,
            sale_price
          };
        }
      }
    }
  }
};
export const directAddToCart = product => {
  const { verifiedAttr } = product;
  const arr =
    verifiedAttr && verifiedAttr.constructor === Array
      ? verifiedAttr.map(el => {
          const keys = Object.keys(el);
          return keys.map(elx => {
            return {
              [elx]: {
                label: el[elx],
                value: el[elx]
              }
            };
          });
        })
      : [];
  // const nulledArr =
  //   verifiedAttr && verifiedAttr.constructor === Array
  //     ? verifiedAttr.map(el => {
  //         const keys = Object.keys(el);
  //         return keys.map(elx => {
  //           return {
  //             [elx]: {
  //               label: null,
  //               value: null
  //             }
  //           };
  //         });
  //       })
  //     : [];
  const obj = arr.map(el => {
    return el.reduce((a, b) => {
      return { ...a, ...b };
    }, {});
  });
  // const nulledObj = nulledArr.map(el => {
  //   return el.reduce((a, b) => {
  //     return { ...a, ...b };
  //   }, {});
  // });

  const newVariation =
    obj && obj.length
      ? {
          ...obj[0]
        }
      : {};
  // const nulledVariation =
  //   nulledObj && nulledObj.length
  //     ? {
  //         ...nulledObj[0]
  //       }
  //     : {};

  // console.log({
  //   newVariation,
  //   product: {
  //     ...product,
  //     ...newVariation,
  //   }
  // })

  // return {
  //   ...product,
  //   ...nulledVariation,
  //   isNull: true,
  //   qty: {
  //     label: "1",
  //     value: "1",
  //   }
  // }
  return variablePriceSet({
    ...product,
    ...newVariation,
    qty: {
      label: "1",
      value: "1"
    }
  });
};
export const getAttrListing = (attr = []) =>
  attr.length > 0
    ? Object.keys(attr[0]).map(el => ({
        names: el,
        values: [...new Set(attr.map(elx => elx[el]))]
      }))
    : [];
export const getSizes = product => {
  const { combo, attributes } = product;

  if (combo !== true) {
    const size = attributes.find(el => el.names === "size");
    if (size) if (typeof size.values === "function") return size.values;
  }
  return [];
};

export const getImagePath = product => {
  if (product.productid) {
    if (product.productid.featurefilepath)
      return product.productid.featurefilepath;
  }
  if (product.featureimage) return product.featureimage;

  if (product.galleryimgdetails) return product.galleryimgdetails[0];
};
export const getFeaturedProduct = ({ products, countryCode = "US" }) => {
  const filterProduct = getVisibleProducts({ products, countryCode }).filter(
    el => {
      if (!el) return false;
      if (el.featured !== true) return false;

      return true;
    }
  );

  return filterProduct;
};
export const getVisibleProducts = ({ products, countryCode = "US" }) => {
  const countryName = getCountryName(countryCode);
  const productsList = products.filter(el => {
    if (!el) return false;
    if (el.visibilitytype !== true) return false;

    if (el.combo) {
      if (el.blockedcountries) {
        if (el.blockedcountries.includes(countryName)) return false;
      }
    }
    if (el.productid) {
      if (el.productid.blockedcountries) {
        if (el.productid.blockedcountries.includes(countryName)) return false;
      }
    }
    return true;
  });
  return productsList.map(el => {
    if (el.variation) {
      const verifiedAttr = filteredAttr(el.variation, el.attributes);
      return {
        ...el,
        verifiedAttr,
        visibleAttrList: getAttrListing(verifiedAttr)
      };
    } else return el;
  });
};
export const applyVariationFilter = (product, selectedVariation = {}) => {
  const visibleAttr = findByMatchingProperties(
    product.verifiedAttr,
    selectedVariation
  );
  return {
    ...product,
    visibleAttr,
    visibleAttrList: getAttrListing(visibleAttr)
  };
};
export const getCategoraiesProducts = products => {
  const productsN = products.filter(el => el.categoryid);
  const combos = products.filter(el => el.combo);

  const filtered = productsN
    .map(el => {
      return productsN.filter(elx => {
        if (el.categoryid[0] && elx.categoryid[0])
          return el.categoryid[0]._id === elx.categoryid[0]._id;

        return false;
      });
    })
    .sort((a, b) => {
      if (a[0] && b[0])
        if (a[0].categoryid[0] && b[0].categoryid[0]) {
          if (a[0].categoryid[0]._id < b[0].categoryid[0]._id) return -1;
          if (a[0].categoryid[0]._id > b[0].categoryid[0]._id) return 1;
        }
      return 0;
    });

  const productsF = filtered.filter((el, x) => {
    if (x === 0) return true;
    if (filtered[x - 1] && el[0]) {
      if (filtered[x - 1][0]) {
        if (filtered[x - 1][0].categoryid[0] && el[0].categoryid[0]) {
          const prevEl = filtered[x - 1][0].categoryid[0]._id;
          const currentEl = el[0].categoryid[0]._id;
          return prevEl !== currentEl;
        }
      }
    }
    return false;
    // const prevEl = filtered[x - 1][0].categoryid[0]._id;
    // const currentEl = el[0].categoryid[0]._id;

    // return prevEl !== currentEl;
  });
  const cate = [...productsF, combos];
  return cate
    .map(el => {
      if (el.length) {
        if (el[0].combo) {
          return {
            category: {
              blockedcountries: [],
              catdescription: "Bundles",
              categoryid: "Bundles",
              categoryslug: "Bundles",
              categorytitle: "Bundles",
              _id: "Bundles"
            },
            products: el
          };
        }
        return {
          category: {
            ...el[0].categoryid[0]
          },
          products: el
        };
      }
      return null;
    })
    .filter(el => el);
};
export const getVisibleCategory = (arr = [], countryCode = "US") => {
  const countryName = getCountryName(countryCode);
  return arr.filter(el => {
    if (!el) return false;
    if (!el.category) return false;
    if (el.category.blockedcountries) {
      if (el.category.blockedcountries.includes(countryName)) return false;
    }
    return true;
  });
};
export const getProductsByCategory = (products = [], category = "") => {
  if (
    category.toLowerCase() === "combos" ||
    category.toLowerCase() === "kits" ||
    category.toLowerCase() === "bundles"
  ) {
    return products.filter(el => el.combo);
  }
  return products.filter(el => {
    if (!el.categoryid) return false;
    const found = el.categoryid.find(elx => elx.categorytitle === category);
    return found;
  });
};
export const getMatchCategory = (arr = [], category = "") =>
  arr.find(el => el.categorytitle === category);

export const generateProductSlug = product => {
  const productSlug = product.title
    ? product.title.toLocaleLowerCase()
    : product.productid && product.productid.producttitle.toLocaleLowerCase();

  return encodeUrlFn(productSlug);
};

export const addSlugToProduct = product => ({
  ...product,
  productSlug: generateProductSlug(product)
});
