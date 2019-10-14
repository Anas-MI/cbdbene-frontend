import React, { Component } from "react";
import {
  filePath
  // qtyOptions
} from "./Constants";
import { connect } from "react-redux";
import classNames from "classnames";
import { removeFromCart, modifyItem } from "../actions";
import { ic_clear } from "react-icons-kit/md/";
import Icon from "react-icons-kit";
import { getItemTotal } from "../services/extra/cartHealpers";
import BasicFunction from "../services/extra/basicFunction";
const basicFunction = new BasicFunction();

class CartItemsSmall extends Component {
  cartItems(items, removeIcon, removeSize = 16, noQty = false) {
    const { isChangeAble } = this.props;
    return items.map((el, index) => {
      const {
        productid,
        combo,
        qty,
        subscribed,
        subscribedDiscountPersent
      } = el;
      var discountSubcriptionPrice = 0;
      const remove = removeIcon ? removeIcon : ic_clear
      if (subscribed) {
        const total = getItemTotal(el);
        discountSubcriptionPrice = (total * subscribedDiscountPersent) / 100;
        discountSubcriptionPrice =
          parseFloat(total) - parseFloat(discountSubcriptionPrice);
      }
      return (
        <div className="pb-4 pt-4 border-bottom" key={index}>
          <div className="row">
            <div className="col-4">
              {combo && (
                <img
                  className="img-fluid small-cart-img"
                  src={filePath + el.featureimage}
                  alt={el.title}
                />
              )}
              {!combo && (
                <img
                  className="img-fluid small-cart-img"
                  src={filePath + productid.menuimage}
                  alt={productid.producttitle}
                />
              )}
            </div>
            <div className="col-8">
              <div className="d-flex justify-content-between mb-2">
                <b>{combo ? el.title : productid.producttitle}</b>{" "}
                <Icon
                  onClick={() => {
                    this.props.removeFromCart(
                      el,
                      this.props.cart,
                      this.props.user.userMetaId
                    );
                  }}
                  className="remove-icon"
                  style={{ float: "right", cursor: "pointer" }}
                  icon={remove}
                  size={removeSize}
                />
              </div>
              <div className="row">
                {!isChangeAble && <div className="col-6">{qty.label}{!noQty && " Qty"}</div>}
                {isChangeAble && (
                  <div className="col-6">
                    {!noQty && " Qty"}
                    <select
                      value={qty.value}
                      className={classNames("ml-2", {
                        "dark-select": this.props.light
                      })}
                      onChange={e => {
                        this.quantityChange(e, el);
                      }}
                    >
                      {basicFunction.qtyList(qty.value).map(el => {
                        return (
                          <option key={el.value} value={el.value}>
                            {el.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
                <div className="col-6 justify-content-end d-flex small">
                  {subscribed ? (
                    <div>
                      <strike className="small-font">
                        $
                        {basicFunction.nombarFormat(getItemTotal(el)) ||
                          basicFunction.nombarFormat(getItemTotal(0))}
                      </strike>
                      <br />
                      <p className="price small-font">
                        {basicFunction.currencyWithoutUsd(
                          discountSubcriptionPrice
                        )}
                      </p>
                    </div>
                  ) : (
                    <p className="price small-font">
                      {basicFunction.currencyWithoutUsd(getItemTotal(el))}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  quantityChange = (e, oldItem) => {
    const { value } = e.target;
    const { cart, user } = this.props;
    const newItem = {
      ...oldItem,
      qty: {
        value,
        label: value
      }
    };
    this.props.modifyItem(
      {
        oldItem,
        newItem
      },
      cart,
      user.userMetaId
    );
  };
  render() {
    const {
      cart: { items },
      noTax,
      noShipping,
      noGrandTotal,
      removeIcon,
      removeSize,
      noQty,
    } = this.props;
    const shippingCharge = this.props.cart.shippingCharge || 0;
    const SubTotal = this.props.cart.subTotal || 0;
    const countryTax =
      parseFloat(this.props.cart.subTotal || 0) *
      parseFloat(this.props.cart.taxPersent || 0);
    const TaxgrandTotalWithTax =
      parseFloat(this.props.cart.shippingCharge || 0) +
      parseFloat(this.props.cart.subTotal || 0) +
      parseFloat(countryTax);
    const discount =
      (this.props.cart.taxCouponDiscount * this.props.cart.subTotal) / 100;
    const totalPrice = TaxgrandTotalWithTax - discount;
    return (
      <div
        className={classNames("small-cart-container", {
          light: this.props.light,
          "small-el": this.props.small,
          "small-cart-container--bold": this.props.bold,
        })}
      >
        {this.cartItems(items, removeIcon, removeSize, noQty)}
        <div className=" pt-3 pb-2">
          <div className="row">
            <div className="col-7">
              <p><b>Sub Total:</b></p>
            </div>
            <div className="col-5 text-right">
              <p><b>{basicFunction.currencyWithoutUsd(SubTotal)}</b></p>
            </div>
          </div>
          {!noShipping && (
            <div className="row">
              <div className="col-7">
                <p>Shipping :</p>
              </div>
              <div className="col-5 text-right">
                <p>
                  <b>
                  {basicFunction.currencyWithoutUsd(
                    parseFloat(shippingCharge)
                  )}
                  </b>
                </p>
              </div>
            </div>
          )}
          {!noTax && (
            <div className="row">
              <div className="col-7">
                <p>Estimated Tax:</p>
              </div>
              <div className="col-5 text-right">
                <p>{basicFunction.currencyWithoutUsd(countryTax)}</p>
              </div>
            </div>
          )}
          {discount && discount > 0 ? (
            <div className="row">
              <div className="col-7">
                <p>Discount:</p>
              </div>
              <div className="col-5 text-right">
                <p>{basicFunction.currencyWithoutUsd(discount)}</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {!noGrandTotal && (
            <div className="row ">
              <div className="col-7">
                <p>
                  <b>Grand Total :</b>
                </p>
              </div>
              <div className="col-5 text-right">
                <p>
                  <b>{basicFunction.currencyWithoutUsd(totalPrice)}</b>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  { removeFromCart, modifyItem }
)(CartItemsSmall);
