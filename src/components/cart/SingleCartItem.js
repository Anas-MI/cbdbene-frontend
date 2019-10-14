import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { ic_clear } from "react-icons-kit/md";
import { heart, heartO } from "react-icons-kit/fa/";
import { connect } from "react-redux";
import SelectMulti from "react-select";
import {
  filePath,
  // qtyOptions,
  selectStyle
} from "../Constants";
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
import {
  isProductInWishList,
  findByMatchingProperties,
  removeDuplicateObjAr
} from "../../services/extra";
import { getItemTotal } from "../../services/extra/cartHealpers";
import BasicFunction from "../../services/extra/basicFunction";
const basicFunction = new BasicFunction();

class SingleCartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialIndex: 0
    };
  }
  componentDidMount() {
    this.variationInit();
  }

  removeProduct = item => {
    const { user, cart } = this.props;
    this.props.removeFromCart(item, cart, user.userMetaId);
    setTimeout(this.refreshSubscribeLogin, 300);
  };
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
  variationInit = () => {
    const {
      item: { visibleAttrList, verifiedAttr },
      item
    } = this.props;
    if (visibleAttrList) {
      visibleAttrList.forEach((el, index) => {
        if (index === 0) {
          this.setState({
            [el.names + "_options"]: el.values.map(el => ({
              value: el,
              label: el
            }))
          });
        } else {
          const newValAtt = visibleAttrList
            .map((el, index) => {
              if (
                item[el.names] &&
                item[el.names].value // && index !== 0
              )
                return {
                  names: el.names,
                  values: item[el.names].value
                };
              else return null;
            })
            .filter(el => el);
          visibleAttrList.forEach((el, atIndex) => {
            const newVal = findByMatchingProperties(
              verifiedAttr,
              newValAtt
                .map((el, index) => (index < atIndex ? el : null))
                .filter(el => el)
            );
            console.log({ newVal, verifiedAttr, newValAtt });
            // if (atIndex !== 0) {
            this.setState({
              [el.names + "_options"]: removeDuplicateObjAr(
                newVal.map(elx => ({
                  label: elx[el.names],
                  value: elx[el.names]
                }))
              )
            });
            // }
          });
        }
      });
    }
  };
  returnPrice(saleprice, regularprice) {
    let price = ``;
    if (saleprice) price = `$${saleprice}`;
    else if (regularprice) price = `$${regularprice}`;

    return price;
  }
  changeVariations = (e, names, item, indexingNo) => {
    console.log({
      e,
      names,
      item,
      indexingNo
    });
    if (names === "qty") {
      this.modifyItemLocal({
        oldItem: item,
        newItem: { ...item, [names]: e }
      });
    } else {
      console.log(this.getModifiedItem(e, names, item), "------");
      this.getModifiedItem(e, names, item).then(res => {
        console.log({ res });
        this.modifyItem(item, res, indexingNo, this.props.cart);
      });
    }
  };
  getModifiedItem = async (e, names, item) => {
    console.log("getModifiedItem", { e, names, item });
    const { verifiedAttr, visibleAttrList } = item;
    const currentIndex = visibleAttrList.findIndex(el => el.names === names);

    let itemNew = {
      ...item,
      [names]: e
    };
    await visibleAttrList.forEach((el, index) => {
      const newValAtt = visibleAttrList
        .map(el => {
          if (item[el.names] && item[el.names].value) {
            if (el.names === names) {
              return {
                names: el.names,
                values: e.value
              };
            }
            return {
              names: el.names,
              values: item[el.names].value
            };
          } else return null;
        })
        .filter(el => el);
      if (index > currentIndex) {
        const newVal = findByMatchingProperties(
          verifiedAttr,
          newValAtt
            .map((el, index) => {
              console.log({
                index,
                currentIndex,
                flag: currentIndex >= index,
                el,
                newValAtt
              });
              return currentIndex >= index ? el : null;
            })
            .filter(el => el)
        );
        console.log({ newVal });
        const availableValues = removeDuplicateObjAr(
          newVal.map(elx => ({
            label: elx[el.names],
            value: elx[el.names]
          }))
        );

        if (item[el.names]) {
          const found = availableValues.find(elx => {
            console.log({
              elx,
              item: item[el.names]
            });
            return elx.value === item[el.names].value;
          });
          console.log({
            name: el.names,
            found
          });
          if (!found) {
            this.setState(
              {
                [`${el.names}_options`]: availableValues
              },
              () => {
                // console.log("asdfasdf", { indexingNo })

                console.log({
                  _______A: el.names,
                  availableValues
                });

                itemNew = {
                  ...itemNew,
                  [el.names]: availableValues[0]
                };
                // this.changeVariations(availableValues[0], el.names, item, indexingNo)
              }
            );
          } else {
            this.setState(
              {
                [`${el.names}_options`]: availableValues
              },
              () => {
                // console.log({
                //   _______A:el.names
                // });
                // itemNew = {
                //   ...itemNew,
                //   [el.names]: {
                //     names: names,
                //     values: e.value
                //   }
                // }
              }
            );
          }
        } else {
          this.setState(
            {
              [`${el.names}_options`]: availableValues
            },
            () => {
              console.log({
                _______A: el.names,
                availableValues
              });

              itemNew = {
                ...itemNew,
                [el.names]: availableValues[0]
              };
            }
          );
        }
      }
    });
    console.log({
      itemNew,
      item
    });

    return await itemNew;
  };
  modifyItem = (oldItem, NewItem, currentIndex, cart) => {
    const foundItem = cart.items.find((el, index) => {
      if (el._id === NewItem._id && index !== currentIndex) {
        const flag = NewItem.visibleAttrList.every((elx, index) => {
          console.log(index);
          console.log({
            elN: el[elx.names].value,
            newN: NewItem[elx.names].value,
            list: NewItem.visibleAttrList
          });
          return el[elx.names].value === NewItem[elx.names].value;
        });

        console.log({
          flag
        });
        return flag;
      }
      return false;
    });

    if (foundItem !== undefined && foundItem !== null) {
      const totalQty =
        parseInt(foundItem.qty.value) + parseInt(oldItem.qty.value);
      const qty = {
        label: totalQty.toString(),
        value: totalQty.toString()
      };

      if (oldItem.subscribed || foundItem.subscribed) {
        this.setState({
          showApproveModal: true,
          updateItemObj: {
            oldItem: foundItem,
            newItem: {
              ...foundItem,
              qty,
              subscribed: true,
              subscribedDiscountPersent: oldItem.subscribedDiscountPersent,
              subscribedTime: oldItem.subscribedTime
            },
            item: oldItem
          }
        });
      } else {
        this.modifyItemLocal({
          oldItem: foundItem,
          newItem: {
            ...foundItem,
            qty
          }
        });
        this.removeProduct(oldItem);
      }
    } else {
      this.modifyItemLocal({
        oldItem: oldItem,
        newItem: NewItem
      });
    }
  };
  performChange = (e, names, item, indexingNo) => {
    const foundItem = this.props.cart.items.find((el, index) => {
      const innerFlag = item.visibleAttrList
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
      const totalQty = parseInt(foundItem.qty.value) + parseInt(item.qty.value);
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
  };
  renderVariation = (item, indexValue) => {
    // let variantOption = [];
    const { visibleAttrList, _id } = item;
    // if (item.producttype === "variable") {
    //   variantOption = item.attributes.filter(el => {
    //     if (el) {
    //       const { names, values } = el;
    //       return names !== null && values !== null;
    //     }
    //     return false;
    //   });
    // }
    if (!visibleAttrList) return null;

    return visibleAttrList.map((el, index) => {
      const {
        names
        // values
      } = el;
      
      return (
        <div
          key={index}
          className={`pt-3  pl-2 pr-2 selector-wrapper animated ${names}-select-box cart-item-select-box`}
        >
          <label>{names && names.replace(/_/g, " ")}</label>
          {
            //this.state[names + "_options"].length > 1 ?
            <SelectMulti
              id={names + _id}
              styles={selectStyle}
              value={item[names]}
              isMulti={false}
              placeholder={names}
              isDisabled={!(this.state[names + "_options"] && this.state[names + "_options"].length > 1)}
              onChange={e => {
                this.changeVariations(e, names, item, indexValue);
              }}
              options={this.state[names + "_options"]}
            /> //:
            //<p>{item[names] ? item[names].label : ""}</p>
          }
        </div>
      );
    });
    // return variantOption.map((el, index) => {
    //   if (el) {
    //     const { names, values } = el;
    //     let options = values.map(newEl => {
    //       return {
    //         label: newEl.replace(/_/g, " "),
    //         value: newEl
    //       };
    //     });

    //     return (
    //       <div
    //         key={index}
    //         className={`pt-3  pl-2 pr-2 selector-wrapper animated ${names}-select-box cart-item-select-box`}
    //       >
    //         <label>
    //           {names === "extract_flavor" ? "Extract Flavor" : names}{" "}
    //         </label>
    //         {options.length === 1 ? (
    //           <SelectMulti
    //             id={names}
    //             styles={selectStyle}
    //             value={item[names]}
    //             isMulti={false}
    //             placeholder={names}
    //             onChange={e => {
    //               this.changeVariations(e, names, item, indexValue);
    //             }}
    //             isDisabled={true}
    //             options={options}
    //           />
    //         ) : (
    //             <SelectMulti
    //               id={names}
    //               styles={selectStyle}
    //               value={item[names]}
    //               isMulti={false}
    //               placeholder={names}
    //               onChange={e => {
    //                 this.changeVariations(e, names, item, indexValue);
    //               }}
    //               options={options}
    //             />
    //           )}
    //       </div>
    //     );
    //   }
    //   return null;
    // });
  };
  render() {
    const {
      // onRemove,
      onHeartClick,
      item,
      location,
      indexNumber
    } = this.props;

    const {
      regularprice,
      saleprice,
      _id,
      productSlug,
      qty,
      productid,
      combo,
      subscribed,
      subscribedDiscountPersent
    } = item;
    const productDetails = {
      productName: combo ? item.title : productid.producttitle,
      mainImage: combo ? item.featureimage : productid.menuimage,
      menuImage:
        (item.productid && item.productid.menuimage) || item.featureimage
    };
    var discountSubcriptionPrice = 0;
    if (subscribed) {
      const total = getItemTotal(item);
      discountSubcriptionPrice = (total * subscribedDiscountPersent) / 100;
      discountSubcriptionPrice =
        parseFloat(total) - parseFloat(discountSubcriptionPrice);
    }
    return (
      <div className="cart-product-div">
        <div
          className="cart-product-remove"
          onClick={() => {
            this.removeProduct(item);
          }}
        >
          <Icon icon={ic_clear} />
        </div>
        <div className="cart-product-image-wrap">
          <span onClick={onHeartClick} className="heart-right">
            {isProductInWishList(_id, this.props.wishList) ? (
              <Icon icon={heart} className="favHeart" />
            ) : (
              <Icon icon={heartO} />
            )}
          </span>
          <Link to={`/${location.countryCode}/shop/${productSlug}`}>
            {productDetails.menuImage && (
              <img src={filePath + productDetails.menuImage} alt="product" />
            )}
          </Link>
          <div className="cart-product-price">
            {/* <p>
              <strike>
                {saleprice &&
                  basicFunction.currancyAddWithNumber(regularprice | 0)}{" "}
              </strike>
            </p> */}
            <p><b>{this.returnPrice(saleprice, regularprice)}</b></p>
          </div>
        </div>
        <div className="cart-product-detail">
          <div className="cart-product-name">
            <Link to={`/${location.countryCode}/shop/${productSlug}`}>
              {productDetails.productName}
            </Link>
          </div>
          <div className="product-options">
            <div className="col-12">
              <div className="row">
                <div className="col-xl-9">
                  <div className="row">
                    <div className="pt-3 pl-2 pr-2 cart-item-select-box qty-select-box">
                      <label>Quantity</label>
                      <SelectMulti
                        id={"selectedQty"}
                        styles={selectStyle}
                        value={qty}
                        isMulti={false}
                        input={false}
                        placeholder={"Qty"}
                        onChange={e => {
                          this.changeVariations(e, "qty", item, indexNumber);
                        }}
                        className="margin-top-5"
                        options={basicFunction.qtyList(qty.value)}
                      />
                    </div>
                    {this.renderVariation(item, indexNumber)}
                  </div>
                </div>
                <div className="col-xl-3">
                  <div className="p-0 product-info ">
                    {subscribed ? (
                      <p className="product-info-price text-right">
                        {/* <strike>
                          $
                          {basicFunction.nombarFormat(getItemTotal(item)) ||
                            basicFunction.nombarFormat(getItemTotal(0))}
                        </strike> */}
                        
                        {/* <br /> */}
                        <b>
                          ${" "}
                          {basicFunction.nombarFormat(discountSubcriptionPrice)}{" "}
                        </b><span>
                          {"  "}({subscribedDiscountPersent}% off)
                        </span>
                      </p>
                    ) : (
                      <p className="product-info-price text-right">
                        {basicFunction.currancyAddWithNumber(
                          getItemTotal(item)
                        ) ||
                          basicFunction.currancyAddWithNumber(getItemTotal(0))}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-info text-left">
            {/* <p className="product-info-price">${getItemTotal(item) || 0}</p> */}
            {/* <p className="product-info-shipping">FREE RETURN SHIPPING.</p> */}
            {subscribed ? <b>Subscribed product</b> : ""}
          </div>
        </div>
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
)(SingleCartItem);
