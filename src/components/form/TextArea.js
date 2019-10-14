import React, { Component } from "react";
import classNames from "classnames";

class TextArea extends Component {
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
      //   type,
      label,
      maxLength,
      dataMatch
    } = this.props;
    const { isFocus } = this.state;
    return (
      <div
        className={classNames("col-12 pl-0 pr-0 has-input", {
          "has-error": isError && !isFocus
        })}
      >
        <label>{label}</label>
        <textarea
          id={name}
          value={value}
          data-validate={dataValidate}
          onChange={this.onChange}
          //   type={type ? type : "text"}
          name={name}
          data-pattern={dataPattern}
          maxLength={maxLength}
          onFocus={this.onFocus}
          data-match={dataMatch}
          onBlur={this.onBlur}
          autoComplete="nope"
        />
        {isError && !isFocus && <p className="error">{errorMsg}</p>}
      </div>
    );
  }
}
export default TextArea;
