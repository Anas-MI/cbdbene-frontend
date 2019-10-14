import React, { Component } from "react";
import Flickity from "react-flickity-component";
import classNames from "classnames";
import ScrollAnimation from "react-animate-on-scroll";
import ReactSVG from "react-svg";
import { connect } from "react-redux";
import { imagePack, flickityOptions } from "../Constants";
import { TransitionGroup } from "react-transition-group";
import { ProductListingIntro, ProductListItem } from "./";
class ProductListing extends Component {
  constructor() {
    super();
    this.flResize = this.flResize.bind(this);
    this.slideScrollable = this.slideScrollable.bind(this);
    // this.addToCart = this.addToCart.bind(this);
    // this.isFound = this.isFound.bind(this);
    this.state = {};
  }
  flResize() {
    this.flkty.resize();
  }

  slideScrollable(direction) {
    console.log({
      slides: this.flkty.slides,
      selectedElements: this.flkty.selectedElements,
      selectedElement: this.flkty.selectedElement,
      cells: this.flkty.cells,
      selectedIndex: this.flkty.selectedIndex
    });
    if (direction === "left") {
      this.flkty.previous();
    } else {
      this.flkty.next();
    }
  }
  render() {
    const {
      list,
      listBtnText,
      listBtnTextAlter,
      className,
      link,
      title,
      introClassName,
      description,
      onBtnClick,
      btnLink,
      btnText,
      listLinkText,
      location: { countryCode },
      history
    } = this.props;
    // console.log({listLinkText})
    const listDisplay = list.map((el, key) => {
      return (
        <ProductListItem
          key={key}
          image={el.featureimage}
          title={el.title}
          product={el}
          description={el.sdescription}
          link={`/${countryCode}/shop/${el.productSlug}`}
          btnText={listBtnText}
          history={history}
          btnTextAlter={listBtnTextAlter}
          linkText={listLinkText}
        />
      );
    });
    return (
      <ScrollAnimation animateOnce animateIn="fadeIn">
        <div
          className={classNames("d-flex product-listing-container", {
            [className]: className
          })}
        >
          <ProductListingIntro
            link={link}
            title={title}
            className={introClassName}
            description={description}
            onBtnClick={onBtnClick}
            btnLink={btnLink}
            btnText={btnText}
          />
          <div className="CPBodyScrollable pl-2">
            <div ref={"scroll"} className="CPBodyScrollable-wrapper">
              <TransitionGroup
                className={"carousel"}
                component={Flickity}
                elementType={"div"}
                options={{
                  ...flickityOptions
                }}
                disableImagesLoaded={false}
                reloadOnUpdate
                flickityRef={c => (this.flkty = c)}
              >
                {listDisplay}
              </TransitionGroup>
            </div>
            <div className="CPBodyScrollable-nav">
              <div
                className={classNames(
                  "CPBodyScrollable-navBtnTrigger CPBodyScrollable-navBtnTrigger--left ",
                  {
                    "is-disabled": this.state.isDisabled === "prev"
                  }
                )}
              >
                <button
                  className="CPBodyScrollable-navBtn"
                  disabled=""
                  tabIndex="-1"
                  onClick={() => {
                    this.slideScrollable("left");
                  }}
                >
                  <div className="CPBodyScrollable-navBtnWrapper">
                    <ReactSVG width="40" src={imagePack.leftChavron} />
                  </div>
                </button>
              </div>
              <div
                className={classNames(
                  "CPBodyScrollable-navBtnTrigger CPBodyScrollable-navBtnTrigger--right",
                  {
                    "is-disabled": this.state.isDisabled === "next"
                  }
                )}
              >
                <button
                  className="CPBodyScrollable-navBtn"
                  tabIndex="-1"
                  onClick={() => {
                    this.slideScrollable("right");
                  }}
                >
                  <div className="CPBodyScrollable-navBtnWrapper">
                    <ReactSVG width="40" src={imagePack.rightChavron} />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* {listDisplay} */}
        </div>
      </ScrollAnimation>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location
});
export default connect(mapStateToProps)(ProductListing);
