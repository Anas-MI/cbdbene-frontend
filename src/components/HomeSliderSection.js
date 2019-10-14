import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import { filePath, flickityOptions, imagePack } from "./Constants";
import { CustomLink } from "./";
import Flickity from "react-flickity-component";
import classNames from "classnames";
import ReactSvg from "react-svg";

class HomeSliderSectionClass extends Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.slideScrollable = this.slideScrollable.bind(this);
    this.flickityInit = this.flickityInit.bind(this);
    this.state = {
      flLeft: 0,
      flWidth: "20%",
      isSmall: window.innerWidth >= 640 ? false : true
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize());
    window.addEventListener("load", this.handleResize());
  }
  flickityInit() {
    setTimeout(() => {
      if (this.flkty) {
        this.flkty.on("scroll", progress => {
          let left = `${progress * 80}%`;

          $(this.refs.slideDisplay).css({
            left: left
          });
        });
      }
    }, 200);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize());
    window.removeEventListener("load", this.handleResize());
  }
  handleResize() {
    this.setState({
      isSmall: window.innerWidth >= 640 ? false : true
    });
  }
  flResize() {
    this.flkty.resize();
  }
  slideScrollable(direction) {
    if (direction === "left") {
      this.flkty.previous();
    } else {
      this.flkty.next();
    }
  }
  renderSlides(arr) {
    const { location } = this.props;
    return arr.map((el, index) => {
      const {
        productid,
        // _id: metaId,
        combo,
        featureimage,
        title,
        productSlug
      } = el;
      const extraCss = this.props.border || "";
      return (
        <div className={"MCItemCarousel-Item " + extraCss} key={index}>
          <div className="MCItemCarouselProduct">
            <CustomLink
              className="MCItemCarouselProduct-wrapper has-overflowHidden"
              to={`/${location.countryCode}/shop/${productSlug}`}
            >
              <picture className="Picture ProductPicture MCItemCarouselProduct-picture">
                {combo && featureimage && (
                  <source
                    srcSet={filePath + featureimage}
                    media="(min-width: 0px)"
                  />
                )}
                {productid && (
                  <source
                    srcSet={filePath + productid.featurefilepath}
                    media="(min-width: 0px)"
                  />
                )}
                <img
                  onLoad={() => {
                    this.flResize();
                  }}
                  alt={productid ? productid.producttitle : title}
                />
              </picture>
            </CustomLink>
          </div>
          <div className="MCItemCarouselCaption has-intro">
            <CustomLink
              className="MCItemCarouselCaption-link"
              to={`/${location.countryCode}/shop/${productSlug}`}
            >
              <h5 className="MCItemCarouselCaption-title">
                {productid && productid.producttitle}
                {combo && title}
              </h5>
            </CustomLink>
          </div>
        </div>
      );
    });
  }
  ProductSliderEl() {
    const flickityOpt = {
      ...flickityOptions,
      on: {
        ready: () => {
          this.flickityInit();
        }
      }
    };
    const { isSmall } = this.state;
    const {
      title,
      description,
      noTitle,
      productArr,
      btnlink,
      btntext,
      noIntroGap
    } = this.props;

    return (
      <div
        className={classNames("MCItemCarousel CPBodyScrollable is-visible", {
          "MCItemCarousel--hasIntro": !noIntroGap
        })}
      >
        <div className="MCItemCarousel-scrollable">
          {
            <div
              className="MCCarouselNav MCCarouselNav--prev"
              style={{ display: "flex" }}
            >
              <button className="MCCarouselNav-btn">
                <div className="MCCarouselNav-btnWrapper">
                  <svg
                    aria-labelledby="37f650ea-d1e7-4c52-b5bc-ce00d6f0e81a"
                    className="Icon MCCarouselNav-btnIcon"
                    role="img"
                    viewBox="0 0 50 50"
                  >
                    <title id="37f650ea-d1e7-4c52-b5bc-ce00d6f0e81a">
                      PREV
                    </title>
                    <g>
                      <polygon points="25,31.3 4.2,10.5 0.1,14.6 25,39.5 50,14.6 45.9,10.5 " />
                    </g>
                  </svg>
                </div>
              </button>
            </div>
          }
          <div
            className="MCCarouselNav MCCarouselNav--next"
            style={{ display: "flex" }}
          >
            <button className="MCCarouselNav-btn">
              <div className="MCCarouselNav-btnWrapper">
                <svg
                  aria-labelledby="9ab42d0a-6c07-4f1a-8816-77b12d9d094d"
                  className="Icon MCCarouselNav-btnIcon"
                  role="img"
                  viewBox="0 0 50 50"
                >
                  <title id="9ab42d0a-6c07-4f1a-8816-77b12d9d094d">NEXT</title>
                  <g>
                    <polygon points="25,31.3 4.2,10.5 0.1,14.6 25,39.5 50,14.6 45.9,10.5 " />
                  </g>
                </svg>
              </div>
            </button>
          </div>
          <div className="MCItemCarousel-viewport">
            <div className="MCItemCarousel-productWrapper flickity-enabled">
              <Flickity
                className={"carousel"} // default ''
                elementType={"div"} // default 'div'
                options={flickityOpt} // takes flickity options {}
                disableImagesLoaded={false} // default false
                reloadOnUpdate // default false
                ref={"flickyRef"}
                flickityRef={c => (this.flkty = c)}
              >
                {!isSmall && !noTitle && (
                  <div className="MCItemCarouselIntro">
                    <div className="MCItemCarouselIntro-wrapper">
                      <div className="MCItemCarouselIntro-group">
                        <h2 className="MCItemCarouselIntro-title">{title}</h2>
                      </div>
                      <div className="MCItemCarouselIntro-group">
                        <div className="MCItemCarouselIntro-copy">
                          <p className="MCItemCarouselIntro-copyParagraph">
                            {description}
                          </p>
                        </div>
                        <div>
                          {btntext && btntext.trim() !== "" && (
                            <CustomLink
                              className="MCItemCarouselIntro-link"
                              to={btnlink ? btnlink : "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {btntext}
                              <ReactSvg src={imagePack.rightArrow} />
                            </CustomLink>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {this.renderSlides(productArr)}
              </Flickity>
              <div className="MCCarouselScrollbar">
                <div
                  className="MCCarouselScrollbar-bar"
                  ref="slideDisplay"
                  style={{ left: this.state.flLeft, width: this.state.flWidth }}
                />
              </div>
            </div>
          </div>

          <div className="CPBodyScrollable-nav">
            <div className="CPBodyScrollable-navBtnTrigger CPBodyScrollable-navBtnTrigger--left is-disabled">
              <button
                className="CPBodyScrollable-navBtn"
                disabled=""
                tabIndex="-1"
                onClick={() => {
                  this.slideScrollable("left");
                }}
              >
                <div className="CPBodyScrollable-navBtnWrapper">
                  <ReactSvg width="40" src={imagePack.leftChavron} />
                </div>
              </button>
            </div>
            <div className="CPBodyScrollable-navBtnTrigger CPBodyScrollable-navBtnTrigger--right">
              <button
                className="CPBodyScrollable-navBtn"
                tabIndex="-1"
                onClick={() => {
                  this.slideScrollable("right");
                }}
              >
                <div className="CPBodyScrollable-navBtnWrapper">
                  <ReactSvg width="40" src={imagePack.rightChavron} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { productArr } = this.props;
    return (
      <div>
        {productArr.length > 0 && <div>{this.ProductSliderEl(productArr)}</div>}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location
});
export const HomeSliderSection = connect(mapStateToProps)(
  HomeSliderSectionClass
);
