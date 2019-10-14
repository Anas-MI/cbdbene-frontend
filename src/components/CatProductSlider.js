import React, { Component } from "react";
import Flickity from "react-flickity-component";
import ReactSVG from "react-svg";
import classNames from "classnames";

import { connect } from "react-redux";
import { imagePack, flickityOptions } from "./Constants";
import { ShopItem, ShopIntro } from "./shop";
import { TransitionGroup, CSSTransition } from "react-transition-group";
export class CatProductSliderClass extends Component {
  constructor(props) {
    super(props);
    this.setProducts = this.setProducts.bind(this);
    this.flResize = this.flResize.bind(this);
    this.slideScrollable = this.slideScrollable.bind(this);
    this.state = {
      isDisabled: null,
      stProduct: []
    };
  }
  componentDidMount() {
    this.setProducts(this.props.productsArr || []);
  }
  flResize() {
    this.flkty.resize();
  }

  setProducts(list) {
    list.map((el, i) => {
      this.productLoop = setTimeout(() => {
        this.setState(prevState => ({
          stProduct: [...prevState.stProduct, el]
        }));
      }, 100 * i);
      return null;
    });
  }
  renderProducts(arr) {
    return arr.map((el, index) => (
      <CSSTransition key={index} timeout={500} classNames="transition-item">
        <ShopItem onImageLoad={this.flResize} product={el} />
      </CSSTransition>
    ));
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
      props: {
        productsArr,
        rowClassName,
        intro: { title, desc }
      }
    } = this;

    return (
      <div className={`CPBodyRow CPBodyRow--${rowClassName}`}>
        <ShopIntro
          hideDesc={true}
          title={title}
          desc={desc}
          size={productsArr.length}
        />
        <div className="CPBodyScrollable">
          <div ref={"scroll"} className="CPBodyScrollable-wrapper">
            <TransitionGroup
              className={"carousel"}
              component={Flickity}
              elementType={"div"}
              options={{
                ...flickityOptions
                // on: {
                //   "cellSelect": ()=> {
                //     if(!this.flkty.cells[ this.flkty.selectedIndex - 1 ] ){
                //       if(this.state.isDisabled !== "prev"){
                //         this.setState({
                //           isDisabled: "prev"
                //         })
                //       }
                //     }else if(this.flkty.cells[ this.flkty.selectedIndex + 1 ]){
                //       if(this.state.isDisabled !== "next"){
                //         this.setState({
                //           isDisabled: "next"
                //         })
                //       }
                //     }else{
                //       if(this.state.isDisabled !== null){
                //         this.setState({
                //           isDisabled: null
                //         })
                //       }
                //     }

                //   }
                // }
              }}
              disableImagesLoaded={false}
              reloadOnUpdate
              flickityRef={c => (this.flkty = c)}
            >
              {/* Flickity */}
              {/* <TransitionGroup component={null}> */}
              {/* {this.renderProducts(productsArr)} */}
              {this.renderProducts(this.state.stProduct)}
              {/* </TransitionGroup> */}
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
      </div>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location
});
export const CatProductSlider = connect(mapStateToProps)(CatProductSliderClass);
