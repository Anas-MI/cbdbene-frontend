import React, { Component } from "react";
import { connect } from "react-redux";
import { directAddToCart } from "../../services/extra";
import { addToCart, toggleCartBar } from "../../actions";
import CustomLink from "../CustomLink";
import classNames from "classnames";

class SimpleProductCard extends Component {
  addToCart = product => {
    const { addToCart, toggleCartBar, isOpen } = this.props;
    addToCart(product);
    if (!isOpen) toggleCartBar();
  };
  render() {
    const {
      image,
      title,
      btnText,
      product,
      to,
      onImageClick,
      onTitleClick,
      noImage
    } = this.props;
    return (
      <div className="simple-product-card">
        <div className="hover-gold-border">
          <div className="simple-product-card-inner">
            {!noImage && (
              <div className="simple-product-card-image-wrap">
                <div className="simple-product-card-image-inner">
                  {image && (
                    <CustomLink
                      onClick={() => {
                        if (typeof onImageClick === "function") onImageClick();
                      }}
                      to={to}
                    >
                      {" "}
                      <img className="cursor-pointer" src={image} alt={title} />
                    </CustomLink>
                  )}
                </div>
              </div>
            )}
            <div className="simple-product-card-title-wrap">
              <CustomLink
                to={to}
                onClick={() => {
                  if (typeof onTitleClick === "function") onTitleClick();
                }}
                className={classNames("text-truncate", {
                  "line-h-8 d-block": noImage
                })}
              >
                {title}
              </CustomLink>
            </div>
            {btnText && (
              <div
                onClick={() => {
                  this.addToCart(directAddToCart(product));
                }}
                className="simple-product-card-btn-wrap"
              >
                <span className="w-100 cursor-pointer btn2">{btnText}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateTopProps = state => ({
  isOpen: state.cartSideBar.isOpen
});
export default connect(
  mapStateTopProps,
  { addToCart, toggleCartBar }
)(SimpleProductCard);
