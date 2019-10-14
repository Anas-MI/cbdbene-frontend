import React, { Component } from "react";
import { connect } from "react-redux";

import { ShopItemSize } from "./";
import { CustomLink } from "../";
import { filePath } from "../Constants";
import { getImagePath } from "../../services/extra/productHelpers";

class ShopItem extends Component {
  render() {
    const { onImageLoad, product, location } = this.props;
    const link = `/${location.countryCode}/shop/${product.productSlug}`;
    const title = product.combo
      ? product.title
      : product.productid.producttitle;
    const image = filePath + getImagePath(product);
    return (
      <div
        className={`CPBodyRow-scrollableProduct has-overflowHidden CPSubcatProduct`}
      >
        <div className="CPSubcatProduct-wrapper">
          <CustomLink to={link}>
            <picture className="Picture ProductPicture CPSubcatProduct-picture">
              <source srcSet={image} media="(min-width: 0px)" />
              <img
                onLoad={() => {
                  if (typeof onImageLoad === "function") onImageLoad();
                }}
                alt={title}
              />
            </picture>
          </CustomLink>
          <div className="CPSubcatProductSizePrice">
            <CustomLink to={link}>
              <h5 className="CPSubcatProductSizePrice-name">{title}</h5>
            </CustomLink>
            <ShopItemSize product={product} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location
});
export default connect(mapStateToProps)(ShopItem);
