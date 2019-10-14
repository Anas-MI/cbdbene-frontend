import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
  ImageWithZoom,
  Image
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import classNames from "classnames";
import { Icon } from "react-icons-kit";
import { heart, heartO } from "react-icons-kit/fa/";

import { isProductInWishList, toggleWishListItem } from "../services/extra";
import { setFav } from "../actions";
class ProductViewSliderEl extends Component {
  constructor(props) {
    super(props);
    this.renderSlides = this.renderSlides.bind(this);
    this.state = {
      zoom: false,
      fav: isProductInWishList(this.props.productmeta) //false
    };
  }

  renderSlides(arr) {
    return arr
      .map((product, index) => {
        if (product.img)
          return (
            <Slide key={index} index={index}>
              {this.state.zoom ? (
                <ImageWithZoom
                  onClick={() => {
                    this.setState({ zoom: false });
                  }}
                  src={product.img}
                />
              ) : (
                <Image
                  onClick={() => {
                    this.setState({ zoom: true });
                  }}
                  style={{ objectFit: "contain" }}
                  src={product.img}
                />
              )}
            </Slide>
          );
        return null;
      })
      .filter(el => el);
  }
  render() {
    const { fav } = this.state;
    const { productmeta, productid, productDetails } = this.props;
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={80}
        totalSlides={this.props.imgArr.length}
        className="product-view"
      >
        <Slider>{this.renderSlides(this.props.imgArr)}</Slider>
        {this.props.imgArr.length > 1 && (
          <div className="slider-navs">
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
            <DotGroup />
          </div>
        )}

        <div
          className={classNames("toggle-fav", {
            fav: fav
          })}
          onClick={() => {
            toggleWishListItem(productmeta, productid, productDetails);
            this.setState({
              fav: isProductInWishList(this.props.productmeta)
            });

            this.props.setFav(2, this.props.cart, this.props.user.userMetaId);
          }}
        >
          <span>
            <Icon icon={fav ? heart : heartO} />
          </span>
        </div>
      </CarouselProvider>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
const ProductViewSlider = connect(
  mapStateToProps,
  { setFav }
)(ProductViewSliderEl);
export { ProductViewSlider };
