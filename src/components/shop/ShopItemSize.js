import React, { Component } from "react";
import { getSizes } from "../../services/extra";
import BasicFunction from "../../services/extra/basicFunction";

const basicFunction = new BasicFunction();

export default class ShopItemSize extends Component {
  render() {
    const { product } = this.props;
    const sizes = getSizes(product);
    return (
      <div className="CPSubcatProductSizePrice-info false">
        {product.combo !== true && sizes.length > 0 && (
          <span>{sizes.length} Sizes</span>
        )}
        {product.combo !== true && sizes.length > 0 && (
          <span className="CPSubcatProductSizePrice-separator">/</span>
        )}
        {product.combo === true ? (
          <span>{basicFunction.currancyAddWithNumber(product.dsaleprice)}</span>
        ) : (
          // <span>
          //   {product.producttype === "variable"
          //     ? basicFunction.getMinMaxValue2(product)
          //     : "From " +
          //       basicFunction.currancyAddWithNumber(product.dsaleprice)}
          // </span>
          <span>
            {product.producttype === "variable"
              ? basicFunction.getMinMaxValue2(product)
              : basicFunction.currancyAddWithNumber(product.dsaleprice)}
          </span>
        )}
      </div>
    );
  }
}
