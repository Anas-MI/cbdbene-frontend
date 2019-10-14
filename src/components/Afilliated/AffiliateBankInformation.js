import React, { Component } from "react";
import { connect } from "react-redux";
// import { isEmail, isEmpty, isMobilePhone, isNumeric } from "validator";
import { Lodar } from "../";
import classNames from "classnames";
import PopUpModel from "./PopUpModel";
import { setAPUser } from "../../actions/";
import { Input, fieldValidation } from "../form";
import { updateAffBank } from "../../services/api";

import {
  // regEx,
  regExReplace,
  stateArr,
  imagePack
} from "../Constants";
import {
  ambassadorBankUpdateMessage,
  formErrorMessage,
  accountNumberMissingMsg,
  accountNumberValidMsg,
  accountHolderMissingMsg,
  accountHolderNameValidMsg,
  // accountBankValidMsg,
  // accountBankMissingMsg,
  accountNumberConfirmMissingMsg,
  accountNumberConfirmValidMsg,
  routingTypeValidMsg,
  routingTypeMissingMsg,
  drivingLicenseMissingErr,
  drivingLicenseValidMsg
} from "../../constantMessage";
class AffiliateBankInformation extends Component {
  constructor(props) {
    super(props);

    this.onTextChange = this.onTextChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.fieldValidation = this.fieldValidation.bind(this);
    this.disableModel = this.disableModel.bind(this);
    this.autoModalOff = this.autoModalOff.bind(this);

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
  componentDidMount() {
    const { ambassadoruser } = this.props;
    if (ambassadoruser && ambassadoruser.bank) {
      const bank = ambassadoruser.bank;
      this.setState({
        minPayAmt: bank.minPayAmt,
        currency: bank.currency,
        accName: bank.accName,
        accName_err: false,
        accName_errMsg: "",
        routingType: bank.routingType,
        routingType_err: false,
        routingType_errMsg: "",
        accountNumber: bank.accountNumber,
        accountNumber_err: false,
        accountNumber_errMsg: "",
        accountNumberConfirm: bank.accountNumberConfirm,
        accountNumberConfirm_err: false,
        accountNumberConfirm_errMsg: "",
        paymentMethod: bank.paymentMethod,
        bankName: bank.bankName,
        bankName_err: false,
        bankName_errMsg: "",
        drivingLicense: bank.drivingLicense,
        drivingLicense_err: false,
        drivingLicense_errMsg: "",
        dlState: bank.dlState,
        accType: bank.accType,
        showModal: false
      });
    }
  }

  disableModel() {
    if (this.modalInterval) {
      clearTimeout(this.modalInterval);
    }
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }
  autoModalOff() {
    if (this.modalInterval) {
      clearTimeout(this.modalInterval);
    }
    this.modalInterval = setTimeout(() => {
      this.setState({
        showModal: false
      });
    }, 5000);
  }
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
        this.fieldValidation(name, type, match);
      }
    );
  };
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
    e.preventDefault();
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
    await validateArr.map(el =>
      this.fieldValidation(el.name, el.check, el.match && this.state[el.match])
    );

    if (
      validateArr.every(el => {
        if (this.state[el.name + "_err"] === false) return true;

        return false;
      })
    ) {
      const bank = {
        minPayAmt: this.state.minPayAmt,
        currency: this.state.currency,
        accName: this.state.accName,
        routingType: this.state.routingType,
        accountNumber: this.state.accountNumber,
        accountNumberConfirm: this.state.accountNumberConfirm,
        // paymentMethod: this.state.paymentMethod,
        // bankName: this.state.bankName,
        // accType: this.state.accType,
        drivingLicense: this.state.drivingLicense,
        dlState: this.state.dlState
      };
      const { ambassadoruser } = this.props;
      const id = ambassadoruser._id;
      updateAffBank(id, bank)
        .then(res => res.json())
        .then(resJson => {
          if (resJson.status) {
            this.setState({
              showModal: true,
              modalData: {
                title: "Success",
                msg: ambassadorBankUpdateMessage
              }
            });
            this.props.setAPUser(resJson.data);
            this.autoModalOff();
          } else {
            this.setState({
              showModal: true,
              modalData: {
                title: "Error",
                msg: formErrorMessage
              }
            });
            this.autoModalOff();
          }
        })
        .catch(err => {
          this.setState({
            showModal: true,
            modalData: {
              title: "Error",
              msg: formErrorMessage
            }
          });
          this.autoModalOff();
        });
    }
    await console.log("Working");
  };
  render() {
    const {
      accountNumber,
      // paymentMethod,
      accName,
      routingType,
      // bankName,
      // accType,
      minPayAmt,
      currency,
      accountNumber_err,
      accountNumber_errMsg,
      accName_err,
      accName_errMsg,
      // bankName_err,
      // bankName_errMsg,
      showModal,
      modalData,
      accountNumberConfirm,
      accountNumberConfirm_errMsg,
      accountNumberConfirm_err,
      routingType_err,
      routingType_errMsg,
      drivingLicense,
      drivingLicense_err,
      drivingLicense_errMsg,
      dlState
      // dlState_err,
      // dlState_errMsg,
    } = this.state;
    // const routingTypeOpt = ["Sorting code", "Routing number", "Swift BIC"];
    // const paymentMethodOpt = ["Direct Deposit"];
    // const accTypeOpt = ["Current", "Saving"];
    return (
      <div className="container pl-0 pr-0">
        {this.state.SpinnerToggle && <Lodar />}
        <h2>Bank Information</h2>
        <p>
          You must submit Tax Information to be able to edit Payment Information
          or to change Payee/Account Holder's Name.
        </p>
        <div className="w100 d-block pt-3 pb-3">
          <img
            src={imagePack.checkHelp}
            alt="routing number help"
            className="img-fluid"
          />
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="row frm-details">
            <div className="col-md-6">
              <div
                className={classNames("has-input", {
                  "has-error": false
                })}
              >
                <label>Minimum Payment Amount*</label>
                <input
                  data-validate={["name", "required"]}
                  // onChange={this.onTextChange}
                  disabled
                  value={minPayAmt}
                  type="text"
                  name="minPayAmt"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div
                className={classNames("has-input", {
                  "has-error": false
                })}
              >
                <label> Currency*</label>
                <input
                  id="shipping_first_name"
                  data-validate={["name", "required"]}
                  // onChange={this.onTextChange}
                  disabled
                  value={currency}
                  type="text"
                  name="currency"
                />
              </div>
            </div>
          </div>
          <div className="row frm-details">
            <div className="col-md-6">
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
              {/* <div
                className={classNames("has-input", {
                  "has-error": accName_err
                })}
              >
                <label>Name on Account*</label>
                <input
                  id="shipping_first_name"
                  dataValidate={["required"]}
                  onChange={this.onTextChange}
                  dataPattern=""
                  value={accName}
                  type="text"
                  name="accName"
                  maxLength="40"
                />
                {accName_err && (
                  <p className="error">
                    {accName_errMsg && accName_errMsg === "can't be empty"
                      ? accountHolderMissingMsg
                      : accountHolderNameValidMsg}
                  </p>
                )}
              </div> */}
            </div>
            <div className="col-md-6">
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
                  routingType_errMsg && routingType_errMsg === "can't be empty"
                    ? routingTypeMissingMsg
                    : routingTypeValidMsg
                }
              />
            </div>
          </div>
          <div className="row frm-details">
            <div className="col-md-6">
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
            <div className="col-md-6">
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
          {/* <div className="row frm-details">
            <div className="col-md-6">
              <div
                className={classNames("has-input", {
                  "has-error": false
                })}
              >
                <label> Payment Method*</label>
                <select
                  value={paymentMethod}
                  name="paymentMethod"
                  onChange={this.onSelectChange}
                  className="form-control"
                >
                  {paymentMethodOpt.map((el, index) => (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className={classNames("has-input", {
                  "has-error": false
                })}
              >
                <label> Account Type*</label>
                <select
                  value={accType}
                  name="accType"
                  onChange={this.onSelectChange}
                  className="form-control"
                >
                  {accTypeOpt.map((el, index) => (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div> */}
          <div className="row frm-details">
            <div className="col-md-6">
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
            <div className="col-md-6">
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
          {/* <div className="row frm-details">
            <div className="col-md-12">
              <div
                className={classNames("has-input", {
                  "has-error": bankName_err
                })}
              >
                <label>Bank Name*</label>
                <input
                  id="shipping_first_name"
                  data-validate={["required"]}
                  data-pattern=""
                  onChange={this.onTextChange}
                  value={bankName}
                  type="text"
                  name="bankName"
                  maxLength="40"
                />
                {bankName_err && (
                  <p className="error">
                    {bankName_errMsg && bankName_errMsg === "can't be empty"
                      ? accountBankMissingMsg
                      : accountBankValidMsg}
                  </p>
                )}
              </div>
            </div>
          </div> */}
          <br />
          <div className="row frm-details">
            <div className="col-md-4 pl-0 pr-0">
              <div className="col-12 has-input">
                <button className="btn btn3"> Update</button>
              </div>
              <br />
            </div>
          </div>
        </form>
        <PopUpModel
          showModal={showModal}
          modalData={modalData}
          disableModel={() => this.disableModel()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
  ambassadoruser: state.ambassadoruser
});
export default connect(
  mapStateToProps,
  { setAPUser }
)(AffiliateBankInformation);
