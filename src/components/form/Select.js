import React, { Component } from "react";
import classNames from "classnames";

class Select extends Component {
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
    this.props.onChange(e);
  }
  render() {
    const {
      errorMsg,
      isError,
      name,
      value,
      dataPattern,
      dataValidate,
      label,
      maxLength,
      dataMatch,
      selectPlaceHolder,
      selectOptionValue
    } = this.props;
    const { isFocus } = this.state;
    return (
      <div
        className={classNames("col-12 pl-0 pr-0 has-input", {
          "has-error": isError && !isFocus
        })}
      >
        <label>{label}</label>
        <select
          id={name}
          value={value}
          data-validate={dataValidate}
          onChange={this.onChange}
          name={name}
          data-pattern={dataPattern}
          maxLength={maxLength}
          onFocus={this.onFocus}
          data-match={dataMatch}
          onBlur={this.onBlur}
        >
          {selectPlaceHolder && <option>{selectPlaceHolder}</option>}
          {selectOptionValue &&
            selectOptionValue.length > 0 &&
            selectOptionValue.map((key, index) => {
              return (
                <option value={key.value} key={index}>
                  {key.key}
                </option>
              );
            })}
        </select>

        {isError && !isFocus && <p className="error">{errorMsg}</p>}
      </div>
    );
  }
}
export default Select;
