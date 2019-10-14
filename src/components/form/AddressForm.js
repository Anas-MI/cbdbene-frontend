import React, { Component } from "react";
import { Input, PhoneInput } from "./";
import AddressAutoFill from "../AddressAutoFill";

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
  }
  onChange(e) {
    const { onChange, onValidate } = this.props;
    if (typeof onChange === "function") onChange(e);

    if (typeof onValidate === "function") onValidate(e);
  }
  onPhoneChange(e) {
    const { onPhoneChange, onValidate } = this.props;
    if (typeof onPhoneChange === "function") onPhoneChange(e);

    if (typeof onValidate === "function") onValidate(e);
  }
  render() {
    const {
      title,
      name,
      nameId,
      nameErr,
      nameErrMsg,
      lastName,
      lastNameId,
      lastNameErr,
      lastNameErrMsg,
      email,
      emailId,
      emailErr,
      emailErrMsg,
      phone,
      phoneId,
      phoneErr,
      phoneErrMsg,
      // zip,
      // zipId,
      zipErr,
      // zipErrMsg,

      addressData,
      addressErr,
      onAddressChange
    } = this.props;
    return (
      <div>
        <h2 className="product-title">{title}</h2>
        <Input
          label="First Name*"
          value={name}
          name={nameId}
          isError={nameErr}
          errorMsg={nameErrMsg}
          dataValidate={["name", "required"]}
          dataPattern="name"
          onChange={this.onChange}
        />
        <Input
          label="Last Name*"
          value={lastName}
          name={lastNameId}
          isError={lastNameErr}
          errorMsg={lastNameErrMsg}
          dataValidate={["name", "required"]}
          dataPattern="name"
          onChange={this.onChange}
        />
        <Input
          label="Email Address*"
          value={email}
          name={emailId}
          isError={emailErr}
          errorMsg={emailErrMsg}
          dataValidate={["email", "required"]}
          onChange={this.onChange}
          />
        <PhoneInput
          label="Phone*"
          value={phone}
          // autoComplete="tel"
          name={phoneId}
          isError={phoneErr}
          errorMsg={phoneErrMsg}
          data-validate={["phone", "required"]}
          pattern-type="phone"
          onChange={this.onPhoneChange}
        />
        <AddressAutoFill
          autofillformresponse={onAddressChange}
          autofilladddatatoparent={addressData}
          address_err={addressErr}
          zipErr={zipErr}
          colSize="12"
        />
        {/* <Input
          label="Zip Code*"
          value={zip}
          name={zipId}
          isError={zipErr}
          errorMsg={zipErrMsg}
          maxLength="12"
          dataValidate={["zipcode", "required"]}
          onChange={this.onChange}
        /> */}
      </div>
    );
  }
}

export default AddressForm;
