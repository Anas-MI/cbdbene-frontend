import React, { Component } from "react";
import { connect } from "react-redux";

import BasicFunction from "../../services/extra/basicFunction";

const basicFunction = new BasicFunction();

class CartContainer extends Component {
  render() {
    const { cart } = this.props;
    return (
      <div className="w-100">
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
                {/* {this.renderCartItem(cart ? cart.items : [])} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  cart: state.cart
});
export default connect(mapStateToProps)(CartContainer);
