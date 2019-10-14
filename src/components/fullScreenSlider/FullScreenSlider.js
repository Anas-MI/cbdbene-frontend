import React, { Component } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import Flickity from "react-flickity-component";
import classNames from "classnames";
import ReactSVG from "react-svg";
import { imagePack, flickityOptions } from "../Constants";
import { FullSlide } from "./";

class FullScreenSlider extends Component {
  constructor(props) {
    super(props);
    this.flResize = this.flResize.bind(this);
    this.slideScrollable = this.slideScrollable.bind(this);
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
  render() {
    const {
      slides,
      full,
      autoPlay,
      alwaysShowIcon,
      isTestimonial
    } = this.props;
    const flickityOpt = {
      ...flickityOptions,
      autoPlay: autoPlay ? autoPlay : false,
      wrapAround: true
    };
    const Slides = slides.map((el, key) => {
      return <FullSlide {...el} key={key} full={full} />;
    });
    return (
      <ScrollAnimation
        className="full-slider-wrapper position-relative"
        animateOnce
        animateIn="fadeIn"
      >
        <Flickity
          className={classNames("carousel full-slider", {
            "has-testimonial": isTestimonial
          })}
          disableImagesLoaded={false}
          elementType={"div"}
          reloadOnUpdate
          ref={"flickyRef"}
          flickityRef={c => (this.flkty = c)}
          options={flickityOpt}
        >
          {Slides}
        </Flickity>
        <div
          className={classNames("CPBodyScrollable-nav", {
            "show-icons": alwaysShowIcon
          })}
        >
          <div
            className={classNames(
              "CPBodyScrollable-navBtnTrigger CPBodyScrollable-navBtnTrigger--left ",
              {
                isNext: this.isNext,
                isPrev: this.isPrev
              }
              // {
              //   "is-disabled": this.state.isDisabled === "prev"
              // }
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
              "CPBodyScrollable-navBtnTrigger CPBodyScrollable-navBtnTrigger--right"
              // {
              //   "is-disabled": this.state.isDisabled === "next"
              // }
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
      </ScrollAnimation>
    );
  }
}
export default FullScreenSlider;
