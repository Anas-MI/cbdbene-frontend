import React, { Component } from "react";
import { connect } from "react-redux";
import SingleDrCart from "./SingleDrCart";
import "animate.css/animate.min.css";

import { flickityOptions } from "../Constants";
import Flickity from "react-flickity-component";
class DrList extends Component {
  render() {
    const { location } = this.props;
    return (
      <div className="container  ">
        <div className="  ">
          <Flickity
            className={"carousel"} // default ''
            elementType={"div"} // default 'div'
            options={flickityOptions} // takes flickity options {}
            disableImagesLoaded={false} // default false
            reloadOnUpdate // default false
            ref={"flickyRef"}
            flickityRef={c => (this.flkty = c)}
          >
            <SingleDrCart location={location} />
            <SingleDrCart location={location} />
            <SingleDrCart location={location} />
            <SingleDrCart location={location} />
            <SingleDrCart location={location} />
            <SingleDrCart location={location} />
            <SingleDrCart location={location} />
            <SingleDrCart location={location} />
            <SingleDrCart location={location} />
            <SingleDrCart location={location} />
          </Flickity>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location
});

export default connect(mapStateToProps)(DrList);
