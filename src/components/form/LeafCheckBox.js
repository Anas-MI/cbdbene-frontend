import React, { Component } from "react";
import classNames from "classnames";
import { imagePack } from "../Constants";

class LeafCheckBox extends Component {
  onChange = ev => {
    const { onChange } = this.props;
    if (typeof onChange === "function") onChange(ev);
  };

  elId = Math.random()
    .toString()
    .split(".")[1];
  render() {
    const { checked, label, children, id, value, className } = this.props;
    return (
      <div
        className={classNames("leaf-checkbox-wrapper", {
          [className]: className
        })}
      >
        <label
          className="cursor-pointer leaf-checkbox-label"
          htmlFor={id ? id : this.elId}
        >
          <input
            value={value}
            onChange={this.onChange}
            type="checkbox"
            id={id ? id : this.elId}
            checked={checked}
            className="d-none"
          />
          {checked && <img src={imagePack.beneLeaf} alt="checked" />}
          {!checked && <img src={imagePack.beneLeafHollow} alt="unchecked" />}
          <span>{label}</span>
          {children && <div className="leaf-checkbox-children">{children}</div>}
        </label>
      </div>
    );
  }
}

export default LeafCheckBox;
