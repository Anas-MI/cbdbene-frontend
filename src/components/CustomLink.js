import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

export default class CustomLink extends Component {
  render() {
    const { children, className, to, ...rest } = this.props;
    if (to) {
      return to.split("//")[0].includes("http") ? (
        <a
          className={classNames("cursor-pointer", {
            [className]: className
          })}
          {...rest}
          href={to}
        >
          {children}
        </a>
      ) : (
        <Link
          className={classNames("cursor-pointer", {
            [className]: className
          })}
          {...rest}
          to={to}
        >
          {children}
        </Link>
      );
    }
    return (
      <span
        className={classNames("cursor-pointer", {
          [className]: className
        })}
        {...rest}
      >
        {children}
      </span>
    );
  }
}
