import React, { Component } from "react";
import SelectMulti from "react-select";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import classNames from "classnames";
import { Helmet } from "react-helmet";
// import { ic_clear } from "react-icons-kit/md";
import {
  Alert
  // Popover, PopoverBody
} from "reactstrap";
// import classNames from "classnames";
import { getCountryName } from "../../services/extra";
import { makeCancelable } from "../../services/makeCancelable";
import {
  getTaxValueApi,
  couponCodeList,
  deleteWishList,
  addToWishListApi
} from "../../services/api";
import { selectStyle, countryList } from "../Constants";
import { HomeSliderSection, ActionModal } from "../";
import { lock } from "react-icons-kit/fa";
// import { isProductInWishList } from "../../services/extra";
import { getSingleUserApi } from "../../services/api";
// import { heart, heartO } from "react-icons-kit/fa/";
// import { filePath, qtyOptions } from "../Constants";
import {
  removeFromCart,
  modifyItem,
  setShippingCharge,
  setShippingType,
  setTax,
  setCoupon,
  setFav,
  setExpressCheckout,
  setWishList,
  setExpressPaypalCheckout
} from "../../actions";
import { Lodar } from "../";
import { imagePack } from "../Constants";
// import { getItemTotal } from "../../services/extra/cartHealpers";
import { EmptyCart } from "../cart";
import BasicFunction from "../../services/extra/basicFunction";
import SingleCartItem from "../cart/SingleCartItem";
import { projectName } from "../../constantMessage";
const basicFunction = new BasicFunction();
class Cart extends Component {
  constructor(props) {
    super(props);

    this.varientChange = this.varientChange.bind(this);
    this.flavorChange = this.flavorChange.bind(this);
    this.qtyChange = this.qtyChange.bind(this);
    this.shippingChange = this.shippingChange.bind(this);
    this.toggleTaxCol = this.toggleTaxCol.bind(this);
    this.changeTaxInValue = this.changeTaxInValue.bind(this);
    this.renderCartItem = this.renderCartItem.bind(this);
    this.renderCartContainer = this.renderCartContainer.bind(this);
    this.handleShippingTypeChange = this.handleShippingTypeChange.bind(this);
    this.isLogin = this.isLogin.bind(this);
    this.refreshSubscribeLogin = this.refreshSubscribeLogin.bind(this);
    this.changePramocode = this.changePramocode.bind(this);
    this.applypramo = this.applypramo.bind(this);
    this.couponCodeList = this.couponCodeList.bind(this);
    this.setExpressCheckout = this.setExpressCheckout.bind(this);
    this.togglePop = this.togglePop.bind(this);
    this.hartState = this.hartState.bind(this);
    this.setExpressCheckoutPaypal = this.setExpressCheckoutPaypal.bind(this);
    this.togglePop2 = this.togglePop2.bind(this);
    this.approveMerge = this.approveMerge.bind(this);
    this.discardMerge = this.discardMerge.bind(this);
    this.toggleApproveMsg = this.toggleApproveMsg.bind(this);
    this.mergeProduct = this.mergeProduct.bind(this);
    this.state = {
      shippingOptions: [],
      selectedShipping: props.cart.taxCountry,
      selectedVarient: null,
      selectedFlavor: null,
      paymetnBtnDisable: false,
      expressCheckoutPopup: false,
      expressCheckoutError: "",
      couponErr: "",
      registration_id: "",
      popoverOpen: false,
      popoverOpen2: false,
      SpinnerToggle: true,
      selectedQty: null,
      isTaxOpen: false,
      taxInValue: "",
      taxPersent: props.cart.taxPersent,
      taxValue: props.cart.taxPersent * props.cart.subTotal,
      shippingCharge: props.cart.shippingCharge || 0,
      shippingType: props.cart.shippingType || "standard",
      couponCode: "",
      shippingChargesArr: {
        standard: 0,
        express: 20,
        priority: 30
      },
      hartState: [],
      couponErrMsg: false,
      showApproveModal: false,
      isMerge: false,
      updateItemObj: {},
      paymentBtnDiableDefault: true
    };
  }
  componentDidMount() {
    this.setState({
      couponCode: this.props.cart.taxCouponCode,
      SpinnerToggle: false
    });
    const { user, location, cart } = this.props;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if (this.state.selectedShipping)
      this.getTaxPrice(this.state.selectedShipping.value);

    if (user._id) {
      this.setState({
        registration_id: user._id,
        paymetnBtnDisable: true
      });
    } else {
      this.setState({
        paymetnBtnDisable: true
      });
      this.props.cart.items.map(item => {
        if (item.subscribed) {
          this.setState({
            paymetnBtnDisable: false
          });
        }
        return null;
      });
    }

    if (!cart.taxCountry && location.countryCode) {
      this.getTaxPrice(location.countryCode);
      const CountryList = this.countrySelectOptions();
      var countyName = "";
      CountryList.map(itm => {
        if (itm.value === location.countryCode) {
          countyName = itm.label;
        }
        return null;
      });
      const selectedShipping = {
        label: countyName,
        Value: location.countryCode
      };
      this.setState({ selectedShipping });
    }

    // code for check diable payment or not

    if (user._id) {
      this.cancelUserDetail = makeCancelable(
        getSingleUserApi(user._id).then(res => {
          return res.json();
        }),
        rep => {
          if (rep.user) {
            if (
              rep.user.carddetails &&
              rep.user.carddetails.cards &&
              rep.user.carddetails.cards.length > 0 &&
              rep.user.shippingdetails &&
              rep.user.shippingdetails.address &&
              rep.user.shippingdetails.address.length > 0
            ) {
              var isDefault = false;
              rep.user.carddetails.cards.map(key => {
                if (key.isDefault) {
                  isDefault = true;
                }
                return null;
              });
              var isDefaultAddress = false;
              rep.user.shippingdetails.address.map(key => {
                if (key.isDefault) {
                  isDefaultAddress = true;
                }
                return null;
              });
              if (isDefault && isDefaultAddress) {
                this.setState({
                  paymentBtnDiableDefault: false
                });
              }
            } else {
            }
          } else {
          }
        },
        error => console.log({ error })
      );
      // getSingleUserApi(user._id)
      //   .then(res => {
      //     return res.json();
      //   })
      //   .then(rep => {
      //     if (rep.user) {
      //       if (
      //         rep.user.carddetails &&
      //         rep.user.carddetails.cards &&
      //         rep.user.carddetails.cards.length > 0 &&
      //         rep.user.shippingdetails &&
      //         rep.user.shippingdetails.address &&
      //         rep.user.shippingdetails.address.length > 0
      //       ) {
      //         var isDefault = false;
      //         rep.user.carddetails.cards.map(key => {
      //           if (key.isDefault) {
      //             isDefault = true;
      //           }
      //           return null
      //         });
      //         var isDefaultAddress = false;
      //         rep.user.shippingdetails.address.map(key => {
      //           if (key.isDefault) {
      //             isDefaultAddress = true;
      //           }
      //           return null
      //         });
      //         if (isDefault && isDefaultAddress) {
      //           this.setState({
      //             paymentBtnDiableDefault: false
      //           });
      //         }
      //       } else {
      //       }
      //     } else {
      //     }
      //   })
      //   .catch(error => {});
    }
  }
  componentWillUnmount() {
    if (this.cancelUserDetail) {
      this.cancelUserDetail();
    }
    if (this.cancelTax) {
      this.cancelTax();
    }
  }

  hartState(_id, productmainId, productDetails) {
    const removeIndex = basicFunction.checkProductInWishList(
      this.props.wishList,
      productmainId
    );
    var wishListArray = [...this.props.wishList];
    if (removeIndex || removeIndex === 0) {
      if (this.props.user._id) {
        var id = wishListArray[removeIndex].wishListId;
        deleteWishList({ id })
          .then(res => res.json())
          .then(resJson => {
            if (resJson.success) {
            }
          })
          .catch();
      }
      wishListArray.splice(removeIndex, 1);
      this.props.setWishList(wishListArray);
      this.setState({
        SpinnerToggle: false
      });
    } else {
      if (this.props.user._id) {
        const userid = this.props.user._id;
        addToWishListApi(userid, productmainId, _id)
          .then(res => res.json())
          .then(resJson2 => {
            if (resJson2.status) {
              var wishlist = "";
              const wishListRes = resJson2.wishlist;
              if (wishListRes.combo) {
                wishlist = {
                  combo: wishListRes.combo,
                  productid: wishListRes.comboid,
                  productmeta: wishListRes.comboid,
                  userid: wishListRes.userid,
                  wishListId: wishListRes._id
                };
              } else {
                wishlist = {
                  combo: wishListRes.combo,
                  productid: wishListRes.productid,
                  productmeta: wishListRes.productmeta,
                  userid: wishListRes.userid,
                  wishListId: wishListRes._id
                };
              }

              this.props.setWishList([...wishListArray, wishlist]);
              this.setState({
                SpinnerToggle: false
              });
            }
          })
          .catch(err => {});
      } else {
        const wishListDetails = {
          productmeta: _id,
          productid: productmainId,
          productDetails: productDetails
        };

        this.props.setWishList([...wishListArray, wishListDetails]);
      }
    }
  }

  togglePop() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }
  togglePop2() {
    this.setState({
      popoverOpen2: !this.state.popoverOpen2
    });
  }
  toggleApproveMsg() {
    this.setState(prevState => ({
      showApproveModal: !prevState.showApproveModal
    }));
  }
  approveMerge() {
    this.setState({
      isMerge: true
    });
    const { updateItemObj } = this.state;
    this.mergeProduct(
      updateItemObj.oldItem,
      updateItemObj.newItem,
      updateItemObj.item
    );
    this.toggleApproveMsg();
  }
  discardMerge() {
    this.toggleApproveMsg();
  }
  couponCodeList() {}
  modifyItemLocal = ({ oldItem, newItem }) => {
    const { user, cart } = this.props;
    this.props.modifyItem(
      {
        oldItem,
        newItem
      },
      cart,
      user.userMetaId
    );
  };
  mergeProduct(oldItem, newItem, item) {
    if (oldItem && newItem && item) {
      this.modifyItemLocal({
        oldItem,
        newItem
      });
      this.removeProduct(item);
    }
  }
  setExpressCheckoutPaypal() {
    this.props.setExpressPaypalCheckout(true);
    this.props.history.push(`/${this.props.location.countryCode}/checkout/`);
    // getSingleUserApi(this.state.registration_id)
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(rep => {
    //     if (rep.user) {
    //       if (
    //         rep.user.carddetails &&
    //         rep.user.billingdetails &&
    //         rep.user.expresscheckout
    //       ) {
    //         this.props.setExpressPaypalCheckout(true);
    //         this.props.history.push(
    //           `/${this.props.location.countryCode}/checkout/`
    //         );
    //       } else {
    //         this.setState({
    //           expressCheckoutPopup: true,
    //           expressCheckoutError:
    //             "Save your billing address and payment details for express checkout"
    //         });
    //       }
    //     } else {
    //       this.setState({
    //         expressCheckoutPopup: true,
    //         expressCheckoutError:
    //           "Save your billing address and payment details for express checkout"
    //       });
    //     }
    //   })
    //   .catch(error => {});
  }
  setExpressCheckout() {
    this.props.setExpressCheckout(true);
    this.props.history.push(`/${this.props.location.countryCode}/checkout/`);

    // getSingleUserApi(this.state.registration_id)
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(rep => {
    //     if (rep.user) {
    //       if (
    //         rep.user.carddetails &&
    //         rep.user.billingdetails &&
    //         rep.user.expresscheckout
    //       ) {

    //       } else {
    //         this.setState({
    //           expressCheckoutPopup: true,
    //           expressCheckoutError:
    //             "Save your billing address and payment details for express checkout"
    //         });
    //       }
    //     } else {
    //       this.setState({
    //         expressCheckoutPopup: true,
    //         expressCheckoutError:
    //           "Save your billing address and payment details for express checkout"
    //       });
    //     }
    //   })
    //   .catch(error => {});
  }
  applypramo() {
    if (this.state.couponCode && this.state.couponCode.length > 3) {
      this.setState({
        couponErr: null
      });
      couponCodeList()
        .then(res => res.json())
        .then(resJson => {
          if (resJson.status) {
            const codeList = resJson.coupon.data;
            var applyCode = false;
            // var discount=0;
            if (codeList.length > 0) {
              const clientCode = this.state.couponCode;
              //  var couponsResponse=false;
              codeList.map((code, index) => {
                if (code.id === clientCode && code.valid) {
                  this.setState({
                    couponErrMsg: "success",
                    couponErr: "Coupon code ' " + clientCode + " ' was applied"
                  });
                  applyCode = true;
                  // discount=code.percent_off
                  this.props.setCoupon(
                    {
                      taxCouponCode: code.id,
                      taxCouponDiscount: code.percent_off
                    },
                    this.props.cart,
                    this.props.user.userMetaId
                  );
                }
                return null;
              });
            }
            if (applyCode === false) {
              this.setState({
                couponErrMsg: "fail",
                couponErr:
                  "The coupon code  you entered does not exist on this store."
              });
            }
          }
        });
    } else {
      this.setState({
        couponErr: "Coupon code should be 4 digit"
      });
    }
  }
  changePramocode(e) {
    const value = e.target.value;

    this.setState({
      couponCode: value
    });
    if (this.state.couponCode && this.state.couponCode.length >= 3) {
      this.setState({
        couponErr: null
      });
    }
  }
  isLogin() {
    if (this.props.user._id) {
      return 1;
    } else {
      return 0;
    }
  }

  refreshSubscribeLogin() {
    if (this.props.user._id) {
      this.setState({
        paymetnBtnDisable: true
      });
    } else {
      this.setState({
        paymetnBtnDisable: true
      });
      this.props.cart.items.map(item => {
        if (item.subscribed) {
          this.setState({
            paymetnBtnDisable: false
          });
        }
        return null;
      });
    }
  }
  removeProduct(item) {
    const { user, cart } = this.props;
    this.props.removeFromCart(item, cart, user.userMetaId);
    setTimeout(this.refreshSubscribeLogin, 300);
  }

  shippingChange = selectedShipping => {
    this.setState({ selectedShipping }, () => {
      this.getTaxPrice(selectedShipping.value);
    });
  };
  varientChange = selectedVarient => {
    this.setState({ selectedVarient });
  };
  flavorChange = selectedFlavor => {
    this.setState({ selectedFlavor });
  };
  qtyChange = selectedQty => {
    this.setState({ selectedQty });
  };
  handleShippingTypeChange(e) {
    const { setShippingCharge, setShippingType } = this.props;
    const shippingCharge = this.state.shippingChargesArr[
      e.target.attributes["data-value"].nodeValue
    ];
    const shippingType = e.target.attributes["data-value"].nodeValue;
    this.setState({
      shippingType: e.target.attributes["data-value"].nodeValue,
      shippingCharge
    });
    setShippingCharge(
      shippingCharge,
      this.props.cart,
      this.props.user.userMetaId
    );
    setShippingType(shippingType, this.props.cart, this.props.user.userMetaId);
  }
  toggleTaxCol() {
    this.setState(prevState => ({
      isTaxOpen: !prevState.isTaxOpen
    }));
  }
  changeTaxInValue(e) {
    this.setState({
      taxInValue: e.target.value
    });
  }
  countrySelectOptions() {
    const newCountryList = countryList.map(el => {
      return {
        label: el.title,
        value: el.code
      };
    });
    return newCountryList;
  }

  myArrFilter(fullArr, key, value) {
    let returnVal = fullArr
      .map(el => {
        if (el) {
          if (el[key] === value) return el;
        }
        return null;
      })
      .filter(el => el);
    if (returnVal) return returnVal;
  }
  changeVariations(e, names, item, indexingNo) {
    if (names === "qty") {
      this.modifyItemLocal({
        oldItem: item,
        newItem: { ...item, [names]: e }
      });
    } else {
      const totalVarition = item.attributes
        .map(el => (el ? el.names : null))
        .filter(el => el);

      const foundItem = this.props.cart.items.find((el, index) => {
        const innerFlag = totalVarition
          .map(varEl => {
            if (el[varEl]) {
              if (varEl === names) {
                return el[varEl].value === e.value;
              }
              return el[varEl].value === item[varEl].value;
            } else {
              return null;
            }
          })
          .filter(el => el !== null);

        console.log({
          el: el.productid,
          item: item.productid
        });

        return (
          el.productid._id === item.productid._id &&
          innerFlag.every(el => el) &&
          index !== indexingNo
        );
      });
      if (foundItem !== undefined && foundItem !== null) {
        const totalQty =
          parseInt(foundItem.qty.value) + parseInt(item.qty.value);
        const qty = {
          label: totalQty.toString(),
          value: totalQty.toString()
        };

        if (item.subscribed || foundItem.subscribed) {
          this.setState({
            showApproveModal: true,
            updateItemObj: {
              oldItem: foundItem,
              newItem: {
                ...foundItem,
                [names]: e,
                qty,
                subscribed: true,
                subscribedDiscountPersent: item.subscribedDiscountPersent,
                subscribedTime: item.subscribedTime
              },
              item
            }
          });
        } else {
          this.modifyItemLocal({
            oldItem: foundItem,
            newItem: {
              ...foundItem,
              [names]: e,
              qty
            }
          });
          this.removeProduct(item);
        }
      } else {
        this.modifyItemLocal({
          oldItem: item,
          newItem: { ...item, [names]: e }
        });
      }
    }
  }
  renderVariation(item, indexVAlue) {
    let varientOption = [];
    if (item.producttype === "variable") {
      varientOption = item.attributes.filter(el => {
        if (el) {
          const { names, values } = el;
          return names !== null && values !== null;
        }
        return false;
      });
    }
    return varientOption.map((el, index) => {
      if (el) {
        const { names, values } = el;
        let options = values.map(newEl => {
          return {
            label: newEl.replace(/_/g, " "),
            value: newEl
          };
        });

        return (
          <div
            key={index}
            className={`pt-3  pl-2 pr-2 selector-wrapper animated ${names}-select-box cart-item-select-box`}
          >
            <label>
              {names === "extract_flavor" ? "Extract Flavor" : names}{" "}
            </label>
            {options.length === 1 ? (
              <SelectMulti
                id={names}
                styles={selectStyle}
                value={item[names]}
                isMulti={false}
                placeholder={names}
                onChange={e => {
                  this.changeVariations(e, names, item, indexVAlue);
                }}
                isDisabled={true}
                options={options}
              />
            ) : (
              <SelectMulti
                id={names}
                styles={selectStyle}
                value={item[names]}
                isMulti={false}
                placeholder={names}
                onChange={e => {
                  this.changeVariations(e, names, item, indexVAlue);
                }}
                options={options}
              />
            )}
          </div>
        );
      }
      return null;
    });
  }

  returnPrice(saleprice, regularprice) {
    let price = ``;
    if (saleprice) price = `$${saleprice}`;
    else if (regularprice) price = `$${regularprice}`;

    return price;
  }

  renderCartItem(items) {
    // const {
    //   props: { location }
    // } = this;
    return items.map((item, index) => {
      const {
        productid,
        combo,
        // subscribed,
        _id
        // subscribedDiscountPersent
      } = item;

      const productmainId = combo ? item._id : item.productid._id;
      const productDetails = {
        productName: combo ? item.title : productid.producttitle,
        mainImage: combo ? item.featureimage : productid.featurefilepath
      };
      // var discountSubcriptionPrice = 0;
      // if (subscribed) {
      //   const total = getItemTotal(item);
      //   discountSubcriptionPrice = (total * subscribedDiscountPersent) / 100;
      //   discountSubcriptionPrice =
      //     parseFloat(total) - parseFloat(discountSubcriptionPrice);
      // }
      return (
        <SingleCartItem
          item={item}
          onHeartClick={() => {
            this.hartState(_id, productmainId, productDetails);
          }}
          indexNumber={index}
          key={index}
        />
      );
    });
  }
  getCartPrice(extra = 0) {
    const { cart } = this.props;
    if (!cart) return 0;
    return (
      cart.subTotal +
      cart.taxPersent * cart.subTotal +
      // cart.shippingCharge +
      extra
    );

    // return 0;
  }
  getTaxPrice(countryCode = this.props.location.countryCode) {
    this.cancelTax = makeCancelable(
      getTaxValueApi(countryCode).then(res => res.json()),
      resJson => {
        const { cart } = this.props;
        this.setState(
          {
            taxPersent: resJson.rate,
            taxValue: resJson.rate * cart.subTotal
          },
          () => {
            this.props.setTax(
              {
                taxPersent: resJson.rate,
                taxCountry: this.state.selectedShipping
              },
              this.props.cart,
              this.props.user.userMetaId
            );
          }
        );
      },
      err => console.log({ err })
    );
    getTaxValueApi(countryCode)
      .then(res => res.json())
      .then(resJson => {
        const { cart } = this.props;
        this.setState(
          {
            taxPersent: resJson.rate,
            taxValue: resJson.rate * cart.subTotal
          },
          () => {
            this.props.setTax(
              {
                taxPersent: resJson.rate,
                taxCountry: this.state.selectedShipping
              },
              this.props.cart,
              this.props.user.userMetaId
            );
          }
        );
      });
  }
  renderCartContainer() {
    const {
      state: {
        selectedShipping,
        // shippingCharge,
        // shippingType,
        couponErrMsg
        // paymentBtnDiableDefault
      },
      props: { cart, location }
    } = this;
    const { norton, bbb, mcafee, truste, trustWave, thawte } = imagePack;
    const TaxgrandTotal = this.state.taxPersent * this.props.cart.subTotal;
    const checkoutPage = `/${location.countryCode}/checkout/`;
    const shopPage = `/${location.countryCode}/shop/`;
    const discount = (cart.taxCouponDiscount * cart.subTotal) / 100;

    return (
      <div className="cart-page-container pt-2">
        <div className="container-extend">
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-heading">
                <h3 className="MCItemCarouselIntro-title">
                  My Bag ({cart ? cart.items.length : 0})
                </h3>
                <p className="sm-title">Product</p>
                <div className="cart-product-header" />
              </div>
              <div className="cart-product-container">
                <div className="cart-product-inner">
                  <div className="cart-product-body">
                    <div className="cart-product-list">
                      {this.renderCartItem(cart ? cart.items : [])}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 offset-xl-1 col-lg-4">
              <div className="order-summary-wrapper">
                <div className="cart-heading">
                  <h3 className="sm-title">ORDER SUMMARY</h3>
                </div>
                <div className="order-summary-form">
                  <form
                    onSubmit={e => {
                      e.preventDafault();
                    }}
                  >
                    <div className="order-summary-row lr">
                      <p className="order-summary-label small">SUBTOTAL</p>
                      <p className="value small">
                        {basicFunction.currancyAddWithNumber(cart.subTotal)}
                      </p>
                    </div>

                    <div className="order-summary-row lr nbr">
                      <p className="order-summary-label small">ESTIMATED TAX</p>
                      <p className="value small">
                        {basicFunction.currancyAddWithNumber(TaxgrandTotal)}{" "}
                      </p>
                    </div>

                    <div className="order-summary-row">
                      <div>
                        <SelectMulti
                          id={"selectedQty"}
                          styles={selectStyle}
                          value={selectedShipping}
                          isMulti={false}
                          input={false}
                          placeholder={"Select Country"}
                          onChange={this.shippingChange}
                          // options={shippingOptions}
                          options={this.countrySelectOptions()}
                        />
                      </div>
                    </div>

                    {/* <div className="order-summary-row lr nbr">
                      <p className="order-summary-label small">SHIPPING</p>
                      <p className="value small">
                        {basicFunction.currancyAddWithNumber(shippingCharge)}
                      </p>
                    </div> */}
                    {/* <div className="order-summary-row lr">
                      <div className="option-selector">
                        <div className="has-input has-checkbox-input">
                          <input
                            type="checkbox"
                            checked={shippingType === "standard"}
                            id="standardShipping"
                            data-value="standard"
                            name={"shippingType"}
                            onChange={this.handleShippingTypeChange}
                          />
                          <label htmlFor="standardShipping">
                            <span
                              className={classNames("CheckIcon", {
                                checked: shippingType === "standard"
                              })}
                            />
                            {"Free! - "}Standard Shipping
                          </label>
                          <input
                            type="checkbox"
                            checked={shippingType === "express"}
                            id="expressShipping"
                            data-value="express"
                            name={"shippingType"}
                            onChange={this.handleShippingTypeChange}
                          />
                          <label htmlFor="expressShipping">
                            <span
                              className={classNames("CheckIcon", {
                                checked: shippingType === "express"
                              })}
                            />
                            {`$20.00 USD- `}Express Shipping
                          </label>
                          <input
                            type="checkbox"
                            checked={shippingType === "priority"}
                            id="priorityShipping"
                            data-value="priority"
                            name={"shippingType"}
                            onChange={this.handleShippingTypeChange}
                          />
                          <label htmlFor="priorityShipping">
                            <span
                              className={classNames("CheckIcon", {
                                checked: shippingType === "priority"
                              })}
                            />
                            {`$30.00 USD- `}Priority Shipping
                          </label>
                        </div>
                      </div>
                    </div> */}
                    {discount && discount > 0 ? (
                      <div className="order-summary-row lr">
                        <p className="order-summary-label small">DISCOUNT</p>
                        <p className="value small">
                          {basicFunction.currancyAddWithNumber(discount)}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="order-summary-row lr nbr">
                      <p className="order-summary-label small">
                        <b>GRAND TOTAL </b>
                      </p>
                      <p className="value small">
                        <b>
                          {basicFunction.currancyAddWithNumber(
                            this.getCartPrice() - discount
                          )}
                        </b>
                      </p>
                    </div>
                    {this.state.couponErr ? (
                      <p
                        className={
                          couponErrMsg === "success"
                            ? "alert alert-success"
                            : "alert alert-danger"
                        }
                      >
                        {this.state.couponErr}
                      </p>
                    ) : (
                      ""
                    )}
                    <div className="order-summary-row lr nbr has-input d-flex">
                      {/* <label className="order-summary-label">Coupon Code</label> */}
                      <input
                        type="text"
                        value={this.state.couponCode}
                        onChange={this.changePramocode}
                        style={{ width: "calc(100% - 100px)" }}
                        placeholder=" Coupon Code"
                        maxLength="10"
                      />
                      <span
                        className="mycoupanapply btn1"
                        onClick={this.applypramo}
                      >
                        Apply
                      </span>
                    </div>

                    {this.state.paymetnBtnDisable ? (
                      <div className="order-summary-row order-summary-footer">
                        <div className="order-summary-btns">
                          <Link to={checkoutPage}>
                            <span className="w-100 or-btn btn-icon btn5">
                              Checkout
                            </span>
                          </Link>
                          {/* {this.isLogin() ? (
                            <div>
                              {paymentBtnDiableDefault ? (
                                <div>
                                  <span id="Popover2">
                                    <span
                                      className="or-btn w-100 btn-icon  cusrsorDisable btn3"
                                      onMouseOver={this.togglePop2}
                                      onMouseLeave={this.togglePop2}
                                    >
                                      Paypal
                                    </span>
                                  </span>

                                  <Popover
                                    placement="bottom"
                                    isOpen={this.state.popoverOpen2}
                                    target="Popover2"
                                    // toggle={this.togglePop2}
                                  >
                                    <PopoverBody>
                                      <p className="text-center">
                                        Save your billing address and payment
                                        details for express checkout
                                      </p>{" "}
                                    </PopoverBody>
                                  </Popover>
                                </div>
                              ) : (
                                <div>
                                  <span
                                    onClick={this.setExpressCheckoutPaypal}
                                    id="Popover2"
                                  >
                                    <span className="w-100 or-btn  btn-icon btn3">
                                      Paypal
                                    </span>
                                  </span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <span
                                // onClick={this.setExpressCheckoutPaypal}
                                id="Popover2"
                              >
                                <span
                                  className="or-btn w-100 btn-icon  cusrsorDisable btn3"
                                  onMouseOver={this.togglePop2}
                                  onMouseLeave={this.togglePop2}
                                >
                                  Paypal
                                </span>
                              </span>

                              <Popover
                                placement="bottom"
                                isOpen={this.state.popoverOpen2}
                                target="Popover2"
                                toggle={this.togglePop2}
                              >
                                <PopoverBody>
                                  <p className="text-center">
                                    To enable Paypal Express Checkout, first
                                    sign in or create an account.
                                  </p>{" "}
                                </PopoverBody>
                              </Popover>
                            </div>
                          )} */}
                          {/* {this.isLogin() ? (
                            <div>
                              {paymentBtnDiableDefault ? (
                                <div>
                                  <span
                                    className=" cusrsorDisable w-100 btn8"
                                    onMouseOver={this.togglePop}
                                    onMouseLeave={this.togglePop}
                                    id="Popover1"
                                  >
                                    <Icon icon={lock} /> Express
                                  </span>
                                  <Popover
                                    placement="bottom"
                                    isOpen={this.state.popoverOpen}
                                    target="Popover1"
                                    toggle={this.togglePop}
                                  >
                                    <PopoverBody>
                                      <p className="text-center">
                                        Save your billing address and payment
                                        details for express checkout
                                      </p>
                                    </PopoverBody>
                                  </Popover>
                                </div>
                              ) : (
                                <div>
                                  <span
                                    onClick={this.setExpressCheckout}
                                    id="Popover1"
                                  >
                                    <span className="w-100 or-btn  btn-icon btn8">
                                      Express
                                    </span>
                                  </span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <span
                                className=" cusrsorDisable w-100 btn8"
                                onMouseOver={this.togglePop}
                                onMouseLeave={this.togglePop}
                                id="Popover1"
                              >
                                <Icon icon={lock} /> Express
                              </span>
                              <Popover
                                placement="bottom"
                                isOpen={this.state.popoverOpen}
                                target="Popover1"
                                toggle={this.togglePop}
                              >
                                <PopoverBody>
                                  <p className="text-center">
                                    To enable Express Checkout, first sign in or
                                    create an account.
                                  </p>
                                </PopoverBody>
                              </Popover>
                            </div>
                          )} */}

                          <Link to={shopPage}>
                            <span className="btn w-100 or-btn btn-outline-shopping btn-icon">
                              Continue Shopping
                            </span>
                          </Link>
                        </div>
                        <div className="text-center secure-image">
                          <img
                            src={norton}
                            alt="norton"
                            className="img-fluid "
                          />
                        </div>

                        <div className="text-center secure-image m-10">
                          <img
                            src={mcafee}
                            alt="mcafee"
                            className="img-fluid "
                          />
                        </div>
                        <div className="text-center secure-image ">
                          <img src={bbb} alt="secure" className="img-fluid " />
                        </div>
                        <div className="text-center secure-image">
                          <img
                            src={truste}
                            alt="TRUSTe1"
                            className="img-fluid "
                          />
                        </div>
                        <div className="text-center secure-image">
                          <img
                            src={trustWave}
                            alt="trust wave"
                            className="img-fluid "
                          />
                        </div>
                        <div className="text-center secure-image">
                          <img
                            src={thawte}
                            alt="secure"
                            className="img-fluid "
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="order-summary-row order-summary-footer">
                        <Alert color="danger">
                          <Icon icon={lock} /> You can't subscribe to a product
                          without logging in.
                        </Alert>
                        <div
                          className="order-summary-btns"
                          style={{ opacity: "0.2" }}
                        >
                          <Link to="#" disable="true">
                            <span className="btn or-btn btn-red btn-icon ">
                              Checkout
                            </span>
                          </Link>

                          {/* <PaypalBtn total={this.getCartPrice()} /> */}
                          <span className="btn or-btn btn-light-grey btn-icon" />
                          <Link to="#">
                            <span className="btn or-btn btn-outline-shopping btn-icon">
                              Continue Shopping
                            </span>
                          </Link>
                        </div>
                        <div className="text-center">
                          <img
                            src={norton}
                            alt="secure"
                            className="img-fluid "
                          />
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  isVisible(featured, visibilitytype, blockedcountries) {
    let result = false;
    if (featured === true) {
      if (visibilitytype === true) {
        if (blockedcountries) {
          if (
            !blockedcountries.includes(
              getCountryName(this.props.location.countryCode)
            )
          ) {
            result = true;
          }
        } else {
          result = true;
        }
      }
    }
    return result;
  }
  render() {
    const { cart, location, products, className } = this.props;
    const { showApproveModal } = this.state;
    const productPage = `/${location.countryCode}/shop/`;

    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <Helmet>
          <title>{projectName} | My Bag</title>
        </Helmet>
        {this.state.SpinnerToggle && <Lodar />}
        {cart.items.length > 0 && this.renderCartContainer()}
        {cart.items.length <= 0 && (
          <EmptyCart>
            <Link to={productPage}>
              <span className="btn w25 m-auto or-btn btn-outline-shopping btn-icon">
                CONTINUE SHOPPING
              </span>
            </Link>
          </EmptyCart>
        )}
        <div className="text-center">
          <br />
          <br />
          <br />
          {products.featured.length > 0 && (
            <h3 className="MCItemCarouselIntro-title">
              Other top rated products
            </h3>
          )}
        </div>
        {products.featured.length > 0 && (
          <HomeSliderSection productArr={products.featured} noTitle={true} />
        )}
        <ActionModal
          isOpen={showApproveModal}
          toggle={this.toggleApproveMsg}
          onAccept={this.approveMerge}
          onReject={this.discardMerge}
        >
          <p className="text-center pl-5 pr-5 MCItemCarouselIntro-title">
            There is already a similar product in your cart. Do you want to
            merge it with the susbscribed product?
          </p>
        </ActionModal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart,
  location: state.location,
  wishList: state.wishList,
  products: state.products
});
export default connect(
  mapStateToProps,
  {
    removeFromCart,
    modifyItem,
    setShippingCharge,
    setShippingType,
    setTax,
    setCoupon,
    setFav,
    setExpressCheckout,
    setWishList,
    setExpressPaypalCheckout
  }
)(Cart);
