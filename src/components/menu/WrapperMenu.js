import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { FadeTransition, CustomLink } from "..";
import { SimpleProductCard } from "../product";
import { subMenuVisible } from "../../actions";
import BasicFunction from "../../services/extra/basicFunction";
import {
  filePath,
  colors
  // imagePack
} from "../Constants";
import { getBasicPrice } from "../../services/extra";

const basicFunction = new BasicFunction();

class WrapperMenu extends Component {
  isItem = item => this.props.cart.items.find(el => el._id === item._id);
  render() {
    const {
      subMenus,
      onMouseEnter,
      onMouseLeave,
      // products,
      countryCode,
      isPosUp,
      headerPopUpModalData
    } = this.props;
    return (
      <FadeTransition in={subMenus.isVisible}>
        <section
          className={classNames("menu-wrapper", {
            visible: subMenus.isVisible,
            isTopBar: isPosUp && !headerPopUpModalData
          })}
        >
          <div className="menu-wrapper-inner">
            <div className="">
              <div
                onMouseEnter={() => {
                  if (typeof onMouseEnter === "function") onMouseEnter();
                }}
                onMouseLeave={() => {
                  if (typeof onMouseLeave === "function") onMouseLeave();
                }}
                // style={{
                //   background: "#ececec"
                // }}
                // className="container-extend"
              >
                <div
                  style={{
                    paddingLeft: "0px",
                    paddingRight: "02px",
                    paddingTop: "0px"
                  }}
                  className="row justify-content-center ml-0 mr-0 "
                >
                  {subMenus.contentType === "products" &&
                    subMenus.products.map((el, ind) => {
                      const title =
                        el.title || (el.productid && el.productid.producttitle);
                      // const image = el.featureimage || (el.productid && el.productid.featurefilepath)
                      const image =
                        el.menuimage ||
                        el.featureimage ||
                        (el.productid && el.productid.menuimage);
                      // console.log({ image });
                      const amountObj = getBasicPrice(el);
                      const amount = amountObj.sale_price
                        ? amountObj.sale_price
                        : amountObj.regular_price;
                      // console.log({
                      //   amount
                      // });

                      const price = basicFunction.currencyWithoutUsd(amount);
                      return (
                        <SimpleProductCard
                          key={ind}
                          btnText={
                            // this.isItem(el)
                            //   ? "Added to cart"
                            //   : `Add to cart - ${price}`
                            this.isItem(el)
                              ? `Add to cart - ${price}`
                              : `Add to cart - ${price}`
                          }
                          onImageClick={() => {
                            el && this.props.subMenuVisible(false);
                          }}
                          // to={el && `/${countryCode}/shop/${el._id}`}
                          to={el && `/${countryCode}/shop/${el.productSlug}`}
                          image={filePath + image}
                          // image={imagePack.menuDummy}
                          product={el}
                          title={title}
                        />
                      );
                    })}
                  {subMenus.contentType === "links" &&
                    subMenus.links.map((el, ind) => {
                      const { title, image, slug } = el;

                      return (
                        <SimpleProductCard
                          key={ind}
                          // btnText={
                          //   this.isItem(el) ? "Added to cart" : `Add - ${price}`
                          // }
                          onImageClick={() => {
                            el && this.props.subMenuVisible(false);
                          }}
                          onTitleClick={() => {
                            el && this.props.subMenuVisible(false);
                          }}
                          noImage={true}
                          // to={el && `/${countryCode}/shop/${el._id}`}
                          to={el && slug && slug}
                          // image={filePath + image}
                          title={title}
                        />
                      );
                    })}
                </div>
                {subMenus.contentType === "links" && (
                  <div>
                    <div
                      style={{
                        background: colors.romanceAlter //"#eceae2"
                      }}
                      className="p-3 border text-center"
                    >
                      <CustomLink
                        to={`/${countryCode}/learn`}
                      >{`View All`}</CustomLink>
                    </div>
                  </div>
                )}
                {subMenus.contentType === "products" && (
                  <div>
                    <div
                      style={{
                        background: colors.romanceAlter //"#eceae2"
                      }}
                      className="p-3 border text-center"
                    >
                      <CustomLink
                        to={`/${countryCode}/category/${subMenus.activeMenu}`}
                      >{`View All ${subMenus.activeMenu}`}</CustomLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </FadeTransition>
    );
  }
}

const mapStateToProps = state => ({
  subMenus: state.subMenus,
  products: state.products.products,
  countryCode: state.location.countryCode,
  cart: state.cart,
  headerPopUpModalData: state.checkout.headerPopUpModalData,
  isPosUp: state.subMenus.isPosUp
});
export default connect(
  mapStateToProps,
  { subMenuVisible }
)(WrapperMenu);
