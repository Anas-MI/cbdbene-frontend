import React, { Component } from "react";
import classNames from "classnames";

import waterfall from "async-waterfall";
import MyProfileAddress2 from "./MyProfileAddress2";
import { profileUpdateMessage } from "../constantMessage";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { regExReplace } from "./Constants";
import AddressAutoFill from "./AddressAutoFill";
import { isAlpha, isEmail, isEmpty, isNumeric } from "validator";
import { Modal, Card, Alert, CardTitle, ModalHeader } from "reactstrap";
import { connect } from "react-redux";

import { ic_error_outline, ic_done, ic_clear } from "react-icons-kit/md/";
import Icon from "react-icons-kit";
import { addUpdateUserDetails, getSingleUserApi } from "../services/api/";
import { countryCodeList } from "./allCountryCode";
import BasicFunction from "../services/extra/basicFunction";
const basicFunction = new BasicFunction();
class MyProfileAddress extends Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.fieldVaidation = this.fieldVaidation.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.getuserDetails = this.getuserDetails.bind(this);
    this.modalDismis = this.modalDismis.bind(this);
    this.toggleBillingAddress = this.toggleBillingAddress.bind(this);
    this.handelTextChangePhone = this.handelTextChangePhone.bind(this);
    this.shippingaddressautoFill = this.shippingaddressautoFill.bind(this);
    this.autoModalOff = this.autoModalOff.bind(this);
    // this.shippingformSubmitUsingBillingForm = this.shippingformSubmitUsingBillingForm.bind(this);
    this.state = {
      selectedCountry: null,
      selectedRegion: null,
      selectedCity: null,
      selectedShippingRegion: null,
      selectedShippingCountry: null,
      selectedShippingCity: null,
      sameShipping: false,
      shipping_first_name: "",
      shipping_first_name_err: null,
      shipping_first_name_errMsg: "",
      shipping_last_name: "",
      shipping_last_name_err: null,
      shipping_last_name_errMsg: "",
      shipping_email_name: "",
      shipping_email_name_err: null,
      shipping_email_name_errMsg: "",
      shipping_phone_name: "",
      shipping_phone_name_err: null,
      shipping_phone_name_errMsg: "",
      shipping_address_name_01: "",
      shipping_address_name_01_err: null,
      shipping_address_name_01_errMsg: "",
      shipping_address_name_02: "",
      shipping_address_name_02_err: null,
      shipping_address_name_02_errMsg: "",
      shipping_address_town: "",
      shipping_address_town_err: null,
      shipping_address_town_errMsg: "",
      showModal: false,
      isLoading: false,
      registration_id: null,
      userDetailsRes: null,
      BillingAddress: true,
      modalData: {
        title: "",
        msg: ""
      },
      addressData: {
        country: false,
        state: false,
        city: false,
        address: false
      }
    };
  }
  modalDismis() {
    if (this.modalInterval) {
      clearTimeout(this.modalInterval);
    }
    this.setState({
      isLoading: false,
      showModal: false
    });
  }
  autoModalOff() {
    if (this.modalInterval) {
      clearTimeout(this.modalInterval);
    }
    this.modalInterval = setTimeout(() => {
      this.setState({
        showModal: false
      });
    }, 3000);
  }
  componentDidMount() {
    const countryDialCode = basicFunction.getDialCode(
      countryCodeList,
      this.props.location.countryCode
    );
    this.setState({
      shipping_phone_name: countryDialCode
    });

    const { user } = this.props;
    if (user._id) {
      this.setState({
        registration_id: user._id
      });
      this.getuserDetails(user._id);
    }
  }
  getuserDetails(_id) {
    getSingleUserApi(_id)
      .then(res => {
        return res.json();
      })
      .then(rep => {
        if (rep.user) {
          this.setState({
            userDetailsRes: rep.user
          });
          if (rep.user.billingdetails) {
            this.setState({
              BillingAddress: false
            });
          }
          if (rep.user.shippingdetails) {
            this.setState({
              shipping_first_name: rep.user.shippingdetails.firstname,
              shipping_last_name: rep.user.shippingdetails.lastname,
              shipping_email_name: rep.user.shippingdetails.email,
              shipping_phone_name: rep.user.shippingdetails.phone,
              shipping_address_name_01: rep.user.shippingdetails.address1,
              shipping_address_name_02: rep.user.shippingdetails.address2,
              shipping_address_town: rep.user.shippingdetails.city,
              shipping_zip_code: rep.user.shippingdetails.zip,
              selectedShippingRegion: rep.user.shippingdetails.region,
              selectedShippingCountry: rep.user.shippingdetails.country,
              selectedShippingCity: rep.user.shippingdetails.state,
              addressData: {
                country:
                  rep.user.shippingdetails.country.value ||
                  rep.user.shippingdetails.country,
                state:
                  rep.user.shippingdetails.state.value ||
                  rep.user.shippingdetails.state,
                city: rep.user.shippingdetails.city,
                address: rep.user.shippingdetails.address1
              }
            });
          }
        } else {
        }
      })
      .catch(error => {});
  }
  shippingaddressautoFill(e) {
    this.setState({
      shipping_address_name_01: e.other,
      selectedShippingCountry: e.country,
      selectedShippingCity: e.state,
      shipping_address_town: e.city
    });
  }
  toggleBillingAddress() {
    this.setState({
      BillingAddress: !this.state.BillingAddress
    });
  }
  handelTextChangePhone(e) {
    if (e) {
      this.setState(
        {
          shipping_phone_name: e
        },
        () => {
          this.fieldVaidation("shipping_phone_name", "phone");
        }
      );
    } else {
      this.setState(
        {
          shipping_phone_name: ""
        },
        () => {
          this.fieldVaidation("shipping_phone_name", "phone");
        }
      );
    }
  }
  handleTextChange(e) {
    const { value, id } = e.target;
    let type = [];
    let match = null;

    if (e.target.attributes["data-validate"])
      type = e.target.attributes["data-validate"].value;
    if (e.target.attributes["data-match"])
      match = e.target.attributes["data-match"].value;

    let pattern = null;

    if (e.target.attributes["data-pattern"])
      pattern = e.target.attributes["data-pattern"].value;

    let newValue = value;

    if (pattern) {
      newValue = value.replace(regExReplace[pattern], "");
    }

    this.setState(
      {
        [e.target.id]: newValue
      },
      () => {
        this.fieldVaidation(id, type, match);
      }
    );
  }
  fieldVaidation(field, type) {
    const typeArr = type.split(",");
    if (typeArr.includes("required")) {
      if (!isEmpty(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "can't be empty"
        });
        return;
      }
    }
    if (typeArr.includes("name")) {
      if (isAlpha(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "Only Alphabets"
        });
        return;
      }
    }
    if (typeArr.includes("email")) {
      if (isEmail(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "Email Not Valid"
        });
        return;
      }
    }
    if (typeArr.includes("phone")) {
      if (isValidPhoneNumber(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "Phone number is not valid"
        });
        return;
      }
    }
    if (typeArr.includes("zipcode")) {
      // if(isPostalCode(this.state[field])){
      if (isNumeric(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "Zip Code Not Valid"
        });
        return;
      }
    }
  }

  shippingformSubmitUsingBillingForm() {
    const {
      shipping_first_name,
      shipping_last_name,
      shipping_email_name,
      shipping_phone_name,
      shipping_address_name_01,
      shipping_address_name_02,
      shipping_address_town,
      selectedShippingRegion,
      selectedShippingCountry,
      selectedShippingCity,
      shipping_zip_code
    } = this.state;
    waterfall([
      done => {
        this.fieldVaidation("shipping_first_name", "required,name");
        this.fieldVaidation("shipping_last_name", "required,name");
        this.fieldVaidation("shipping_email_name", "required,email");
        this.fieldVaidation("shipping_phone_name", "required,phone");
        this.fieldVaidation("shipping_address_name_01", "required");
        this.fieldVaidation("shipping_address_town", "required");

        return done();
      },

      done => {
        const {
          shipping_first_name_err,
          shipping_last_name_err,
          shipping_email_name_err,
          shipping_phone_name_err,
          shipping_address_name_01_err,
          shipping_address_name_02_err,
          shipping_address_town_err
        } = this.state;
        if (
          !shipping_first_name_err &&
          !shipping_last_name_err &&
          !shipping_email_name_err &&
          !shipping_phone_name_err &&
          !shipping_address_name_01_err &&
          !shipping_address_name_02_err &&
          !shipping_address_town_err
        ) {
          this.setState({
            isLoading: true,
            showModal: true
          });
          const shippingdetails = {
            firstname: shipping_first_name,
            lastname: shipping_last_name,
            email: shipping_email_name,
            phone: shipping_phone_name,
            address1: shipping_address_name_01,
            address2: shipping_address_name_02,
            city: shipping_address_town,
            zip: shipping_zip_code,
            region: selectedShippingRegion,
            country: selectedShippingCountry,
            state: selectedShippingCity
          };
          const userId = this.state.registration_id;
          addUpdateUserDetails({
            userid: userId,
            shippingdetails
          })
            .then(res => res.json())
            .then(resJson => {
              this.props.updateChckBoxafteruserUpdate();
              this.setState({
                isLoading: false
              });
              if (resJson.status) {
                this.setState({
                  modalData: {
                    title: "",
                    msg: profileUpdateMessage
                  }
                });
                this.props.updateProfileFormToMyProfile();
                this.autoModalOff();
              } else if (resJson.error) {
                this.setState({
                  modalData: {
                    title: "Error",
                    msg: resJson.error
                  }
                });
                this.autoModalOff();
              } else {
                this.setState({
                  modalData: {
                    title: "Error",
                    msg: "Try again ..."
                  }
                });
                this.autoModalOff();
              }
            })
            .catch(err => {
              this.setState({
                isLoading: false
              });
            });
        }
      }
    ]);
  }
  submitRegistration(e) {
    e.preventDefault();

    const {
      shipping_first_name,
      shipping_last_name,
      shipping_email_name,
      shipping_phone_name,
      shipping_address_name_01,
      shipping_address_name_02,
      shipping_address_town,
      selectedShippingRegion,
      selectedShippingCountry,
      selectedShippingCity,
      shipping_zip_code
    } = this.state;
    waterfall([
      done => {
        this.fieldVaidation("shipping_first_name", "required,name");
        this.fieldVaidation("shipping_last_name", "required,name");
        this.fieldVaidation("shipping_email_name", "required,email");
        this.fieldVaidation("shipping_phone_name", "required,phone");
        this.fieldVaidation("shipping_address_name_01", "required");
        this.fieldVaidation("shipping_address_town", "required");

        return done();
      },

      done => {
        const {
          shipping_first_name_err,
          shipping_last_name_err,
          shipping_email_name_err,
          shipping_phone_name_err,
          shipping_address_name_01_err,
          shipping_address_name_02_err,
          shipping_address_town_err
        } = this.state;
        if (
          !shipping_first_name_err &&
          !shipping_last_name_err &&
          !shipping_email_name_err &&
          !shipping_phone_name_err &&
          !shipping_address_name_01_err &&
          !shipping_address_name_02_err &&
          !shipping_address_town_err
        ) {
          this.setState({
            isLoading: true,
            showModal: true
          });
          const shippingdetails = {
            firstname: shipping_first_name,
            lastname: shipping_last_name,
            email: shipping_email_name,
            phone: shipping_phone_name,
            address1: shipping_address_name_01,
            address2: shipping_address_name_02,
            city: shipping_address_town,
            zip: shipping_zip_code,
            region: selectedShippingRegion,
            country: selectedShippingCountry,
            state: selectedShippingCity
          };
          const billingdetails = {
            firstname: shipping_first_name,
            lastname: shipping_last_name,
            email: shipping_email_name,
            phone: shipping_phone_name,
            address1: shipping_address_name_01,
            address2: shipping_address_name_02,
            city: shipping_address_town,
            zip: shipping_zip_code,
            region: selectedShippingRegion,
            country: selectedShippingCountry,
            state: selectedShippingCity
          };
          const userId = this.state.registration_id;
          var reData = {
            userid: userId,
            shippingdetails
          };
          if (this.state.BillingAddress) {
            reData = {
              userid: userId,
              shippingdetails,
              billingdetails
            };
          }
          addUpdateUserDetails(reData)
            .then(res => res.json())
            .then(resJson => {
              this.setState({
                isLoading: false
              });
              this.props.updateChckBoxafteruserUpdate();
              if (resJson.status) {
                this.setState({
                  modalData: {
                    title: "",
                    msg: profileUpdateMessage
                  }
                });
                this.props.updateProfileFormToMyProfile();
                this.autoModalOff();
              } else if (resJson.error) {
                this.setState({
                  modalData: {
                    title: "Error",
                    msg: resJson.error
                  }
                });
                this.autoModalOff();
              } else {
                this.setState({
                  modalData: {
                    title: "Error",
                    msg: "Try again ..."
                  }
                });
                this.autoModalOff();
              }
            })
            .catch(err => {
              this.setState({
                isLoading: false
              });
            });
        }
      }
    ]);
  }
  render() {
    const {
      shipping_first_name,
      shipping_first_name_err,
      shipping_first_name_errMsg,
      shipping_last_name,
      shipping_last_name_err,
      shipping_last_name_errMsg,
      shipping_email_name,
      shipping_email_name_err,
      shipping_email_name_errMsg,
      shipping_phone_name,
      shipping_phone_name_err,
      shipping_zip_code,
      shipping_zip_code_err,
      shipping_zip_code_errMsg,
      modalData,
      showModal,
      isLoading,
      shipping_phone_name_errMsg,
      addressData
    } = this.state;
    return (
      <div className="">
        <Card>
          <form onSubmit={this.submitRegistration}>
            <div className="row frm-details">
              <div className="col-md-6">
                <div
                  className={classNames("col-12 has-input", {
                    "has-error": shipping_first_name_err
                  })}
                >
                  <label>First Name*</label>
                  <input
                    id="shipping_first_name"
                    data-validate={["name", "required"]}
                    onChange={this.handleTextChange}
                    value={shipping_first_name}
                    type="text"
                    name=""
                    data-pattern="name"
                    maxlength="20"
                  />
                  {shipping_first_name_err && (
                    <p className="error">
                      {shipping_first_name_errMsg &&
                      shipping_first_name_errMsg === "can't be empty"
                        ? "First Name is required"
                        : shipping_first_name_errMsg}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className={classNames("col-12 has-input", {
                    "has-error": shipping_last_name_err
                  })}
                >
                  <label>Last Name*</label>
                  <input
                    id="shipping_last_name"
                    data-validate={["name", "required"]}
                    onChange={this.handleTextChange}
                    value={shipping_last_name}
                    type="text"
                    name=""
                    data-pattern="name"
                    maxlength="20"
                  />
                  {shipping_last_name_err && (
                    <p className="error">
                      {shipping_last_name_errMsg &&
                      shipping_last_name_errMsg === "can't be empty"
                        ? "Last Name is required"
                        : shipping_last_name_errMsg}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="row frm-details">
              <div className="col-md-6">
                <div
                  className={classNames("col-12 has-input", {
                    "has-error": shipping_email_name_err
                  })}
                >
                  <label>Email Address*</label>
                  <input
                    id="shipping_email_name"
                    data-validate={["email", "required"]}
                    onChange={this.handleTextChange}
                    value={shipping_email_name}
                    type="text"
                    name=""
                    data-pattern="email"
                    maxlength="50"
                  />
                  {shipping_email_name_err && (
                    <p className="error">
                      {shipping_email_name_errMsg &&
                      shipping_email_name_errMsg === "can't be empty"
                        ? "Email id is required"
                        : shipping_email_name_errMsg}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className={classNames("col-12 has-input", {
                    "has-error": shipping_phone_name_err
                  })}
                >
                  <label>Phone Number*</label>
                  {/* <input
                    id="shipping_phone_name"
                    data-validate={["phone", "required"]}
                    onChange={this.handleTextChange}
                    value={shipping_phone_name}
                    type="text"
                    name=""
                  /> */}
                  {/* <PhoneInput
                      country={countryCode}
                      placeholder="Enter phone number"
                      id="shipping_phone_name"
                      name="shipping_phone_name"
                      value={shipping_phone_name}
                      onChange={this.handelTextChangePhone}
                      data-validate={["phone", "required"]}
                      pattern-type="phone"
                       /> */}
                  <ReactPhoneInput
                    containerClass="react-tel-input react-phone"
                    onChange={this.handelTextChangePhone}
                    value={shipping_phone_name}
                    data-validate={["phone", "required"]}
                    pattern-type="phone"
                    id="shipping_phone_name"
                    name="shipping_phone_name"
                  />
                  {shipping_phone_name_err && (
                    <p className="error">
                      {shipping_phone_name_errMsg &&
                      shipping_phone_name_errMsg === "can't be empty"
                        ? "Phone Number is required"
                        : shipping_phone_name_errMsg}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="row frm-details">
              <div className="col-md-6">
                <div
                  className={classNames(
                    "col-12 has-input custom-additions-checkout",
                    {
                      "has-error": shipping_address_name_01_err
                    }
                  )}
                >
                  <label>Address*</label>
                  <input
                    id="shipping_address_name_01"
                    data-validate={["required"]}
                    onChange={this.handleTextChange}
                    value={shipping_address_name_01}
                    type="text"
                    name=""
                    maxlength="40"
                  />
                  {shipping_address_name_01_err && (
                    <p className="error">{shipping_address_name_01_errMsg && shipping_address_name_01_errMsg==="can't be empty" ? "Address is required" : shipping_address_name_01_errMsg}</p>
                  )}
                  <input
                    id="shipping_address_name_02"
                    onChange={this.handleTextChange}
                    value={shipping_address_name_02}
                    type="text"
                    name=""
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className={classNames(
                    "col-12 has-input custom-additions-checkout",
                    {
                      "has-error": shipping_address_town_err
                    }
                  )}
                >
                  <label>City*</label>
                  <input
                    id="shipping_address_town"
                    data-validate={["required"]}
                    onChange={this.handleTextChange}
                    value={shipping_address_town}
                    type="text"
                    name=""
                    maxlength="30"
                  />
                  {shipping_address_town_err && (
                    <p className="error">{shipping_address_town_errMsg && shipping_address_town_errMsg==="can't be empty" ? "Town is required" : shipping_address_town_errMsg}</p>
                  )}
                </div>
              </div>
            </div> */}

            <div className="row frm-details">
              <div className="col-md-12">
                <div
                  className={classNames(
                    "col-12 has-input custom-additions-checkout",
                    {
                      "has-error": shipping_zip_code_err
                    }
                  )}
                >
                  <label>Zip Code*</label>
                  <input
                    id="shipping_zip_code"
                    data-pattern="zipcode"
                    data-validate={["required", "zipcode"]}
                    onChange={this.handleTextChange}
                    value={shipping_zip_code}
                    type="text"
                    name=""
                    maxlength="10"
                  />
                  {shipping_zip_code_err && (
                    <p className="error">
                      {shipping_zip_code_errMsg &&
                      shipping_zip_code_errMsg === "can't be empty"
                        ? "Zip Code is required"
                        : shipping_zip_code_errMsg}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <AddressAutoFill
              autofillformresponse={e => {
                this.shippingaddressautoFill(e);
              }}
              autofilladddatatoparent={addressData}
              address_err={[false, false, false, false]}
            />
            {/* <div className="row frm-details">
              <div className="col-md-12">
                <div className="col-md-12">
                  <label>Select Region*</label>
                  <SelectMulti
                    id="checkout-shipping-region"
                    styles={selectStyle}
                    value={selectedShippingRegion}
                    isMulti={false}
                    placeholder={"Select Country"}
                    onChange={this.regionShippingChange}
                    // options={this.state[`${names}_options`]}
                    options={this.regionSelectOptions()}
                  />
                </div>
              </div>
            </div> */}
            {/* {selectedShippingRegion && (
              <div className="row frm-details">
                <br />
                <div className="col-md-12">
                  <div className="col-12">
                    <label>Select Country*</label>
                    <SelectMulti
                      id="checkout-shipping-country"
                      styles={selectStyle}
                      value={selectedShippingCountry}
                      isMulti={false}
                      placeholder={"Select Country"}
                      onChange={this.countryShippingChange}
                      // options={this.state[`${names}_options`]}
                      options={this.countrySelectOptions(
                        selectedShippingRegion
                          ? selectedShippingRegion.value
                          : ""
                      )}
                    />
                  </div>
                </div>
              </div>
            )} */}
            {/* {selectedShippingCountry && (
              <div className="row frm-details">
                <div className="col-md-12">
                  <div className="col-12">
                    <br />
                    <label>Select State*</label>
                    <SelectMulti
                      id="checkout-shipping-city"
                      styles={selectStyle}
                      value={selectedShippingCity}
                      isMulti={false}
                      placeholder={"Select Country"}
                      onChange={this.cityShippingChange}
                      // options={this.state[`${names}_options`]}
                      options={this.citySelectOptions(
                        selectedShippingCountry
                          ? selectedShippingCountry.value
                          : ""
                      )}
                    />
                  </div>
                </div>
              </div>
            )} */}
            <br />
            <CardTitle>
              <input
                type="checkbox"
                id="expressCheckout"
                onChange={this.toggleBillingAddress}
                // defaultChecked={this.state.BillingAddress}
                checked={this.state.BillingAddress}
                className="mypaymentChceckox"
              />
              <label htmlFor="expressCheckout">
                Billing address is same as shipping address
              </label>
            </CardTitle>
            {!this.state.BillingAddress && (
              <div>
                <Alert color="dark">YOUR BILLING ADDRESSES</Alert>
                <MyProfileAddress2
                  shippingformSubmitUsingBillingForm={() =>
                    this.shippingformSubmitUsingBillingForm()
                  }
                />
              </div>
            )}
            {this.state.BillingAddress && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <button type="submit" className="btn btn-main btn7">
                      Save Address
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </Card>
        <Modal
          isOpen={showModal}
          toggle={this.modalDismis}
          className={"full-modal"}
        >
          <ModalHeader toggle={this.modalDismis}>{modalData.title}</ModalHeader>
          <div className="Modal-body center-modal">
            <div className="modal-inner">
              {isLoading && <div className="loader" />}
              {!isLoading && (
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
                    <Icon
                      className="popup-alert-icon"
                      size={64}
                      icon={ic_done}
                    />
                  )}
                  <p className="text-center title-80 p-3">{modalData.msg}</p>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  location: state.location
});
export default connect(mapStateToProps)(MyProfileAddress);
