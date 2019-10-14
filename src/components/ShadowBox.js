import React, { Component } from "react";
import classNames from "classnames";

export default class ShadowBox extends Component {
  render() {
    const { children, className } = this.props;
    return (
      <div
        className={classNames("shadow-box", {
          [className]: className
        })}
      >
        <div className="shadow-box-inner">{children}</div>
      </div>
    );
  }
}
