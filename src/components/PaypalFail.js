import React, { Component } from "react";
import classNames from "classnames";
export default class PaypalFail extends Component {
  render() {
    const { className } = this.props;
    return (
      <div
        className={classNames(
          "text-center comingsoon d-flex justify-content-center align-items-center",
          {
            [className]: className
          }
        )}
      >
        <div>
          <h2>Paypal payment transaction failed.</h2>
        </div>
      </div>
    );
  }
}
