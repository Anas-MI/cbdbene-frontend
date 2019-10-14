import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BasicFunction from "../services/extra/basicFunction";
import { directAddToCart } from "../services/extra/";
import { filePath } from "./Constants";
import FadeTransition from "./FadeTransition";
import { addToCart } from '../actions'
const basicFunction = new BasicFunction();
class ProductItemClass extends Component {
  renderAttributes(attributecontent) {
    return attributecontent
      .filter(el => el.title !== "" && el.description !== "")
      .map((el, index) => {
        if (index > 1) return null;
        return (
          <li key={index} className="CPSubcatProductDetails-listItem">
            <div className="CPSubcatProductDetails-title">{el.title}</div>
            <div className="CPSubcatProductDetails-content">
              {el.description}
            </div>
          </li>
        );
      });
  }
  renderVaritionWithPrice(variation, isText = false) {
    Array.min = function(array) {
      return Math.min.apply(Math, array);
    };

    if (variation.filter(el => el).length > 0) {
      const minAmount = Array.min(
        variation
          .filter(el => el)
          .map(el => {
            return el.sale_price ? el.sale_price : el.regular_price;
          })
      );
      if(isText)
        return `$${minAmount}`
      return (
        <div className="CPSubcatProductSizePrice-info false">
          {/* <span>{variation.filter(el => el).length} Sizes</span> */}
          {/* <span className="CPSubcatProductSizePrice-separator">/</span> */}
          <span>${minAmount}</span>
        </div>
      );
    }
  }
  renderPrice(price, isText = false) {
    const amount = basicFunction.currancyAddWithNumber(price)
    if(isText)
        return amount
    return (
      <div className="CPSubcatProductSizePrice-info false">
        <span>{amount}</span>
      </div>
    );
  }
  render() {
    const {
      product: {
        productid,
        // _id,
        // attributecontent,
        variation,
        combo,
        dsaleprice,
        productSlug,
        indication
      },
      location
    } = this.props;
    let productName = productid
      ? productid.producttitle
      : this.props.product.title;
    let mainImage = productid
      ? productid.featurefilepath
      : this.props.product.featureimage;

    const price = combo === true ? this.renderPrice(dsaleprice) : this.renderVaritionWithPrice(variation);
    // const priceText = combo === true ? this.renderPrice(dsaleprice, true) : this.renderVaritionWithPrice(variation, true);
    return (
      <FadeTransition
        in={this.props.in}
        duration={400}
        className={`CPBodyRow-subcategoryProducts has-overflowHidden is-odd CPSubcatProduct CPSubcatProduct--hasVariants CPSubcatProduct--hasAddToCart`}
      >
        <div className="CPSubcatProduct-wrapper">
          <Link to={`/${location.countryCode}/shop/${productSlug}`}>
            <picture className="Picture ProductPicture CPSubcatProduct-picture">
              {mainImage && (
                <source
                  srcSet={filePath + mainImage}
                  media="(min-width: 0px)"
                />
              )}
              <img alt={productName} />
            </picture>
          </Link>
          <div className="CPSubcatProductSizePrice">
            <Link to={`/${location.countryCode}/shop/${productSlug}`}>
              <h5 className="CPSubcatProductSizePrice-name">{productName}</h5>
              {price}
            </Link>
          </div>
          <Link to={`/${location.countryCode}/shop/${productSlug}`}>
            {/* <div className="CPSubcatProductDetails">
              <ul className="CPSubcatProductDetails-list">
                {this.renderAttributes(attributecontent)}
              </ul>
            </div> */}
            {indication && (
              <div className="text-justify pb-5 pl-3 pl-lg-5 pr-lg-5 pr-3 pt-2">
                {indication}
              </div>
            )}
          </Link>
          <div
              onClick={() => {
                console.log({
                  price
                })
                this.props.addToCart(directAddToCart(this.props.product))
                // this.addToCart(directAddToCart(product));
              }}
              className="product-item-btn-wrap"
            >
              <div className="w-100 d-flex justify-content-center cursor-pointer btn2">{`Add to cart`}</div>
            </div>
        </div>
      </FadeTransition>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location
});
export const ProductItem = connect(mapStateToProps, {
  addToCart
})(ProductItemClass);
