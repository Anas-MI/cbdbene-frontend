import React, { Component } from "react";
import classNames from "classnames";

import waterfall from "async-waterfall";
import { connect } from "react-redux";
import { profileUpdateMessage } from "../constantMessage";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { regExReplace } from "./Constants";
import AddressAutoFill from "./AddressAutoFill";
import { isAlpha, isEmail, isEmpty, isNumeric } from "validator";
import { Card } from "reactstrap";

import { addUpdateUserDetails, getSingleUserApi } from "../services/api/";
import { countryCodeList } from "./allCountryCode";
import BasicFunction from "../services/extra/basicFunction";
const basicFunction = new BasicFunction();
class MyProfileAddress2 extends Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.fieldVaidation = this.fieldVaidation.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.getuserDetails = this.getuserDetails.bind(this);
    this.modalDismis = this.modalDismis.bind(this);
    this.handelTextChangePhone = this.handelTextChangePhone.bind(this);
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
              shipping_first_name: rep.user.billingdetails.firstname,
              shipping_last_name: rep.user.billingdetails.lastname,
              shipping_email_name: rep.user.billingdetails.email,
              shipping_phone_name: rep.user.billingdetails.phone,
              shipping_address_name_01: rep.user.billingdetails.address1,
              shipping_address_name_02: rep.user.billingdetails.address2,
              shipping_address_town: rep.user.billingdetails.city,
              shipping_zip_code: rep.user.billingdetails.zip,
              selectedShippingRegion: rep.user.billingdetails.region,
              selectedShippingCountry: rep.user.billingdetails.country,
              selectedShippingCity: rep.user.billingdetails.state,
              addressData: {
                country:
                  rep.user.billingdetails.country.value ||
                  rep.user.billingdetails.country,
                state:
                  rep.user.billingdetails.state.value ||
                  rep.user.billingdetails.state,
                city: rep.user.billingdetails.city,
                address: rep.user.billingdetails.address1
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
  modalDismis() {
    this.setState({
      isLoading: false,
      showModal: false
    });
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
          [field + "_errMsg"]: "Phone Number  not valid"
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
          this.props.shippingformSubmitUsingBillingForm();
          const userId = this.state.registration_id;
          addUpdateUserDetails({
            userid: userId,
            billingdetails
          })
            .then(res => res.json())
            .then(resJson => {
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
              } else if (resJson.error) {
                this.setState({
                  modalData: {
                    title: "Error",
                    msg: resJson.error
                  }
                });
              } else {
                this.setState({
                  modalData: {
                    title: "Error",
                    msg: "Try again ..."
                  }
                });
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
      shipping_phone_name_errMsg,
      shipping_zip_code,
      shipping_zip_code_err,
      shipping_zip_code_errMsg,
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
                    maxlength="25"
                  />
                  {shipping_first_name_err && (
                    <p className="error">
                      {shipping_first_name_errMsg &&
                      shipping_first_name_errMsg === "can't be empty"
                        ? "First Name is required "
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
                    maxlength="25"
                  />
                  {shipping_last_name_err && (
                    <p className="error">
                      {shipping_last_name_errMsg &&
                      shipping_last_name_errMsg === "can't be empty"
                        ? "Last Name is required "
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
                        ? "Email id is required "
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
                      limitMaxLength
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
                        ? "Phone Number is required "
                        : shipping_phone_name_errMsg}
                    </p>
                  )}
                </div>
              </div>
            </div>

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
                    data-validate={["required", "zipcode"]}
                    onChange={this.handleTextChange}
                    value={shipping_zip_code}
                    type="text"
                    name=""
                    data-pattern="zipcode"
                    maxlength="10"
                  />
                  {shipping_zip_code_err && (
                    <p className="error">
                      {shipping_zip_code_errMsg &&
                      shipping_zip_code_errMsg === "can't be empty"
                        ? "Zip Code is required "
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
            <br />
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-3">
                  {/* <button type="submit" className="btn btn-main btn7" >
                    Save Address
                  </button> */}
                  <a
                    href="/#"
                    onClick={this.submitRegistration}
                    className="btn btn-main btn7"
                  >
                    Save Address
                  </a>
                </div>
              </div>
            </div>
          </form>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  location: state.location
});
export default connect(mapStateToProps)(MyProfileAddress2);
