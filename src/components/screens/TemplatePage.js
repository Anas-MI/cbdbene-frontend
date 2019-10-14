import React, { Component } from "react";
import TemplateType02 from "../templates/TemplateType02";

import classNames from "classnames";

export default class TemplatePage extends Component {
  render() {
    const { className } = this.props;
    return (
      <TemplateType02
        className={classNames("", {
          [className]: className
        })}
      />
    );
  }
}
