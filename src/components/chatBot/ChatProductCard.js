import React, { Component } from "react";
import { connect } from "react-redux";
import { CustomLink } from "../";
import { filePath } from "../Constants";
import { directAddToCart, getBasicPrice } from "../../services/extra";
import BasicFunction from "../../services/extra/basicFunction";
import { addToCart, toggleCartBar } from "../../actions";

const basicFunction = new BasicFunction();
class ChatProductCard extends Component {
  constructor() {
    super();
    this.state = {
      selected: false
    };
  }
  addToCart = product => {
    const { addToCart, toggleCartBar, isOpen } = this.props;
    addToCart(product);
    if (!isOpen) toggleCartBar();
  };
  triggerNext = e => {
    const { triggerNextStep } = this.props;
    triggerNextStep();
  };
  render() {
    const { value: product, countryCode } = this.props.steps.products;

    if (!product) return <div />;
    console.log({
      propsYYY: this.props
    });
    const productLink = `/${countryCode}/shop/${product.productSlug}`;
    const productTitle = product.title
      ? product.title
      : product.productid && product.productid.producttitle;
    const productImage = product.featureimage
      ? product.featureimage
      : product.productid && product.productid.featurefilepath;

    const amountObj = getBasicPrice(product);
    const amount = amountObj.sale_price
      ? amountObj.sale_price
      : amountObj.regular_price;
    const price = basicFunction.currencyWithoutUsd(amount);

    return (
      <div
        style={{
          width: "100%",
          margin: "auto"
        }}
        className="product-list-item"
      >
        <div className="product-list-image-wrap mb-2">
          <CustomLink
            to={productLink}
            className="cursor-pointer product-list-image-link"
          >
            <div
              style={{
                width: "210px",
                height: "210px"
              }}
              className="product-list-image-inner-wrap"
            >
              <img
                className="product-list-image"
                src={filePath + productImage}
                alt={productTitle}
              />
            </div>
          </CustomLink>
        </div>
        <div className="product-list-title-wrap">
          <div className="product-list-title-inner">
            <p className="product-list-title mb-2">
              <strong>{productTitle}</strong>
            </p>
          </div>
        </div>
        <div className="chat-product-btn-wrap">
          <CustomLink
            to={productLink}
            className="btn cursor-pointer d-block mb-0 product-list-btn hover-text-line"
          >
            View details
          </CustomLink>
          <span
            onClick={() => {
              this.addToCart(directAddToCart(product));
              this.triggerNext();
            }}
            className="btn2 cursor-pointer d-block mb-0 product-list-btn"
          >
            Add to cart - {price}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  countryCode: state.location.countryCode,
  isOpen: state.cartSideBar.isOpen,
  products: state.products.products
});

export default connect(
  mapStateToProps,
  {
    addToCart,
    toggleCartBar
  }
)(ChatProductCard);
