import React, { Component } from "react";
import { connect } from "react-redux";
import { ProductUseList } from "./";
import { filePath } from "./Constants";
class ProductUseEl extends Component {
  render() {
    const { product } = this.props;
    let attributecontent = [];
    let description = "";
    let image;
    let title;
    if (product) {
      image = product.sectionbimage;
      title = product.producttitle;
      if (product.combo) {
        description = product.description;
        title = product.title;
        attributecontent = product.products.map(el => {
          const {
            combo_pid
          } = el
          const thisProduct = this.props.allProducts.find(elx => elx._id === combo_pid)
          if(thisProduct){
            return {
              title: thisProduct.title || (thisProduct.productid && thisProduct.productid.producttitle),
              description: thisProduct.description || (thisProduct.productid && thisProduct.productid.description),
            }
          }
          return null
        }).filter(el => el)
      } else {
        attributecontent = product.attributecontent;
        if (product.productid) {
          title = product.productid.producttitle;
          description = product.productid.description;
        }
      }
    }

    return (
      <section
        className="PDPExpectations-wrapper theme-alabaster-2 is-visible"
        data-component="PDPExpectations"
        data-global-ref="ScrollRevealer-reveal"
      >
        <div
          className="PDPExpectations-fullImageWrapper PDPExpectations-fullImageWrapper--withObjectFit"
          data-ref="PDPExpectations-fullImageWrapper"
        >
          <span className="PDPExpectations-fullImageInner">
            {image && (
              <picture
                className="Picture PDPExpectations-fullImage"
                data-ref="PDPExpectations-fullImage"
              >
                <source srcSet={filePath + image} />
                <img alt={title} />
              </picture>
            )}
          </span>
        </div>

        <div className="PDPExpectationsContent-wrapper">
          <div className="PDPExpectationsContent-inner">
            <div className="PDPExpectationsContent-sectionOne">
              <div className="PDPExpectationsContentSummary">
                <h2 className="PDPExpectationsContentSummary-title">
                  {description ? description : ""}
                </h2>
              </div>
            </div>
            <div className="PDPExpectationsContent-sectionTwo">
              <ul className="PDPExpectationsContentList-details">
                <ProductUseList list={attributecontent} />
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = state => ({
  allProducts : state.products.products
})
export const ProductUse = connect(mapStateToProps)(ProductUseEl);