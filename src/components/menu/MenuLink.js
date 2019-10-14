import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { CustomLink } from "../";

class MenuLink extends Component {
  render() {
    const {
      children,
      onClick,
      label,
      to,
      className,
      image,
      imageAlt,
      imageClass,
      onMouseEnter,
      onMouseLeave,
      product,
      dispatch,
      ...rest
    } = this.props;
    return (
      <li
        {...rest}
        className={classNames("Nav-listItem", {
          [className]: className
        })}
        onMouseEnter={() => {
          if (typeof onMouseEnter === "function") onMouseEnter();
        }}
        onMouseLeave={() => {
          if (typeof onMouseLeave === "function") onMouseLeave();
        }}
      >
        <CustomLink
          className={classNames("CustomLink Nav-listLink")}
          to={to}
          onClick={() => {
            console.log({
              onClick
            });
            if (typeof onClick === "function") onClick();
          }}
        >
          {image && (
            <img
              className={classNames({
                [imageClass]: imageClass
              })}
              src={image}
              alt={imageAlt}
            />
          )}
          {label && <span className="CustomLink-content">{label}</span>}
        </CustomLink>
        {children}
      </li>
    );
  }
}

export default connect()(MenuLink);
