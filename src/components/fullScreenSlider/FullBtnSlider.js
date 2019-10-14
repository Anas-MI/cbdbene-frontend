import React, { Component } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import Flickity from "react-flickity-component";
import classNames from "classnames";
import ReactSVG from "react-svg";
import { imagePack, flickityOptions } from "../Constants";
import { FullSlide } from "./";
import CoverSlide from "./CoverSlide";

class FullBtnSlider extends Component {
  constructor(props) {
    super(props);
    this.flResize = this.flResize.bind(this);
    this.slideScrollable = this.slideScrollable.bind(this);
    this.isPrev = true;
    this.isNext = true;
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

    if (this.flkty) {
      if (!this.flkty.cells[this.flkty.selectedIndex - 1]) {
        this.refs.prevBtn.classList.add("disabled");
        this.refs.nextBtn.classList.add("disabled");
      } else if (!this.flkty.cells[this.flkty.selectedIndex + 1]) {
        this.refs.prevBtn.classList.remove("disabled");
        this.refs.nextBtn.classList.add("disabled");
      } else {
        this.refs.prevBtn.classList.remove("disabled");
        this.refs.nextBtn.classList.remove("disabled");
      }
    }
    console.log({
      ref: this.refs,
      flicky: this.flkty
    });
  }
  render() {
    const {
      slides,
      full,
      autoPlay,
      alwaysShowIcon,
      cover,
      nextText,
      prevText //finishText
    } = this.props;
    const flickityOpt = {
      ...flickityOptions,
      autoPlay: autoPlay ? autoPlay : false,
      wrapAround: false,
      draggable: false
    };
    const Slides = slides.map((el, key) => {
      return <FullSlide {...el} key={key} full={full} />;
    });
    return (
      <ScrollAnimation
        className="full-slider-wrapper full-btn-slider position-relative"
        animateOnce
        animateIn="fadeIn"
      >
        <Flickity
          className={"carousel full-slider"}
          disableImagesLoaded={false}
          elementType={"div"}
          reloadOnUpdate
          ref={"flickyRef"}
          flickityRef={c => (this.flkty = c)}
          options={flickityOpt}
        >
          {cover && (
            <CoverSlide
              onBtnClick={() => {
                this.slideScrollable("right");
              }}
              full={true}
              {...cover}
            />
          )}
          {Slides}
        </Flickity>
        <div
          className={classNames("CPBodyScrollable-nav cover-btn-wrapper", {
            "show-icons": alwaysShowIcon
          })}
        >
          <div
            ref={"prevBtn"}
            className={classNames(
              "disabled CPBodyScrollable-navBtnTrigger CPBodyScrollable-navBtnTrigger--left "
            )}
          >
            <button
              className="CPBodyScrollable-navBtn "
              disabled=""
              tabIndex="-1"
              onClick={() => {
                this.slideScrollable("left");
              }}
            >
              <div className="CPBodyScrollable-navBtnWrapper">
                {prevText ? (
                  prevText
                ) : (
                  <ReactSVG width="40" src={imagePack.leftChavron} />
                )}
              </div>
            </button>
          </div>
          <div
            ref={"nextBtn"}
            className={classNames(
              "disabled CPBodyScrollable-navBtnTrigger CPBodyScrollable-navBtnTrigger--right"
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
                {nextText ? (
                  nextText
                ) : (
                  <ReactSVG width="40" src={imagePack.rightChavron} />
                )}
              </div>
            </button>
          </div>
        </div>
      </ScrollAnimation>
    );
  }
}
export default FullBtnSlider;
