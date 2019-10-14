import React, { Component } from "react";
import Icon from "react-icons-kit";
import CustomLink from "./CustomLink";
import { ic_arrow_forward } from "react-icons-kit/md/ic_arrow_forward";

export default class Banner2 extends Component {
  scrollToDiv() {
    this.props.scrollToDiv();
  }

  render() {
    const {
      image,
      smallTitle,
      title,
      description,
      link,
      linkText,
      subDescription
    } = this.props;
    return (
      <div>
        <div className="banner2--inner">
          <div className="banner2--image-wrap">
            {image && <img src={image} alt="" />}
          </div>
          <div className="banner2--inner-content">
            <div className="banner2-content">
              <h5>{smallTitle}</h5>
              <h1><b>{title}</b></h1>
              <p style={{
                fontSize: '19px',
                marginTop: "40px"
              }}>{description}</p>
              {subDescription ? (
                <p>
                  <span
                    onClick={() => this.scrollToDiv()}
                    className="hover-text-line cursor-pointer"
                  >
                    Find out now
                  </span>{" "}
                  which product best fits your needs.
                  <br />
                  <br />
                  {/* We have the{" "}
                  <CustomLink to={link} className="hover-text-line ">
                    widest range
                  </CustomLink>{" "}
                  of CBD products, all manufactured in the USA, from organically
                  grown hemp. */}
                </p>
              ) : (
                ""
              )}
              <br />
              {linkText && (
                <CustomLink to={link} className="Link Link--isBtn">
                  {linkText}
                  <span style={{ paddingLeft: "10px" }}>
                    <Icon className="Link-icon" icon={ic_arrow_forward} />
                  </span>
                </CustomLink>
              )}
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
