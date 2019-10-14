import { SET_PRODUCTS, SET_PRODUCT, CLEAR_PRODUCT } from "../actions/type";
import {
  getFeaturedProduct,
  getVisibleProducts
  // filteredAttr,
  // getAttrListing
} from "../services/extra/productHelpers";
const initialState = {
  products: [],
  product: null,
  featured: []
};

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: [
          ...getVisibleProducts(payload)
          // {
          //   ...staticProduct,
          //   verifiedAttr: filteredAttr(
          //     staticProduct.variation,
          //     staticProduct.attributes
          //   ),
          //   visibleAttrList: getAttrListing(
          //     filteredAttr(staticProduct.variation, staticProduct.attributes)
          //   )
          // }
        ],
        featured: getFeaturedProduct(payload)
      };

    case SET_PRODUCT:
      return {
        ...state,
        product: payload
      };

    case CLEAR_PRODUCT:
      return {
        ...state,
        product: null
      };

    default:
      return state;
  }
};

// const staticProduct = {
//   _id: "5d286879723c3611ad3941b2",
//   attributecontent: [
//     {
//       title: "",
//       description: ""
//     },
//     {
//       title: "",
//       description: ""
//     },
//     {
//       title: "",
//       description: ""
//     },
//     {
//       title: "",
//       description: ""
//     },
//     {
//       title: "",
//       description: ""
//     }
//   ],
//   faqcontent: [
//     {
//       title: "",
//       description: ""
//     }
//   ],
//   enablereview: true,
//   galleryimgdetails: [],
//   attributes: [
//     {
//       names: "Flavor",
//       values: ["Vanilla", "Orange", "Mint", "Natural"]
//     },
//     {
//       names: "Strength",
//       values: ["300", "750", "1000", "1500", "500 mg"]
//     },
//     {
//       names: "size",
//       values: [
//         "30-ml",
//         "100-ml",
//         "150-ml",
//         "30-softgel",
//         "2-oz",
//         "8-oz",
//         "1 oz",
//         "3.38 oz",
//         "6 oz",
//         "100 ml",
//         "30 capsules",
//         "4-oz",
//         "3-oz",
//         "1.05-oz",
//         "5-oz",
//         "1-lb",
//         "3.2-oz",
//         "16-oz",
//         "10-oz",
//         "19-oz"
//       ]
//     }
//   ],
//   variation: [
//     {
//       Flavor: "Vanilla",
//       bar: "asdf1",
//       sku: "asdf1",
//       regular_price: "321",
//       sale_price: "321"
//     },
//     {
//       Flavor: "Mint",
//       bar: "asdf2",
//       sku: "asdf2",
//       regular_price: "321",
//       sale_price: "321"
//     },
//     {
//       Flavor: "Vanilla",
//       Strength: "300",
//       size: "30-ml",
//       sku: "asfd3asdf",
//       bar: "asdfaewr",
//       regular_price: "321",
//       sale_price: "321"
//     },
//     {
//       Flavor: "Vanilla",
//       Strength: "750",
//       size: "1 oz",
//       sku: "asdasdf41asdf",
//       bar: "1asd3f2asd41",
//       regular_price: "13213213",
//       sale_price: "1321321"
//     },
//     {
//       Flavor: "Vanilla",
//       Strength: "300",
//       size: "16-oz",
//       sku: "asdf21",
//       bar: "132a1dfs321",
//       regular_price: "31321",
//       sale_price: "321321"
//     },
//     {
//       Flavor: "Vanilla",
//       Strength: "300",
//       size: "5-oz",
//       sku: "asdf2341w6er43as21d3",
//       bar: "4163fad1s3dfd143w14e31",
//       regular_price: "464654",
//       sale_price: "464"
//     },
//     {
//       Flavor: "Vanilla",
//       Strength: "1500",
//       size: "3.2-oz",
//       sku: "AD56GF4",
//       bar: "DFHG564DF6HG",
//       regular_price: "4564654",
//       sale_price: "54654"
//     },
//     {
//       Flavor: "Mint",
//       Strength: "300",
//       size: "1-lb",
//       sku: "SHF546R4",
//       bar: "64DF4HG894",
//       regular_price: "4565464",
//       sale_price: "6454"
//     },
//     {
//       Flavor: "Orange",
//       Strength: "300",
//       size: "3.2-oz",
//       sku: "SF4G6546",
//       bar: "546JG4HDF4H654",
//       regular_price: "654456464",
//       sale_price: "5789874"
//     },
//     {
//       Flavor: "Mint",
//       Strength: "1000",
//       size: "16-oz",
//       sku: "GBH4N5654",
//       bar: "65HG4564",
//       regular_price: "64654",
//       sale_price: "645654"
//     },
//     {
//       Flavor: "Mint",
//       Strength: "750",
//       size: "16-oz",
//       sku: "G36564H6R56",
//       bar: "5465HGD4F65H46",
//       regular_price: "4654564",
//       sale_price: "644"
//     },
//     {
//       Flavor: "Vanilla",
//       Strength: "750",
//       size: "10-oz",
//       sku: "T5R64H654",
//       bar: "64GFJ6H4D6546",
//       regular_price: "1465465464",
//       sale_price: "64554"
//     },
//     {
//       Flavor: "Orange",
//       Strength: "1000",
//       size: "100 ml",
//       sku: "RT56`54",
//       bar: "564JYT564564",
//       regular_price: "654564564654",
//       sale_price: "654654"
//     },
//     {
//       Flavor: "Vanilla",
//       Strength: "750",
//       size: "100-ml",
//       sku: "RSFYG34D54",
//       bar: "654GR45HF564",
//       regular_price: "65465464",
//       sale_price: "465456"
//     },
//     {
//       Flavor: "Vanilla",
//       Strength: "750",
//       size: "100-ml",
//       sku: "456456453Q",
//       bar: "4654654",
//       regular_price: "32132132",
//       sale_price: "13213"
//     },
//     {
//       Flavor: "Orange",
//       Strength: "300",
//       size: "100-ml",
//       sku: "ADSG245",
//       bar: "465SDFH6546546Q54H5G46",
//       regular_price: "456456",
//       sale_price: "65465465"
//     },
//     {
//       Flavor: "Mint",
//       Strength: "750",
//       size: "3.38 oz",
//       sku: "SDGFSAGEEFD45646",
//       bar: "6dfs4g654wea6t54t6ht5b41",
//       regular_price: "56464",
//       sale_price: "654654"
//     },
//     {
//       Flavor: "Orange",
//       Strength: "300",
//       size: "3-oz",
//       sku: "647687",
//       bar: "98434nb56b63v4",
//       regular_price: "4546537",
//       sale_price: "54654654"
//     },
//     {
//       Flavor: "Orange",
//       Strength: "300",
//       size: "5-oz",
//       sku: "gfdh",
//       bar: "hiuhg",
//       regular_price: "354",
//       sale_price: "65454"
//     },
//     {
//       Flavor: "Vanilla",
//       Strength: "300",
//       size: "100-ml",
//       sku: "jkh",
//       bar: "lkj",
//       regular_price: "6465456",
//       sale_price: "546546"
//     },
//     {
//       Flavor: "Vanilla",
//       Strength: "750",
//       size: "5-oz",
//       sku: "ag24df6854",
//       bar: "5375g6f47",
//       regular_price: "35465",
//       sale_price: "654654"
//     },
//     {
//       Flavor: "Vanilla",
//       Strength: "300",
//       size: "3.2-oz",
//       sku: "sdfg5655",
//       bar: "44fsdh5464",
//       regular_price: "646554",
//       sale_price: "445"
//     },
//     {
//       Flavor: "Vanilla",
//       Strength: "300",
//       size: "16-oz",
//       sku: "sdf4g65",
//       bar: "464654",
//       regular_price: "6464654e64",
//       sale_price: "56465456"
//     },
//     {
//       Flavor: "Mint",
//       Strength: "1500",
//       size: "1.05-oz",
//       sku: "dsagf4edf",
//       bar: "gfhd54s65fdhq",
//       regular_price: "4654654",
//       sale_price: "456469"
//     },
//     {
//       Flavor: "Natural",
//       Strength: "300",
//       size: "30-ml",
//       sku: "l",
//       bar: "hj",
//       regular_price: "654",
//       sale_price: "645654"
//     },
//     {
//       Flavor: "Natural",
//       Strength: "300",
//       size: "4-oz",
//       sku: "asdfw",
//       bar: "dsafsdf",
//       regular_price: "654",
//       sale_price: "65456"
//     },
//     {
//       Flavor: "Natural",
//       Strength: "750",
//       size: "30-ml",
//       sku: "dg1a1",
//       bar: "5465g4f",
//       regular_price: "24654",
//       sale_price: "54654"
//     }
//   ],
//   categoryid: [
//     {
//       __v: 0,
//       _id: "5c64031396e557318ca9d928",
//       blockedcountries: ["Hong Kong", "Japan", "Republic of Korea", "Iceland"],
//       catdescription:
//         "Our CBD Tinctures are made with Full Spectrum THC 0.00% CBD and MCT oil ",
//       categoryid: 4,
//       categoryslug: "tinctures",
//       categorytitle: "Oils"
//     }
//   ],
//   reviews: [],
//   producttype: "variable",
//   packagingtype: "5cc40a2216300f3430662e3d",
//   vendorid: "5cadf7d854650f1c307468ea",
//   keyingredients: "",
//   allingredients: "",
//   featured: true,
//   barcode: "74578457",
//   visibilitytype: true,
//   asin: "",
//   use: "",
//   weight: null,
//   storage: "",
//   warning: "",
//   servings: "321",
//   servingsize: "321",
//   indication: "",
//   direction: "",
//   warranty: "",
//   totalcbdmg: 321,
//   cbdperunitmg: 321,
//   dsaleprice: 321,
//   dregularprice: 322,
//   productid: {
//     _id: "5d286879723c3611ad3941b1",
//     blockedcountries: null,
//     creationdate: "2019-07-11T06:18:14.616Z",
//     description:
//       "Full spectrum means you’re getting your CBD in its purest form, with absolutely no THC. Also comes in natural (no flavor added) or mint flavor.",
//     featurefilepath:
//       "public/images/uploads/500-mg-cbd-oil-natural-flavor-cbdbene-bene-1562826453963.png",
//     id: 654321,
//     producttitle: "test",
//     sdescription: "Hemp goodness with a kick",
//     sku: "500oil"
//   },
//   batch_no: 32,
//   expiry: "22/04/2019",
//   shipping_length: 1021,
//   shipping_width: 12,
//   shipping_height: 78,
//   stock_status: "instock",
//   __v: 0
// };
