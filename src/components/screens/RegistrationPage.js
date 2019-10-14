import React, { Component } from "react";
import {
  // regHeading,
  // regMsg,
  firstNameMissingErrMsg,
  lastNameMissingErrMsg,
  emailMissingErrMsg,
  phoneMissingErrMsg,
  passwordMissingErrMsg,
  confirmPasswordErrMsg,
  problemTitle,
  projectName
} from "../../constantMessage";

import classNames from "classnames";

import { countryCodeList } from "../allCountryCode";
import waterfall from "async-waterfall";
import { Helmet } from "react-helmet";
import { registerUserApi } from "../../services/api";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { ic_done, ic_error_outline } from "react-icons-kit/md/";
// import Icon from "react-icons-kit";

import { regExReplace, imagePack } from "../Constants";
import "react-phone-input-2/dist/style.css";
import BasicFunction from "../../services/extra/basicFunction";
import "react-phone-number-input/style.css";
import {
  setUser,
  setRedirectCheckout
  //  getUserMetaNoCart, getUserMeta,
} from "../../actions/";
// import { Modal } from "../modal";
import { Input, PhoneInput } from "../form";
import { fieldValidation } from "../form/validation";
import FadeTransition from "../FadeTransition";
import ErrorBlock from "../ErrorBlock";
import { warning } from "react-icons-kit/fa";
import { CustomLink } from "..";

const basicFunction = new BasicFunction();

class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.handelTextChange = this.handelTextChange.bind(this);
    this.handelTextChangePhone = this.handelTextChangePhone.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.applyPassword = this.applyPassword.bind(this);
    this.autoModalOff = this.autoModalOff.bind(this);
    this.state = {
      registration_firstName: "",
      focusName: [],
      registration_firstName_err: null,
      registration_firstName_errMsg: "",
      registration_lastName: "",
      registration_lastName_err: null,
      registration_lastName_errMsg: "",
      registration_email: "",
      registration_email_err: null,
      registration_email_errMsg: "",
      registration_phone: "",
      registration_phone_err: null,
      registration_phone_errMsg: "",
      registration_password: "",
      registration_password_err: null,
      registration_password_errMsg: "",
      registration_confirmPassword: "",
      registration_confirmPassword_err: null,
      registration_confirmPassword_errMsg: "",
      checkoutRedirect: false,
      showModal: false,
      isLoading: false,
      passWordSuggestions: false,
      modalData: {
        title: "",
        msg: ""
      },
      isRegister: false,
      loginDetails: ""
    };
  }
  componentDidMount() {
    const { location } = this.props;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const countryDialCode = basicFunction.getDialCode(
      countryCodeList,
      location.countryCode
    );
    this.setState({
      registration_phone: countryDialCode
    });
  }

  handelTextChangePhone(e) {
    if (e) {
      this.setState(
        {
          registration_phone: e
        },
        () => {
          // this.fieldVaidation("registration_phone", "phone");
        }
      );
    } else {
      this.setState(
        {
          registration_phone: ""
        },
        () => {
          // this.fieldVaidation("registration_phone", "phone");
        }
      );
    }
  }

  SuggestionPassword() {
    //capitalizeFirstLetter

    const { registration_firstName, registration_lastName } = this.state;
    if (registration_firstName && registration_lastName) {
      if (
        registration_firstName.trim() !== "" &&
        registration_lastName.trim() !== ""
      ) {
        const randomNo = Math.round(1000 + Math.random() * 9000);
        const randomNo2 = Math.round(1000 + Math.random() * 9000);

        var passWordSuggestions = {
          pass1:
            basicFunction.capitalizeFirstLetter(
              basicFunction.sliceToNumber(registration_firstName, 3)
            ) +
            basicFunction.sliceToNumber(registration_lastName, 3) +
            randomNo,
          pass2:
            basicFunction.capitalizeFirstLetter(
              basicFunction.sliceToNumber(registration_lastName, 3)
            ) +
            basicFunction.sliceToNumber(registration_firstName, 3) +
            randomNo2
        };
        this.setState({
          passWordSuggestions
        });
      }
    }
  }

  applyPassword(pass) {
    this.setState({
      registration_password: pass,
      registration_confirmPassword: pass
    });
    this.setState({
      passWordSuggestions: false
    });
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

    const {
      registration_firstName,
      registration_lastName,
      registration_email,
      registration_phone,
      registration_password,
      registration_confirmPassword
    } = this.state;
    waterfall([
      done => {
        this.fieldVaidation("registration_firstName", "required,name");
        this.fieldVaidation("registration_lastName", "required,name");
        this.fieldVaidation("registration_email", "required,email");
        // this.fieldVaidation("registration_phone", "required,phone");
        this.fieldVaidation("registration_password", "required,password");
        this.fieldVaidation(
          "registration_confirmPassword",
          "required,repassword",
          registration_password
        );
        return done();
      },
      done => {
        const {
          registration_firstName_err,
          registration_lastName_err,
          registration_email_err,
          // registration_phone_err,
          registration_password_err,
          registration_confirmPassword_err
        } = this.state;
        if (
          !registration_firstName_err &&
          !registration_lastName_err &&
          !registration_email_err &&
          // !registration_phone_err &&
          !registration_password_err &&
          !registration_confirmPassword_err
        ) {
          registerUserApi({
            email: registration_email,
            role: "customer",
            firstname: registration_firstName,
            lastname: registration_lastName,
            phonenumber: registration_phone,
            password: registration_password,
            password2: registration_confirmPassword
          })
            .then(res => res.json())
            .then(resJson => {
              this.setState({
                isLoading: false
              });
              if (resJson.status) {
                this.setState({
                  modalData: {
                    // title: regHeading,
                    // msg: regMsg,
                    loginDetails: resJson.user
                  },
                  // isLoading: true,
                  // showModal: true,
                  isRegister: true
                });

                if (this.props.isRedirectToCheckout) {
                  this.props.setRedirectCheckout(false);
                  if (resJson.user) {
                    this.props.setUser(resJson.user);
                    this.props.history.push(
                      "/" + this.props.location.countryCode + "/checkout"
                    );
                    // window.location.href =
                    //   "/" + this.props.location.countryCode + "/checkout";
                  }
                  // setTimeout(() => {
                  // }, 3000);
                } else {
                  if (resJson.user) {
                    this.props.setUser(resJson.user);

                    this.props.history.push(
                      "/" + this.props.location.countryCode + "/"
                    );
                    // window.location.href =
                    //   "/" + this.props.location.countryCode + "/my-profile";
                  }
                  // setTimeout(() => {
                  // }, 3000);
                }
              } else if (resJson.error) {
                this.setState({
                  modalData: {
                    title: problemTitle,
                    msg: resJson.error
                  },
                  isLoading: false,
                  showModal: true
                });
                // this.autoModalOff();
              } else {
                this.setState({
                  modalData: {
                    title: problemTitle,
                    msg: "Try again ..."
                  },
                  isLoading: false,
                  showModal: true
                });
                // this.autoModalOff();
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
  render() {
    const {
      registration_firstName,
      registration_firstName_err,
      registration_firstName_errMsg,
      registration_lastName,
      registration_lastName_err,
      registration_lastName_errMsg,
      registration_email,
      registration_email_err,
      registration_email_errMsg,
      registration_phone,
      registration_phone_err,
      registration_phone_errMsg,
      registration_password,
      registration_password_err,
      registration_password_errMsg,
      registration_confirmPassword,
      registration_confirmPassword_err,
      registration_confirmPassword_errMsg,
      modalData,
      showModal
    } = this.state;
    const { location, className } = this.props;
    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <Helmet>
          <title>{projectName} | Registration</title>
          <meta
            name="keywords"
            content={`cbdbené,CBDBENÉ,
          light,rail,belapur,cbd-fm,architects,cbd-dmh,cigarette,cbdc,nortip,cbdb,(band),products,cbdistillery,cannabidiol,relief,1000,pin,code,full,form,extract,joe,rogan,gummy,bears,epileptic,parkinson's,vv,instructions,fibromyalgia,cigarettes,rosin,tokyo,francisco,honey,sticks,dc,washington,where,can,i,best,place,you,charlotte's,web,wax,avon,lake,pmdd,spectrum,distillate,cbdmd,cbd831,cbd9,cbdxtreme,installment,plan,cm,the,hilum,seeds,0.3,08,international,paws,real,u,4mm,htp,state,50mg,550mg,twist,6mm,6th,national,report,day,medical,centre,700mg,7500mg,750mg,800,850,85032,
          `}
          />
        </Helmet>
        <div className="container">
          <div className="row justify-content-center Regular">
            <div className="w-100">
              <FadeTransition unmountOnExit={true} in={showModal}>
                <ErrorBlock
                  icon={warning}
                  msg={modalData.msg}
                  title={modalData.title}
                />
              </FadeTransition>
            </div>
            <div className="col-lg-55  p-md-4 p-3 col-md-66 w-430 register border bg-p2 shadow shadowBoxBackground">
              <div className="container">
                <div className="row align-items-center justify-content-between">
                  <div className="">
                    <h1 className="title-80">Create account</h1>
                  </div>
                  <div className="">
                    <CustomLink to={`/${this.props.location.countryCode}`}>
                      <img
                        style={{ width: "50px" }}
                        src={imagePack.logo}
                        alt="Bené"
                        className="img-fluid"
                      />
                    </CustomLink>
                  </div>
                </div>
              </div>
              <br />
              <div className="inside-form Larger ">
                <form onSubmit={this.submitRegistration}>
                  <Input
                    name="registration_firstName"
                    value={registration_firstName}
                    onChange={this.handelTextChange}
                    patternType="name"
                    dataPattern="name"
                    dataValidate={["name", "required"]}
                    maxLength="20"
                    isError={registration_firstName_err}
                    errorMsg={
                      registration_firstName_errMsg === "can't be empty"
                        ? firstNameMissingErrMsg
                        : registration_firstName_errMsg
                    }
                    label="First Name"
                  />
                  <Input
                    name="registration_lastName"
                    value={registration_lastName}
                    onChange={this.handelTextChange}
                    patternType="name"
                    dataPattern="name"
                    dataValidate={["name", "required"]}
                    maxLength="20"
                    isError={registration_lastName_err}
                    errorMsg={
                      registration_lastName_errMsg === "can't be empty"
                        ? lastNameMissingErrMsg
                        : registration_lastName_errMsg
                    }
                    label="Last Name"
                  />
                  <Input
                    name="registration_email"
                    value={registration_email}
                    onChange={this.handelTextChange}
                    dataPattern="email"
                    type="email"
                    dataValidate={["email", "required"]}
                    maxLength="40"
                    isError={registration_email_err}
                    errorMsg={
                      registration_email_errMsg === "can't be empty"
                        ? emailMissingErrMsg
                        : registration_email_errMsg
                    }
                    label="Email"
                  />
                  <PhoneInput
                    name="registration_phone"
                    value={registration_phone}
                    onChange={this.handelTextChangePhone}
                    isError={registration_phone_err}
                    errorMsg={
                      registration_phone_errMsg === "can't be empty"
                        ? phoneMissingErrMsg
                        : registration_phone_errMsg
                    }
                    label="Phone Number"
                  />
                  <Input
                    name="registration_password"
                    value={registration_password}
                    onChange={this.handelTextChange}
                    type="password"
                    patternType="password"
                    dataValidate={["password", "required"]}
                    isError={registration_password_err}
                    errorMsg={
                      registration_password_errMsg === "can't be empty"
                        ? passwordMissingErrMsg
                        : registration_password_errMsg
                    }
                    label="Password"
                  />
                  <Input
                    name="registration_confirmPassword"
                    value={registration_confirmPassword}
                    onChange={this.handelTextChange}
                    type="password"
                    patternType="password"
                    dataValidate={["repassword"]}
                    dataMatch={registration_password}
                    isError={registration_confirmPassword_err}
                    errorMsg={
                      registration_confirmPassword_errMsg === "can't be empty"
                        ? confirmPasswordErrMsg
                        : registration_confirmPassword_errMsg
                    }
                    label="Re-enter Password "
                  />
                  <div>
                    <button type="submit" className="btn w-100 btn-main btn7">
                      Register
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-100 has-input mt-3">
                {/* <hr/> */}
                <div className="shaded-divider">
                  <div className="shaded-divider-inner" />
                </div>
                <label>
                  Already have an account?{" "}
                  <Link to={`/${location.countryCode}/login`}> Login</Link>
                </label>
              </div>
              {/* <div className="row">
                <ul className="login-variation-ul p-0 d-flex w-100 justify-content-between flex-wrap">
                  <li>
                    <Link to={`/${location.countryCode}/login`}>Login</Link>
                  </li>
                  <li>
                    <Link to={`/${location.countryCode}/forgot-password`}>
                      Forgot your password ?
                    </Link>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
        {/* <Modal
          isOpen={showModal}
          heading={modalData.title}
          toggle={this.toggleModal}
        >
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
          <h3 className="text-center title-80 p-3">{modalData.msg}</h3>
        </Modal> */}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  location: state.location,
  isRedirectToCheckout: state.extras.isRedirectToCheckout
});
export default connect(
  mapStateToProps,
  {
    setUser,
    setRedirectCheckout
  }
)(RegistrationPage);
