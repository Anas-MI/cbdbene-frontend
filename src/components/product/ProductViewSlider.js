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

import { isProductInWishList } from "../../services/extra";
import { setFav, setWishList } from "../../actions";
import BasicFunction from "../../services/extra/basicFunction";
import { deleteWishList, addToWishListApi } from "../../services/api";
const basicFunction = new BasicFunction();
class ProductViewSlider extends Component {
  constructor(props) {
    super(props);
    this.renderSlides = this.renderSlides.bind(this);
    this.state = {
      zoom: false,
      fav: isProductInWishList(this.props.productmeta, this.props.wishList) //false
    };
  }

  hartState(_id, productmainId, productDetails) {
    const removeIndex = basicFunction.checkProductInWishList(
      this.props.wishList,
      productmainId
    );
    var wishListArray = [...this.props.wishList];
    if (removeIndex || removeIndex === 0) {
      if (this.props.user._id) {
        var id = wishListArray[removeIndex].wishListId;
        deleteWishList({ id })
          .then(res => res.json())
          .then(resJson => {
            if (resJson.success) {
            }
          })
          .catch();
      }
      wishListArray.splice(removeIndex, 1);
      this.props.setWishList(wishListArray);
      this.setState({
        SpinnerToggle: false
      });
    } else {
      if (this.props.user._id) {
        const userid = this.props.user._id;
        addToWishListApi(userid, productmainId, _id)
          .then(res => res.json())
          .then(resJson2 => {
            if (resJson2.status) {
              var wishlist = "";
              const wishListRes = resJson2.wishlist;
              if (wishListRes.combo) {
                wishlist = {
                  combo: wishListRes.combo,
                  productid: wishListRes.comboid,
                  productmeta: wishListRes.comboid,
                  userid: userid,
                  wishListId: wishListRes._id
                };
              } else {
                wishlist = {
                  combo: wishListRes.combo,
                  productid: wishListRes.productid,
                  productmeta: wishListRes.productmeta,
                  userid: userid,
                  wishListId: wishListRes._id
                };
              }

              this.props.setWishList([...wishListArray, wishlist]);
              this.setState({
                SpinnerToggle: false
              });
            }
          })
          .catch(err => {});
      } else {
        const wishListDetails = {
          productmeta: _id,
          productid: productmainId,
          productDetails: productDetails
        };

        this.props.setWishList([...wishListArray, wishListDetails]);
      }
    }
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
    const { productmeta, productid, productDetails, wishList } = this.props;
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
            {/* <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext> */}
            <DotGroup />
          </div>
        )}

        {/* <div
          className={classNames("toggle-fav", {
            fav: isProductInWishList(productmeta, wishList)
          })}
          onClick={() => {
            this.hartState(productmeta, productid, productDetails);
          }}
        >
          <span>
            <Icon
              icon={isProductInWishList(productmeta, wishList) ? heart : heartO}
            />
          </span>
        </div> */}
      </CarouselProvider>
    );
  }
}
const mapStateToProps = state => ({
  wishList: state.wishList,
  user: state.user
});
export default connect(
  mapStateToProps,
  { setFav, setWishList }
)(ProductViewSlider);
