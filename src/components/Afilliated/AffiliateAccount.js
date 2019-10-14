import React, { Component } from "react";
import { countryCodeList } from "../allCountryCode";
import { connect } from "react-redux";
import { isEmail, isNumeric, isEmpty } from "validator";
import { setAPUser } from "../../actions/";
import classNames from "classnames";
import { Lodar } from "../";
import PopUpModel from "./PopUpModel";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { regEx, regExReplace } from "../Constants";
import { updateAffData } from "../../services/api";
import AddressAutoFill from "../AddressAutoFill";
import {
  ambassadorAccountUpdateMessage,
  formErrorMessage,
  nameMissingErrMsg,
  currencyMissingErrMsg,
  currencyValidErrMsg,
  zipMissingErrMsg,
  zipValidErrMsg,
  phoneMissingErrMsg,
  phoneNotValidErrMsg,
  emailNotValidErrMsg,
  passwordMatchErrMsg
} from "../../constantMessage";
import BasicFunction from "../../services/extra/basicFunction";
const basicFunction = new BasicFunction();
class AffiliateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ambassador: this.props.ambassadoruser || {},
      ambassador_data: this.props.ambassadoruser || {},
      activeTab: "1",
      name: "",
      name_err: null,
      name_errMsg: "",
      address: "",
      address_err: null,
      address_errMsg: "",
      city: "",
      city_err: null,
      city_errMsg: "",
      state: "",
      state_err: null,
      state_errMsg: "",
      zipcode: "",
      zipcode_err: null,
      zipcode_errMsg: "",
      country: "",
      country_err: null,
      country_errMsg: "",
      phone: "",
      phone_err: null,
      phone_errMsg: "",
      fax: "",
      fax_err: null,
      fax_errMsg: "",
      currency: "",
      currency_err: null,
      currency_errMsg: "",
      language: "",
      language_err: null,
      language_errMsg: "",
      dateFormat: "",
      dateFormat_err: null,
      dateFormat_errMsg: "",
      selectedCountry: null,
      selectedRegion: null,
      selectedCity: null,
      selectedShippingRegion: "",
      selectedShippingRegion_err: null,
      selectedShippingRegion_errMsg: "",
      selectedShippingCountry: "",
      selectedShippingCountry_err: null,
      selectedShippingCountry_errMsg: "",
      selectedShippingCity: "",
      selectedShippingCity_err: null,
      selectedShippingCity_errMsg: "",
      showModal: false,
      modalData: {
        title: "",
        msg: ""
      },
      SpinnerToggle: false,
      addressData: {
        country: false,
        state: false,
        city: false,
        address: false,
        zip: false
      }
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.fieldValidation = this.fieldValidation.bind(this);
    this.handelTextChangePhone = this.handelTextChangePhone.bind(this);
    this.disableModel = this.disableModel.bind(this);
    this.autoModalOff = this.autoModalOff.bind(this);
  }

  componentDidMount() {
    const countryDialCode = basicFunction.getDialCode(
      countryCodeList,
      this.props.location.countryCode
    );
    this.setState({
      registration_phone: countryDialCode
    });
    const { ambassadoruser } = this.props;
    if (ambassadoruser.account) {
      const account = ambassadoruser.account;
      this.setState({
        name: account.name,
        name_err: false,
        name_errMsg: "",
        phone: account.phone,
        phone_err: false,
        phone_errMsg: "",
        address: account.address,
        address_err: false,
        address_errMsg: "",
        city: account.city,
        city_err: false,
        city_errMsg: "",
        zipcode: account.zipcode,
        zipcode_err: false,
        zipcode_errMsg: "",
        fax: account.fax,
        fax_err: false,
        fax_errMsg: "",
        currency: account.currency,
        currency_err: false,
        currency_errMsg: "",
        dateFormat: account.dateFormat,
        dateFormat_err: false,
        dateFormat_errMsg: "",
        selectedShippingRegion: {
          label: account.region,
          value: account.region
        },
        selectedShippingRegion_err: false,
        selectedShippingRegion_errMsg: "",
        selectedShippingCountry: account.country,
        selectedShippingCountry_err: false,
        selectedShippingCountry_errMsg: "",
        selectedShippingCity: account.state,
        selectedShippingCity_err: false,
        selectedShippingCity_errMsg: "",
        addressData: {
          country: account.country || account.country,
          state: account.state.value || account.state,
          city: account.city,
          address: account.address
        }
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
  setFocus(e) {
    const name = e.target.name + "_err";
    this.setState(
      prevState => ({
        focusName: [...prevState.focusName, name]
      }),
      () => {}
    );
  }
  unSetFocus(e) {
    // unSetFocus //setFocus
    const { id } = e.target;

    let type = [];
    let match = null;

    if (e.target.attributes["data-validate"])
      type = e.target.attributes["data-validate"].value;
    if (e.target.attributes["data-match"])
      match = e.target.attributes["data-match"].value;

    const name = id + "_err";
    this.setState(
      prevState => ({
        focusName: prevState.focusName.filter(el => el !== name)
      }),
      () => {
        this.fieldVaidation(id, type, match);
        // console.log("blur",this.state.focusName)
      }
    );
  }

  handelTextChangePhone(e) {
    this.setState(
      {
        phone: e
      },
      () => {
        this.fieldValidation("phone", "phone");
      }
    );
  }

  onTextChange = e => {
    const { value, name } = e.target;
    let type = [];
    if (e.target.attributes["data-validate"])
      type = e.target.attributes["data-validate"].value;

    let pattern = null;
    if (e.target.attributes["data-pattern"])
      pattern = e.target.attributes["data-pattern"].value;

    let newValue = value;

    if (pattern) {
      newValue = value.replace(regExReplace[pattern], "");
    }

    this.setState(
      {
        [name]: newValue
      },
      () => {
        this.fieldValidation(name, type);
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
      if (regEx.fullName.test(this.state[field])) {
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
    if (typeArr.includes("fullname")) {
      if (regEx.fullName.test(this.state[field])) {
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
    if (typeArr.includes("number")) {
      if (isNumeric(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: emailNotValidErrMsg
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
          [field + "_errMsg"]: emailNotValidErrMsg
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
    if (typeArr.includes("password")) {
      if (this.state[field].length > 5) {
        var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{2,25}$/;
        if (true || reg.test(this.state[field])) {
          this.setState({
            [field + "_err"]: false,
            [field + "_errMsg"]: ""
          });
        } else {
          this.setState({
            [field + "_err"]: true,
            [field +
            "_errMsg"]: "A minimum 8 characters password contains a combination of uppercase and lowercase letter and number ."
          });
          return;
        }
        // this.setState({
        //   [field + "_err"]: false,
        //   [field + "_errMsg"]: ""
        // });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "Password should be 6 characters"
        });
        return;
      }
    }
    if (typeArr.includes("repassword")) {
      if (this.state[field] === match) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: passwordMatchErrMsg
        });
        return;
      }
    }
  }

  onSubmit = async e => {
    e.preventDefault();
    const validateArr = [
      {
        name: "name",
        check: "required"
      },
      {
        name: "address",
        check: "required"
      },
      {
        name: "city",
        check: "required"
      },

      {
        name: "zipcode",
        check: "required"
      },
      // {
      //   name: "phone",
      //   check: "required, phone"
      // },

      {
        name: "city",
        check: "required"
      },
      {
        name: "selectedShippingCountry",
        check: "required"
      },
      {
        name: "selectedShippingCity",
        check: "required"
      }
    ];
    await validateArr.map(el => this.fieldValidation(el.name, el.check));
    if (
      validateArr.every(el => {
        if (this.state[el.name + "_err"] === false) return true;

        return false;
      })
    ) {
      const {
        selectedShippingCity,
        phone,
        city,
        zipcode,
        fax,
        dateFormat,
        selectedShippingRegion,
        selectedShippingCountry,
        address,
        language
      } = this.state;
      const account = {
        name: this.state.name,
        state: selectedShippingCity.value || this.state.selectedShippingCity,
        phone: phone,
        city: city,
        zipcode: zipcode,
        fax: fax,
        currency: "USD",
        dateFormat: dateFormat,
        region: selectedShippingRegion.value,
        country: selectedShippingCountry.value || selectedShippingCountry,
        address: address,
        language: language
      };

      const { ambassadoruser } = this.props;
      const id = ambassadoruser._id;
      updateAffData(id, account)
        .then(res => res.json())
        .then(resJson => {
          if (resJson.status) {
            this.setState({
              showModal: true,
              modalData: {
                title: "Success",
                msg: ambassadorAccountUpdateMessage
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
          //	 console.log("errrrrrr",err)
        });
    }
    await console.log("Working");
  };
  shippingaddressautoFill(e) {
    this.setState({
      address: e.other,
      selectedShippingCountry: e.country,
      selectedShippingCity: e.state,
      city: e.city,
      zip: e.zip
    });
    if (e.other && e.other.length > 0) {
      this.setState({
        address_err: false
      });
    }
    if (e.country && e.country.length > 0) {
      this.setState({
        selectedShippingCountry_err: false
      });
    }
    if (e.state && e.state.length > 0) {
      this.setState({
        selectedShippingCity_err: false
      });
    }
    if (e.city && e.city.length > 0) {
      this.setState({
        city_err: false
      });
    }
    if (e.zip && e.zip.length > 0) {
      this.setState({
        zipcode_err: false
      });
    } else {
      this.setState({
        zipcode_err: true
      });
    }
  }

  onSelectChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      [name + "_err"]: false
    });
  };

  render() {
    const {
      name,
      name_err,
      name_errMsg,
      address_err,
      // zipcode,
      zipcode_err,
      // zipcode_errMsg,
      phone,
      phone_err,
      phone_errMsg,
      fax,
      currency_err,
      currency_errMsg,
      showModal,
      modalData,
      addressData,
      city_err,
      selectedShippingCountry_err,
      selectedShippingCity_err,
      // dateFormat,
      // dateFormat_errMsg,
      // dateFormat_err,
      language_err,
      language_errMsg
    } = this.state;
    // const routingTypeOpt = [
    //   "d-MMM-yyyy (12-Mar-2014)",
    //   "MM-dd-yyyy (03-12-2014)",
    //   "dd-MM-yyyy (12-03-2014)"
    // ];
    return (
      <div className="container pl-0 pr-0">
        {this.state.SpinnerToggle && <Lodar />}
        <form onSubmit={this.onSubmit}>
          <div className="row frm-details">
            <div className="col-md-12">
              <div
                className={classNames("has-input", {
                  "has-error": name_err
                })}
              >
                <h2>Account</h2>
                <label>Name*</label>
                <input
                  id="name"
                  data-validate={["required"]}
                  data-pattern="fullname"
                  onChange={this.onTextChange}
                  value={name}
                  type="text"
                  name="name"
                  maxLength="20"
                />
                {name_err && (
                  <p className="error">
                    {name_errMsg && name_errMsg === "can't be empty"
                      ? nameMissingErrMsg
                      : name_errMsg}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* <div className="row frm-details">
            <div className="col-md-12">
              <div
                className={classNames("has-input", {
                  "has-error": zipcode_err
                })}
              >
                <label>Zip Code*</label>
                <input
                  id="zipcode"
                  data-validate={["required"]}
                  // data-pattern="zipcode"
                  onChange={this.onTextChange}
                  value={zipcode}
                  type="text"
                  name="zipcode"
                  maxLength="10"
                />
                {zipcode_err && (
                  <p className="error">
                    {zipcode_errMsg && zipcode_errMsg === "can't be empty"
                      ? zipMissingErrMsg
                      : zipValidErrMsg}
                  </p>
                )}
              </div>
            </div>
          </div> */}

          <AddressAutoFill
            autofillformresponse={e => {
              this.shippingaddressautoFill(e);
            }}
            autofilladddatatoparent={addressData}
            zipErr={zipcode_err}
            address_err={[
              address_err,
              city_err,
              selectedShippingCountry_err,
              selectedShippingCity_err
            ]}
          />

          <div className="row frm-details">
            <div className="col-md-6">
              <div
                className={classNames("has-input", {
                  "has-error": phone_err
                })}
              >
                <label>Phone</label>

                <ReactPhoneInput
                  containerClass="react-tel-input react-phone"
                  onChange={this.handelTextChangePhone}
                  value={phone}
                  // data-validate={["phone", "required"]}
                  pattern-type="phone"
                />
                {phone_err && (
                  <p className="error">
                    {phone_errMsg && phone_errMsg === "can't be empty"
                      ? phoneMissingErrMsg
                      : phoneNotValidErrMsg}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div
                className={classNames("has-input", {
                  "has-error": false
                })}
              >
                <label>Fax</label>
                <input
                  id="fax"
                  data-validate={["onlyNumber"]}
                  data-pattern="onlyNumber"
                  onChange={this.onTextChange}
                  value={fax}
                  type="text"
                  name="fax"
                  maxLength="12"
                />
                {/* {fax_err && (
                          <p className="error">{fax_errMsg && fax_errMsg === "can't be empty" ? faxMissingErrMsg : faxValidErrMsg }</p>
												)} */}
              </div>
            </div>
          </div>
          <div className="row frm-details">
            <div className="col-md-6">
              <div
                className={classNames("has-input", {
                  "has-error": currency_err
                })}
              >
                <label>Functional Currency*</label>
                <input
                  id="shipping_first_name"
                  defaultValue="USD"
                  type="text"
                  name=""
                  disabled={true}
                />
                {currency_err && (
                  <p className="error">
                    {currency_errMsg && currency_errMsg === "can't be empty"
                      ? currencyMissingErrMsg
                      : currencyValidErrMsg}
                  </p>
                )}
              </div>
            </div>
            {/* <div className="col-md-6">
              <div
                className={classNames("has-input", {
                  "has-error": dateFormat_err
                })}
              >
                <label>Date Format*</label>
                <select
                  value={dateFormat}
                  name="dateFormat"
                  onChange={this.onSelectChange}
                  className="form-control"
                >
                  {routingTypeOpt.map((el, index) => (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
                {dateFormat_err && (
                  <p className="error">
                    {dateFormat_errMsg && dateFormat_errMsg === "can't be empty"
                      ? "Date Format is required"
                      : dateFormat_errMsg}
                  </p>
                )}
              </div>
            </div> */}
            <div className="col-md-6">
              <div
                className={classNames("has-input", {
                  "has-error": language_err
                })}
              >
                <label>Language*</label>
                <input
                  id="language"
                  defaultValue="English"
                  type="text"
                  name="language"
                  disabled={true}
                />
                {language_err && (
                  <p className="error">
                    {language_errMsg && language_errMsg === "can't be empty"
                      ? "Language is required"
                      : language_errMsg}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* <div className="row frm-details">
            <div className="col-md-6">
              <div
                className={classNames("has-input", {
                  "has-error": language_err
                })}
              >
                <label>Language*</label>
                <input
                  id="language"
                  defaultValue="English"
                  type="text"
                  name="language"
                  disabled={true}
                />
                {language_err && (
                  <p className="error">
                    {language_errMsg && language_errMsg === "can't be empty"
                      ? "Language is required"
                      : language_errMsg}
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
)(AffiliateAccount);
