import React, { Component } from "react";
import { connect } from "react-redux";
import PopUpModel from "./PopUpModel";
import { isEmail, isEmpty, isNumeric } from "validator";
import {
  ambassadorTaxUpdateMessage,
  formErrorMessage,
  businessTypeBankMissingMsg,
  nameMissingErrMsg,
  zipMissingErrMsg,
  zipValidErrMsg,
  emailNotValidErrMsg,
  passwordMatchErrMsg
} from "../../constantMessage";
import classNames from "classnames";
import {
  countries,
  city_states
} from "../../services/extra/countrySelectorOption";
import { setAPUser } from "../../actions/";
import { isValidPhoneNumber } from "react-phone-number-input";
import { regEx, regExReplace } from "../Constants";
import { updateAffTax } from "../../services/api";
import AddressAutoFill from "../AddressAutoFill";
class AffiliateTax extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ambassador: this.props.ambassadoruser || {},
      ambassador_data: this.props.ambassadoruser || {},
      name: "",
      name_err: null,
      name_errMsg: "",
      businessType: "",
      businessType_err: null,
      businessType_errMsg: "",
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
      address: "",
      address_err: null,
      address_errMsg: "",
      showModal: false,
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
    this.onTextChange = this.onTextChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.fieldValidation = this.fieldValidation.bind(this);
    this.disableModel = this.disableModel.bind(this);
    this.autoModalOff = this.autoModalOff.bind(this);
  }

  componentDidMount() {
    const { ambassadoruser } = this.props;
    if (ambassadoruser && ambassadoruser.tax) {
      const tax = ambassadoruser.tax;
      this.setState({
        name: tax.name,
        name_err: false,
        name_errMsg: "",
        businessType: tax.businessType,
        businessType_err: false,
        businessType_errMsg: "",
        city: tax.city,
        city_err: false,
        city_errMsg: "",
        state: tax.state,
        state_err: false,
        state_errMsg: "",
        zipcode: tax.zipcode,
        zipcode_err: false,
        zipcode_errMsg: "",
        country: tax.country,
        country_err: false,
        country_errMsg: "",
        selectedCountry: false,
        selectedRegion: false,
        selectedCity: false,
        selectedShippingRegion: { label: tax.region, value: tax.region },
        selectedShippingRegion_err: false,
        selectedShippingRegion_errMsg: "",
        selectedShippingCountry: tax.country,
        selectedShippingCountry_err: false,
        selectedShippingCountry_errMsg: "",
        selectedShippingCity: tax.state,
        selectedShippingCity_err: false,
        selectedShippingCity_errMsg: "",
        address: tax.address,
        address_err: false,
        address_errMsg: "",
        addressData: {
          country: tax.country,
          state: tax.state || tax.state,
          city: tax.city,
          address: tax.address
        }
      });
    }
  }

  shippingaddressautoFill(e) {
    this.setState({
      address: e.other,
      selectedShippingCountry: e.country,
      selectedShippingCity: e.state,
      city: e.city
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
  countrySelectOptions(RegionName) {
    const coutnryList = countries[RegionName]
      ? countries[RegionName].split("|").map(el => {
          return {
            label: el,
            value: el
          };
        })
      : [
          {
            label: RegionName,
            value: RegionName
          }
        ];
    return coutnryList;
  }
  citySelectOptions(countryName) {
    const coutnryList = city_states[countryName]
      ? city_states[countryName].split("|").map(el => {
          // if(el){
          return {
            label: el,
            value: el
          };
          // }
        })
      : [
          {
            label: countryName,
            value: countryName
          }
        ];
    return coutnryList;
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
        name: "businessType",
        check: "required"
      },

      {
        name: "zipcode",
        check: "required"
      },
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
      const tax = {
        name: this.state.name,
        businessType: this.state.businessType,
        address: this.state.address,
        region: this.state.selectedShippingRegion,
        country: this.state.selectedShippingCountry,
        state: this.state.selectedShippingCity,
        city: this.state.city,
        zipcode: this.state.zipcode
      };
      const { ambassadoruser } = this.props;
      const id = ambassadoruser._id;
      updateAffTax(id, tax)
        .then(res => res.json())
        .then(resJson => {
          if (resJson.status) {
            this.setState({
              showModal: true,
              modalData: {
                title: "Success",
                msg: ambassadorTaxUpdateMessage
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
        .catch(err => {});
    }
    await console.log("Working");
  };

  render() {
    const {
      name,
      name_err,
      name_errMsg,
      businessType,
      businessType_err,
      businessType_errMsg,
      zipcode,
      zipcode_err,
      zipcode_errMsg,
      address_err,
      showModal,
      modalData,
      addressData,
      city_err,
      selectedShippingCountry_err,
      selectedShippingCity_err
    } = this.state;
    // if (this.props.ambassador_data && this.props.ambassador_data.tax) {
    //   !name && this.setData();
    // }
    return (
      <div className="container pl-0 pr-0">
        <form onSubmit={this.onSubmit}>
          <div className="row frm-details">
            <div className="col-md-12">
              <div
                className={classNames("has-input", {
                  "has-error": name_err
                })}
              >
                <h2>IRS Form W-9</h2>
                <p>
                  Request for Taxpayer Identification and Certification Click
                  here for W-9 Instructions:
                </p>
                <label>Name, as shown on your income tax return*</label>
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
          <div className="row frm-details">
            <div className="col-md-12">
              <div
                className={classNames("has-input", {
                  "has-error": businessType_err
                })}
              >
                <label>Business Type*</label>
                <select
                  className="form-control"
                  id="businessType"
                  data-validate={["required"]}
                  onChange={this.onTextChange}
                  name="businessType"
                  value={businessType}
                >
                  <option value="" disabled>
                    Select{" "}
                  </option>
                  <option value="Individual">Individual </option>
                  <option value="Sole Proprietor">Sole Proprietor</option>
                </select>
                {businessType_err && (
                  <p className="error">
                    {businessType_errMsg &&
                    businessType_errMsg === "can't be empty"
                      ? businessTypeBankMissingMsg
                      : businessType_errMsg}
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
            address_err={[
              address_err,
              city_err,
              selectedShippingCountry_err,
              selectedShippingCity_err
            ]}
          />
          <div className="row frm-details">
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
          </div>

          <div className="row frm-details">
            <div className="col-md-4 pl-0 pr-0">
              <div className="col-12 has-input">
                <button className="btn btn3"> Update</button>
              </div>
              <br />
            </div>
          </div>
        </form>
        <div className="row frm-details">
          <div className="col-md-12">
            <h3>Taxpayer Identification Number (TIN)</h3>
            <p>
              Enter your TIN in the box below. The TIN provided must match the
              name given on Line 1 to avoid backup withholding. For individuals,
              this is your social security number (SSN). However, for a resident
              alien, sole proprietor, or disregard entity, see the Part 1 on
              page 3 of the W-9 instructions. For other entities, it is your
              employer identification number (EIN). If you do not have a number,
              see How to get a TIN in the W-9 instructions. Note: If the account
              is in more than one name, see the chart on page 4 of the
              instructions for guidelines on whose number to enter.
            </p>
            <p>
              *Tax Identification Number (TIN)SSN: ###-##-#### or EIN:
              ##-#######
            </p>
          </div>
        </div>

        <div className="row ">
          <div className="col-md-12">
            <h3 style={{ width: "100%" }}>Certification</h3>
            <p style={{ width: "100%" }}>
              Under penalties of perjury, I certify that:
            </p>
            <p>
              1. The number shown on this form is my correct taxpayer
              identification number, and{" "}
            </p>
            <p>
              2. I am not subject to backup withholding because: (a) I am exempt
              from backup withholding, or (b) I have not been notified by the
              Internal Revenue Service (IRS) that I am subject to backup
              withholding as a result of a failure to report all interest or
              dividends, or (c) the IRS has notified me that I am no longer
              subject to backup withholding, and
            </p>
            <p>
              3. I am a US citizen or other US person, including a US resident
              alien. See W-9 instructions for detailed definition of US person.
            </p>
            <h3>
              Check here if you have been notified by the IRS that you are
              currently subject to back-up withholding because you failed to
              report all interest and dividends on your tax return.: 
            </h3>
            <p>
              Signature of a US personTyping in your name acts as your
              signature. The date and time of submission and your computer's IP
              address will be recorded when you click Submit.
            </p>
          </div>
        </div>
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
)(AffiliateTax);
