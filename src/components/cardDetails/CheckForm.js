import React, { Component } from "react";
import { connect } from "react-redux";
// import { Lodar } from "../";
// import classNames from "classnames";
import { setAPUser } from "../../actions/";
import { Input, fieldValidation } from "../form";
import { Modal, ModalHeader } from "reactstrap";
import { ic_error_outline, ic_done, ic_clear } from "react-icons-kit/md/";
import Icon from "react-icons-kit";
import SelectMulti from "react-select";
import {
  // regEx,
  regExReplace,
  // stateArr,
  imagePack,
  selectStyleSmall,
  accountTypeOpt
} from "../Constants";
import {
  accountNumberMissingMsg,
  accountNumberValidMsg,
  accountHolderMissingMsg,
  accountHolderNameValidMsg,
  accountNumberConfirmMissingMsg,
  accountNumberConfirmValidMsg,
  routingTypeValidMsg,
  routingTypeMissingMsg
  // drivingLicenseMissingErr,
  // drivingLicenseValidMsg
} from "../../constantMessage";
import { addCardAuthorize, clearErrors } from "../../actions";
class CheckForm extends Component {
  constructor(props) {
    super(props);

    this.onTextChange = this.onTextChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.fieldValidation = this.fieldValidation.bind(this);

    this.state = this.initialState(props);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    if (this.state.isSubmitted) {
      if (
        nextProps.cards.cards !== this.props.cards.cards &&
        !nextProps.errors.cards
      ) {
        this.clearOnSuccess();
      }
    }
  }
  componentWillUnmount() {
    console.log("unmount");
    this.props.clearErrors();
  }
  initialState = props => ({
    ambassador: props.ambassadoruser || {},
    ambassador_data: props.ambassadoruser || {},
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
    routingType: "",
    bankName: "",
    bankName_err: null,
    bankName_errMsg: "",
    accType: "Saving",
    minPayAmt: "200.00",
    currency: "USD",
    showModal: false,
    accountType: accountTypeOpt[0],
    modalData: {
      title: "",
      msg: ""
    },
    isSubmitted: false
  });
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

  onSubmitSuccess = () => {
    const { onSubmitSuccess } = this.props;
    if (typeof onSubmitSuccess === "function") {
      onSubmitSuccess();
    }
  };
  changeAccountType = accountType => {
    this.setState({ accountType });
  };
  clearOnSuccess = () => {
    if (this.props.clearOnSuccess) {
      this.setState(
        {
          ...this.initialState(this.props)
        },
        this.onSubmitSuccess
      );
    }
  };

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
      }
      // {
      //   name: "drivingLicense",
      //   check: "required"
      // }
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
      this.setState({
        isSubmitted: true
      });
      const { routingType, accountNumber, accName, accountType } = this.state;
      const bodyData = {
        accountType: accountType.value,
        routingNumber: routingType,
        accountNumber,
        nameOnAccount: accName
      };
      const oldCards = this.props.cards.cards;
      this.props.addCardAuthorize({
        bank: bodyData,
        user: this.props.user,
        oldCards
      });
    }
    // await console.log("Working");
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
      showModal,
      modalData,
      accountNumberConfirm,
      accountNumberConfirm_errMsg,
      accountNumberConfirm_err,
      routingType_err,
      routingType_errMsg,
      // drivingLicense,
      // drivingLicense_err,
      // drivingLicense_errMsg,
      // dlState
      accountType
    } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center Regular">
          <div className="col-lg-12 p-5 col-md-12">
            <div className="inside-form Larger ">
              <h3 className="product-title">Payment Details</h3>
              {/* <p>
                You must submit Tax Information to be able to edit Payment
                Information or to change Payee/Account Holder's Name.
              </p> */}
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
                  <div className="col-md-6">
                    <div className="col-12 pl-0 pr-0">
                      <div className="has-input">
                        <label>Account Type*</label>
                      </div>
                      <SelectMulti
                        id="accountType"
                        styles={selectStyleSmall}
                        value={accountType}
                        isMulti={false}
                        placeholder="Account Type"
                        onChange={this.changeAccountType}
                        options={accountTypeOpt}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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
                  <div className="col-md-4">
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
                </div> */}

                <br />

                <div>
                  {this.props.errors &&
                    this.props.errors.cards &&
                    this.props.errors.cards.map((el, index) => (
                      <div key={index} className="alert alert-danger mb-2">
                        <p className="error mb-0"> {el}</p>
                      </div>
                    ))}
                </div>
                <div className="row frm-details">
                  <div className="col-md-4 pl-0 pr-0">
                    <div className="col-12 has-input">
                      <button className="btn btn3"> Save account</button>
                    </div>
                    <br />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Modal
          isOpen={showModal}
          toggle={this.modalDismis}
          className={"full-modal"}
        >
          <ModalHeader toggle={this.modalDismis}>{modalData.title}</ModalHeader>
          <div className="Modal-body center-modal">
            <div className="modal-inner">
              <div className="modal-content">
                {modalData.title === "Error" ? (
                  <div style={{ color: "#EF233C", textAlign: "center" }}>
                    <Icon
                      className="popup-alert-icon"
                      size={64}
                      icon={ic_error_outline}
                    />
                  </div>
                ) : (
                  <Icon className="popup-alert-icon" size={64} icon={ic_done} />
                )}
                <p className="text-center title-80 p-3">{modalData.msg}</p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
  user: state.user,
  cards: state.cards,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { setAPUser, addCardAuthorize, clearErrors }
)(CheckForm);
