import React, { Component } from "react";
import classNames from "classnames";

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      isFocus: false
    };
  }
  onFocus() {
    this.setState({
      isFocus: true
    });
  }
  onBlur() {
    this.setState({
      isFocus: false
    });
  }
  onChange(e) {
    const { onChange } = this.props;
    if (typeof onChange === "function") onChange(e);
  }
  render() {
    const { checked, label, id, name, labelClass } = this.props;
    return (
      <div className="has-inputs has-checkbox-input">
        <input
          type="checkbox"
          checked={checked}
          id={id}
          data-value={this.props["data-value"]}
          name={name}
          onChange={this.onChange}
        />
        <label
          className={classNames({
            [labelClass]: labelClass
          })}
          htmlFor={id}
        >
          <span
            className={classNames("CheckIcon", {
              checked: checked
            })}
          />
          {label}
        </label>
      </div>
    );
  }
}
export default CheckBox;
