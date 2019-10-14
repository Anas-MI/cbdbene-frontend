import React, { Component } from "react";
import { Helmet } from "react-helmet";
import classNames from "classnames";
import { projectName } from "../../constantMessage";

export default class Comingsoon extends Component {
  render() {
    const { title, description, className } = this.props;
    return (
      <div
        className={classNames(
          "text-center comingsoon d-flex justify-content-center align-items-center",
          {
            [className]: className
          }
        )}
      >
        <Helmet>
          <title>{title ? title : projectName}</title>
        </Helmet>
        <div>
          <p className="comingsoon-title">{title || "Coming Soon"}</p>
          {description && (
            <p className="comingsoon-description">{description}</p>
          )}
          {/* <Popup /> */}
        </div>
      </div>
    );
  }
}
