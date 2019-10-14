import React, { Component } from "react";
import classNames from "classnames";

export default class TopNumberCard extends Component {
  render() {
    const { number, title, subTitle, children, direction } = this.props;

    const directionClass = `top-number-card--${direction}`;
    return (
      <div
        className={classNames("top-number-card top-number-card--left", {
          [directionClass]: direction
        })}
      >
        <div className="top-number-card__inner">
          <div className="top-number-card__number-wrapper">
            <span className="top-number-card__number">{number}</span>
          </div>
          <div className="top-number-card__body">
            <div className="top-number-card__body-inner">
              <h3 className="top-number-card__title">{title}</h3>
              <h4 className="top-number-card__subtitle">{subTitle}</h4>
              <div className="top-number-card__content">{children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
