import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import CustomLink from "../CustomLink";
import { filePath } from "../Constants";
import { addToCart } from "../../actions";
import { variablePriceSet } from "../../services/extra/cartHealpers";

class ProductListItem extends Component {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
    this.isFound = this.isFound.bind(this);
  }
  addToCart(el) {
    const {
      history,
      location: { countryCode }
    } = this.props;
    if (el.combo || el.producttype !== "variable") {
      if (this.isFound(el._id)) {
        history.push(`/${countryCode}/cart`);
      } else {
        this.props.addToCart(
          variablePriceSet({
            ...el,
            qty: {
              label: 1,
              value: 1
            }
          }),
          this.props.cart,
          this.props.user.userMetaId
        );
      }
    } else {
      console.log({
        props: this.props
      });
      history.push(`/${countryCode}/shop/${el.productSlug}`);
    }
  }
  isFound(id) {
    return this.props.cart.items.find(el => el._id === id);
  }
  render() {
    const {
      image,
      title,
      description,
      link,
      btnText,
      linkText,
      product,
      btnTextAlter,
      fixWidth,
      className
    } = this.props;
    return (
      <div
        className={classNames("product-list-item", {
          "fix-width": fixWidth,
          [className]: className
        })}
      >
        <div className="product-list-image-wrap">
          <CustomLink
            to={link ? link : "#"}
            className="product-list-image-link"
            >
            <div className="product-list-image-inner-wrap">
            {image && (
              <img
                className="product-list-image"
                alt={title}
                src={filePath + image}
                />
            )}
            </div>
          </CustomLink>
        </div>
        <div className="product-list-title-wrap">
          <div className="product-list-title-inner">
            <p className="product-list-title mb-2">
              <strong>{title}</strong>
            </p>
          </div>
        </div>

        <CustomLink
          to={link ? link : "#"}
          className="mt-2 mb-3 product-list-arr-btn text-center"
        >
          <span>{linkText}</span>
        </CustomLink>
        <div className="product-list-title-wrap has-desc">
          <div className="product-list-title-inner">
            <p className="product-list-title">{description}</p>
          </div>
        </div>

        <div className="product-list-btn-wrap text-center">
          <span
            to={link ? link : "#"}
            onClick={() => {
              this.addToCart(product);
            }}
            className="btn2 cursor-pointer d-block mb-0 product-list-btn"
          >
            <span className="product-list-text">
              <span>{this.isFound(product._id) ? btnTextAlter : btnText}</span>
            </span>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
  cart: state.cart,
  user: state.user
});
export default connect(
  mapStateToProps,
  { addToCart }
)(ProductListItem);
