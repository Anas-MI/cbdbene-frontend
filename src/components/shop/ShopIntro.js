import React, { Component } from "react";
import { connect } from "react-redux";
import ReactSVG from "react-svg";
import classNames from "classnames";

import { CustomLink } from "../";
import { imagePack } from "../Constants";

class ShopIntro extends Component {
  render() {
    const { title, className, size, desc, location, hideDesc } = this.props;
    return (
      <div className={"CPSubcatIntro CPBodyRow-intro " + className}>
        <div className="CPSubcatIntroDescription mt-md-5 pt-md-5">
          <CustomLink
            className="CPSubcatIntroDescription-btn"
            to={`/${location.countryCode}/category/${title}`}
          >
            <h2 className="CPSubcatIntroDescription-name mt-md-5">{title}</h2>
          </CustomLink>
          <p
            className={classNames("CPSubcatIntroDescription-info d-none d-md-block", {
              invisible: hideDesc
            })}
          >
            {desc}
          </p>
        </div>
        <div className="CPSubcatIntroCTA ">
          <CustomLink
            to={`/${location.countryCode}/category/${title}`}
            className="CPSubcatIntroCTA-btn"
          >
            <div className="CPSubcatIntroCTA-wrapper">
              <span className="CPSubcatIntroCTA-text">
                See all {title} ({size})
              </span>
              <ReactSVG width="40" src={imagePack.rightArrow} />
            </div>
          </CustomLink>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location
});
export default connect(mapStateToProps)(ShopIntro);
