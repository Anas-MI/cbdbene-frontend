import React, { Component } from "react";

import Comingsoon from "../templates/Comingsoon";
import classNames from "classnames";
export default class Terms extends Component {
  componentDidMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  render() {
    const { className } = this.props;
    return (
      <div
        className={classNames("container-fluid", {
          [className]: className
        })}
      >
        <Comingsoon />
      </div>
    );
  }
}
