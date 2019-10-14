import React, { Component } from "react";
import { isAlpha, isEmail, isEmpty, isNumeric } from "validator";
import { connect } from "react-redux";
import { Modal, ModalHeader } from "reactstrap";
import waterfall from "async-waterfall";
import classNames from "classnames";
import { countryCodeList } from "./allCountryCode";
import {
  profileUpdateMessage,
  firstNameMissingErrMsg,
  lastNameMissingErrMsg,
  emailNotValidErrMsg,
  phoneNotValidErrMsg,
  passwordShortErrMsg,
  passwordMatchErrMsg,
  zipValidErrMsg
} from "../constantMessage";
import { addUpdateUserDetails } from "../services/api/addUpdateUserDetails";
import { ic_clear } from "react-icons-kit/md/";
import Icon from "react-icons-kit";

import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { regExReplace } from "./Constants";

import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";
import BasicFunction from "../services/extra/basicFunction";
const basicFunction = new BasicFunction();
class ProfileUpdate extends Component {
  constructor(props) {
    super(props);
    this.handelTextChange = this.handelTextChange.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.handelTextChangePhone = this.handelTextChangePhone.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.unSetFocus = this.unSetFocus.bind(this);
    this.autoModalOff = this.autoModalOff.bind(this);
    this.state = {
      registration_firstName: props.userDetailsRes.firstname || "",
      registration_firstName_err: null,
      registration_firstName_errMsg: "",
      registration_lastName: props.userDetailsRes.lastname || "",
      registration_lastName_err: null,
      registration_lastName_errMsg: "",

      registration_phone: props.userDetailsRes.phonenumber || "",
      registration_phone_err: null,
      registration_phone_errMsg: "",
      registration_id: "",
      cuntrycode: "",
      showModal: false,
      isLoading: false,
      modalData: {
        title: "",
        msg: ""
      },
      focusName: []
    };
  }
  componentDidMount() {
    const countryDialCode = basicFunction.getDialCode(
      countryCodeList,
      this.props.location.countryCode
    );
    this.setState({
      registration_phone: countryDialCode
    });
    const { user } = this.props;
    if (user._id) {
      if (this.props.userDetailsRes) {
        var phoneNumber =
          this.props.userDetailsRes.userid.phonenumber &&
          this.props.userDetailsRes.userid.phonenumber;

        this.setState({
          registration_firstName: this.props.userDetailsRes.firstname,
          registration_lastName: this.props.userDetailsRes.lastname,
          registration_phone: phoneNumber ? phoneNumber.toString() : "",
          registration_id: user._id
          //cuntrycode:cuntrycode
        });
      }
    }
  }
  setFocus(e) {
    const name = e.target.id + "_err";
    this.setState(
      prevState => ({
        focusName: [...prevState.focusName, name]
      }),
      () => {
        //  console.log("focus",this.state.focusName)
      }
    );
  }
  unSetFocus(e) {
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
    if (e) {
      this.setState(
        {
          registration_phone: e || ""
        },
        () => {
          this.fieldVaidation("registration_phone", "phone");
        }
      );
    } else {
      // this.fieldVaidation("registration_phone", "phone");
      this.setState(
        {
          registration_phone: ""
        },
        () => {
          this.fieldVaidation("registration_phone", "phone");
        }
      );
    }
  }
  handelTextChange(e) {
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
  toggleModal() {
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
    }, 3000);
  }
  submitRegistration(e) {
    e.preventDefault();

    waterfall([
      done => {
        this.fieldVaidation("registration_firstName", "required,name");
        this.fieldVaidation("registration_lastName", "required,name");
        this.fieldVaidation("registration_phone", "required,phone");

        return done();
      },
      done => {
        const {
          registration_firstName_err,
          registration_lastName_err,

          registration_phone_err
        } = this.state;
        if (
          !registration_firstName_err &&
          !registration_lastName_err &&
          !registration_phone_err
        ) {
          this.setState({
            isLoading: true,
            showModal: true
          });
          addUpdateUserDetails({
            userid: this.state.registration_id,
            firstname: this.state.registration_firstName,
            lastname: this.state.registration_lastName,
            phonenumber: this.state.registration_phone || ""
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
  fieldVaidation(field, type, match) {
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
          [field + "_errMsg"]: phoneNotValidErrMsg
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
          [field + "_errMsg"]: zipValidErrMsg
        });
        return;
      }
    }
    if (typeArr.includes("password")) {
      if (this.state[field].length > 5) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: passwordShortErrMsg
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
  handelTextChangePhone2() {
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx");
  }
  render() {
    const {
      registration_firstName,
      registration_firstName_err,
      registration_firstName_errMsg,
      registration_lastName,
      registration_lastName_err,
      registration_lastName_errMsg,
      registration_phone,
      registration_phone_err,
      registration_phone_errMsg,

      modalData,
      showModal,
      isLoading,
      focusName
    } = this.state;

    return (
      <div className="row">
        <div className="col-lg-12 p-3 p-md-5  col-md-12 ">
          <h4 className="">Update Profile</h4>

          <div className="inside-form Larger ">
            <form onSubmit={this.submitRegistration}>
              <div className="row frm-details">
                <div className=" col-md-6">
                  <div
                    className={classNames("has-input", {
                      "has-error":
                        registration_firstName_err &&
                        !focusName.includes("registration_firstName_err")
                    })}
                  >
                    <label>First Name:</label>
                    <input
                      id="registration_firstName"
                      name="registration_firstName"
                      value={registration_firstName}
                      onChange={this.handelTextChange}
                      type="text"
                      data-pattern="name"
                      data-validate={["name", "required"]}
                      onFocus={this.setFocus}
                      onBlur={this.unSetFocus}
                    />
                    {registration_firstName_err &&
                      !focusName.includes("registration_firstName_err") && (
                        <p className="error">
                          {registration_firstName_errMsg &&
                          registration_firstName_errMsg === "can't be empty"
                            ? firstNameMissingErrMsg
                            : registration_firstName_errMsg}
                        </p>
                      )}
                  </div>
                </div>
                <div className=" col-md-6">
                  <div
                    className={classNames("has-input", {
                      "has-error":
                        registration_lastName_err &&
                        !focusName.includes("registration_lastName_err")
                    })}
                  >
                    <label>Last Name:</label>
                    <input
                      id="registration_lastName"
                      name="registration_lastName"
                      value={registration_lastName}
                      onChange={this.handelTextChange}
                      type="text"
                      data-pattern="name"
                      onFocus={this.setFocus}
                      onBlur={this.unSetFocus}
                      data-validate={["name", "required"]}
                    />
                    {registration_lastName_err &&
                      !focusName.includes("registration_lastName_err") && (
                        <p className="error">
                          {registration_lastName_errMsg &&
                          registration_lastName_errMsg === "can't be empty"
                            ? lastNameMissingErrMsg
                            : registration_lastName_errMsg}
                        </p>
                      )}
                  </div>
                </div>
              </div>
              <div className="row frm-details">
                <div className=" col-md-12">
                  <div
                    className={classNames("has-input", {
                      "has-error": registration_phone_err
                    })}
                  >
                    <label>Phone Number:</label>

                    <ReactPhoneInput
                      containerClass="react-tel-input react-phone"
                      onChange={this.handelTextChangePhone}
                      value={registration_phone}
                    />

                    {registration_phone_err && (
                      <p className="error">
                        {registration_phone_errMsg &&
                        registration_phone_errMsg === "can't be empty"
                          ? "Phone number is required"
                          : registration_phone_errMsg}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="">
                <button
                  type="submit"
                  className="btn btn-main col-md-3 btn7 123"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>

        <Modal
          isOpen={showModal}
          toggle={this.toggleModal}
          className={"full-modal"}
        >
          <ModalHeader toggle={this.toggleModal}>{modalData.title}</ModalHeader>
          <div className="Modal-body center-modal">
            <div className="modal-inner">
              {isLoading && <div className="loader" />}
              {!isLoading && (
                <div className="modal-content">
                  {/* <p className="text-center MCItemCarouselIntro-title">
                    {modalData.title}
                  </p> */}
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
export default connect(mapStateToProps)(ProfileUpdate);
