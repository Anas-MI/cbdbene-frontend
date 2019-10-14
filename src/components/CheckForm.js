import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { Input, fieldValidation } from "./form";
import { regExReplace, stateArr, imagePack } from "./Constants";
import {
  accountNumberMissingMsg,
  accountNumberValidMsg,
  accountHolderMissingMsg,
  accountHolderNameValidMsg,
  accountNumberConfirmMissingMsg,
  accountNumberConfirmValidMsg,
  routingTypeValidMsg,
  routingTypeMissingMsg,
  drivingLicenseMissingErr,
  drivingLicenseValidMsg
} from "../constantMessage";
class CheckForm extends Component {
  constructor(props) {
    super(props);

    this.onTextChange = this.onTextChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.fieldValidation = this.fieldValidation.bind(this);

    this.state = {
      ambassador: this.props.ambassadoruser || {},
      ambassador_data: this.props.ambassadoruser || {},
      accountNumber: "",
      accountNumber_err: null,
      accountNumber_errMsg: "",
      accountNumberConfirm: "",
      accountNumberConfirm_err: null,
      accountNumberConfirm_errMsg: "",
      paymentMethod: "Direct Deposit",
      accName: "",
      accName_err: null,
      accName_errMsg: "",
      routingType: "Routing number",
      bankName: "",
      bankName_err: null,
      bankName_errMsg: "",
      accType: "Saving",
      minPayAmt: "200.00",
      currency: "USD",
      showModal: false,
      modalData: {
        title: "",
        msg: ""
      }
    };
  }
  componentDidMount() {}

  onTextChange = e => {
    const { value, name } = e.target;
    let type = "";
    if (e.target.attributes["data-validate"])
      type = e.target.attributes["data-validate"].value;

    let pattern = null;
    if (e.target.attributes["data-pattern"])
      pattern = e.target.attributes["data-pattern"].value;

    let match = null;
    if (e.target.attributes["data-match"])
      match = e.target.attributes["data-match"].value;

    let newValue = value;

    if (pattern) {
      newValue = value.replace(regExReplace[pattern], "");
    }

    this.setState(
      {
        [name]: newValue
      },
      () => {
        this.fieldValidationBank(name, type, match);
      }
    );
  };
  fieldValidationBank(field, type, match) {
    const { isError, errorMsg } = fieldValidation(
      this.state[field],
      type,
      match
    );

    this.setState({
      [field + "_err"]: isError,
      [field + "_errMsg"]: errorMsg
    });
  }
  onSelectChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  fieldValidation(field, type, match) {
    const { isError, errorMsg } = fieldValidation(
      this.state[field],
      type,
      match
    );

    this.setState({
      [field + "_err"]: isError,
      [field + "_errMsg"]: errorMsg
    });
  }

  onSubmit = async e => {
    const validateArr = [
      {
        name: "accName",
        check: "required"
      },
      {
        name: "routingType",
        check: "required, number, routingNumber"
      },
      {
        name: "accountNumber",
        check: "required, number"
      },
      {
        name: "accountNumberConfirm",
        check: "required, number, repassword",
        match: "accountNumber"
      },
      {
        name: "drivingLicense",
        check: "required"
      }
    ];

    const bank = {
      minPayAmt: this.state.minPayAmt,
      currency: this.state.currency,
      accName: this.state.accName,
      routingType: this.state.routingType,
      accountNumber: this.state.accountNumber,
      accountNumberConfirm: this.state.accountNumberConfirm,
      drivingLicense: this.state.drivingLicense,
      dlState: this.state.dlState
    };
    //  this.props.saveBankDetails(bank);

    await console.log("Working");
  };
  render() {
    const {
      accountNumber,
      accName,
      routingType,
      accountNumber_err,
      accountNumber_errMsg,
      accName_err,
      accName_errMsg,
      accountNumberConfirm,
      accountNumberConfirm_errMsg,
      accountNumberConfirm_err,
      routingType_err,
      routingType_errMsg,
      drivingLicense,
      drivingLicense_err,
      drivingLicense_errMsg,
      dlState
    } = this.state;
    return (
      <div className="container">
        <div className="row ">
          <div className="col-lg-12 col-md-12">
            <div className="inside-form Larger ">
              <h3 className="product-title">Payment Details</h3>

              <div className="w100 d-block pt-3 pb-3">
                <img
                  src={imagePack.checkHelp}
                  alt="routing number help"
                  className="img-fluid"
                />
              </div>

              <div className="row frm-details">
                <div className="col-md-12">
                  <Input
                    label="Name on Account*"
                    name="accName"
                    value={accName}
                    onChange={this.onTextChange}
                    dataValidate={["required"]}
                    dataPattern=""
                    maxLength="40"
                    isError={accName_err}
                    errorMsg={
                      accName_errMsg && accName_errMsg === "can't be empty"
                        ? accountHolderMissingMsg
                        : accountHolderNameValidMsg
                    }
                  />
                </div>
                <div className="col-md-12">
                  <Input
                    label="Bank Routing Number*"
                    name="routingType"
                    value={routingType}
                    dataPattern="onlyNumber"
                    placeholder="9 digits"
                    dataValidate={["number", "required", "routingNumber"]}
                    isError={routingType_err}
                    onChange={this.onTextChange}
                    maxLength={9}
                    errorMsg={
                      routingType_errMsg &&
                      routingType_errMsg === "can't be empty"
                        ? routingTypeMissingMsg
                        : routingTypeValidMsg
                    }
                  />
                </div>
              </div>
              <div className="row frm-details">
                <div className="col-md-12">
                  <Input
                    label="Checking Account Number*"
                    name="accountNumber"
                    value={accountNumber}
                    dataPattern="onlyNumber"
                    placeholder="Up to 17 digits"
                    dataValidate={["number", "required"]}
                    isError={accountNumber_err}
                    maxLength={17}
                    onChange={this.onTextChange}
                    errorMsg={
                      accountNumber_errMsg &&
                      accountNumber_errMsg === "can't be empty"
                        ? accountNumberMissingMsg
                        : accountNumberValidMsg
                    }
                  />
                </div>
                <div className="col-md-12">
                  <Input
                    label="Re-enter Checking Account Number*"
                    name="accountNumberConfirm"
                    value={accountNumberConfirm}
                    dataPattern="onlyNumber"
                    placeholder="Up to 17 digits"
                    dataValidate={["number", "required", "repassword"]}
                    isError={accountNumberConfirm_err}
                    maxLength={17}
                    onChange={this.onTextChange}
                    dataMatch={accountNumber}
                    errorMsg={
                      accountNumberConfirm_errMsg &&
                      accountNumberConfirm_err === "can't be empty"
                        ? accountNumberConfirmMissingMsg
                        : accountNumberConfirmValidMsg
                    }
                  />
                </div>
              </div>

              <div className="row frm-details">
                <div className="col-md-12">
                  <Input
                    label="Driver's License Number*"
                    name="drivingLicense"
                    value={drivingLicense}
                    dataPattern="onlyNumber"
                    dataValidate={["required"]}
                    isError={drivingLicense_err}
                    onChange={this.onTextChange}
                    errorMsg={
                      drivingLicense_errMsg &&
                      drivingLicense_errMsg === "can't be empty"
                        ? drivingLicenseMissingErr
                        : drivingLicenseValidMsg
                    }
                  />
                </div>
                <div className="col-md-12">
                  <div
                    className={classNames("has-input", {
                      "has-error": false
                    })}
                  >
                    <label> State*</label>
                    <select
                      value={dlState}
                      name="dlState"
                      onChange={this.onSelectChange}
                      className="form-control"
                    >
                      {stateArr.map((el, index) => (
                        <option key={index} value={el}>
                          {el}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location
});
export default connect(
  mapStateToProps,
  {}
)(CheckForm);
