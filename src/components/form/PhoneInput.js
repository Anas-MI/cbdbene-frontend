import React, { Component } from "react";
import ReactPhoneInput from "react-phone-input-2";
import classNames from "classnames";

class PhoneInput extends Component {
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
    const { errorMsg, isError, name, value, dataValidate, label } = this.props;
    const { isFocus } = this.state;
    return (
      <div
        className={classNames("col-12 pl-0 pr-0 has-input", {
          "has-error": isError && !isFocus
        })}
      >
        <label>{label}</label>
        <ReactPhoneInput
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          id={name}
          // name={name}
          inputExtraProps={{
            autocomplete: "tel"
          }}
          name="phone"
          containerClass="react-tel-input react-phone"
          onChange={this.onChange}
          value={value}
          data-validate={dataValidate}
          pattern-type="phone"
        />
        {isError && !isFocus && <p className="error">{errorMsg}</p>}
      </div>
    );
  }
}
export default PhoneInput;
