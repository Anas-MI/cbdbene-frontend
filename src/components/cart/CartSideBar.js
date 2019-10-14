import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { Icon } from "react-icons-kit";
// import {arrow_right} from 'react-icons-kit/ikons/arrow_right'
import { close } from "react-icons-kit/ikons/";
import { ic_delete } from "react-icons-kit/md/";
// import {ecommerce_cart_check, ecommerce_cart_remove} from 'react-icons-kit/linea/'

import { toggleCartBar } from "../../actions";
import CartItemsSmall from "../CartItemsSmall";
import CustomLink from "../CustomLink";
import { emptyCart } from "../../constantMessage";

class CartSideBar extends Component {
  render() {
    const { countryCode, isOpen, items, toggleCartBar } = this.props;
    return (
      <div>
        <div
          className={classNames("cart-sidebar d-flex", {
            "hidden-bar": !isOpen && items.length === 0
          })}
        >
          <div
            className={classNames(
              "col-12 position-relative h-100 overflow-auto flex-column d-flex",
              {
                hide: !isOpen
              }
            )}
          >
            <div className="sticky-top light">
              <div className="cart-bar-header border-bottom pt-2 pb-2">
                <div className="row align-items-center">
                  <div className="col-8 cart-bar-header-left"><b>Your Cart</b></div>
                  <div className="col-4 text-right">
                    <Icon
                      onClick={() => {
                        this.props.toggleCartBar();
                      }}
                      icon={close}
                      className="cursor-pointer"
                      size={22}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={classNames("w-100 flex-grow-1", {
                "d-flex align-items-center justify-content-center ": !items.length
              })}
            >
              {items.length !== 0 && (
                <CartItemsSmall
                  bold={true}
                  noGrandTotal={true}
                  noTax={true}
                  noShipping={true}
                  isChangeAble={true}
                  // light={true}
                  small={true}
                  removeSize={20}
                  removeIcon={ic_delete}
                  noQty={true}
                />
              )}
              {isOpen && items.length === 0 && <p>{emptyCart}</p>}
            </div>
            {items.length === 0 && (
              <div className="bottom-cart-btns d-flex pb-3 pt-4 sticky-bottom">
                <CustomLink
                  to={`/${countryCode}/shop`}
                  onClick={this.props.toggleCartBar}
                  className="btn2 flex-grow-1 cursor-pointer"
                >
                  Shop Now
                </CustomLink>
              </div>
            )}
            {items.length !== 0 && (
              <div className="bottom-cart-btns d-flex pb-3 pt-4 sticky-bottom">
                <CustomLink
                  onClick={this.props.toggleCartBar}
                  to={`/${countryCode}/cart`}
                  className="btn2 flex-grow-1 cursor-pointer"
                >
                  View
                </CustomLink>
                <div
                  style={{
                    minWidth: "20px"
                  }}
                />
                <CustomLink
                  onClick={this.props.toggleCartBar}
                  to={`/${countryCode}/checkout`}
                  className="btn2 flex-grow-1 cursor-pointer"
                >
                  Checkout
                </CustomLink>
              </div>
            )}
          </div>
        </div>

        {/* {items.length !== 0 && (
          <div
            onClick={() => {
              this.props.toggleCartBar();
            }}
            className={classNames("cart-close-btn", {
              opened: isOpen
            })}
          />
        )} */}
        <div
          onClick={() => {
            if (isOpen) {
              toggleCartBar();
            }
          }}
          style={{
            pointerEvents: isOpen ? "all" : "none",
            opacity: isOpen ? 1 : 0
          }}
          className="cart-bar-overlay"
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isOpen: state.cartSideBar.isOpen,
  countryCode: state.location.countryCode,
  items: state.cart.items
});
export default connect(
  mapStateToProps,
  { toggleCartBar }
)(CartSideBar);
