import React, { Component } from "react";
import { Icon } from "react-icons-kit";
import { CustomLink } from "../../../components";
import { filePath } from "../../Constants";
import { ic_keyboard_arrow_right } from "react-icons-kit/md/";

export default class Template1firstsection extends Component {
  render() {
    const { content } = this.props;
    const backgroundImage =
      "url(" + filePath + this.props.content.firstbgimage + ")";
    return (
      <div>
        {this.props.content.firstbgimage && (
          <div className="container-fluid no-padding mb-5">
            <div
              className="banner-image"
              style={{ backgroundImage: backgroundImage }}
            />
          </div>
        )}
        <div className="container white-bg-p-80 margin-top-negative  mb-5">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <h3 className="heading-large">
                {content.title ? content.title : ""}
              </h3>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <p>{content.description ? content.description : ""}</p>

              {content.btntext && (
                <CustomLink
                  to={content.btnlink ? content.btnlink : "#"}
                  className="arrow-btn mobile-hide"
                >
                  {content.btntext ? content.btntext : ""}
                  <Icon icon={ic_keyboard_arrow_right} />
                </CustomLink>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
