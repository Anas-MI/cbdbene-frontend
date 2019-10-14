import React, { Component } from "react";
import { connect } from "react-redux";
import { isAlpha, isEmail, isEmpty, isMobilePhone, isNumeric } from "validator";
import { ic_error_outline, ic_done, ic_clear } from "react-icons-kit/md/";
import Icon from "react-icons-kit";
import { regExReplace } from "../Constants";
import {
  sendEmailHeading,
  sendEmailMsg,
  emailMissingErrMsg,
  emailNotValidErrMsg,
  userNotFound,
  passwordMatchErrMsg
} from "../../constantMessage";
import { Modal, ModalHeader } from "reactstrap";
import waterfall from "async-waterfall";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { forgotPasswordAff } from "../../services/api";
class AffForgotPass extends Component {
  constructor(props) {
    super(props);
    this.handelTextChange = this.handelTextChange.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.autoModalOff = this.autoModalOff.bind(this);
    this.state = {
      registration_email: "",
      registration_email_err: null,
      registration_email_errMsg: "",
      showModal: false,
      isLoading: false,
      modalData: {
        title: "",
        msg: ""
      },
      focusName: []
    };
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
      }
    );
  }

  submitRegistration(e) {
    e.preventDefault();

    const { registration_email } = this.state;
    waterfall([
      done => {
        this.fieldVaidation("registration_email", "required,email");

        return done();
      },
      done => {
        const { registration_email_err } = this.state;
        if (!registration_email_err) {
          this.setState({
            isLoading: true,
            showModal: true
          });
          forgotPasswordAff({
            email: registration_email,
            firststep: "aa"
          })
            .then(res => res.json())
            .then(resJson => {
              this.setState({
                isLoading: false
              });
              if (resJson.status) {
                // console.log({props: this.props})
                this.setState({
                  modalData: {
                    title: sendEmailHeading,
                    msg: sendEmailMsg
                  }
                });
                this.autoModalOff();
              } else if (resJson.message) {
                var msg = "";
                switch (resJson.message) {
                  case "No user found":
                    msg = userNotFound;
                    break;
                  case "User not found":
                    msg = userNotFound;
                    break;
                  default:
                    msg = userNotFound;
                }
                this.setState({
                  modalData: {
                    title: "Error",
                    msg: msg
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
          [field + "_errMsg"]: "Email Not Valid"
        });
        return;
      }
    }
    if (typeArr.includes("phone")) {
      if (isMobilePhone(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "Not Valid"
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
          [field + "_errMsg"]: "Not Valid"
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
          [field + "_errMsg"]: "Too Short"
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
  render() {
    const {
      registration_email,
      registration_email_err,
      registration_email_errMsg,
      modalData,
      showModal,
      isLoading,
      focusName
    } = this.state;
    const { className } = this.props;
    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <div className="container">
          <div className="row justify-content-center Regular">
            <div className="col-lg-5 p-md-5 p-3 col-md-6 register shadowBoxBackground">
              <h3 className="title-80"> Forgot Your Password?</h3>
              <p>
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
              <br />
              <div className="inside-form Larger ">
                <form onSubmit={this.submitRegistration}>
                  <div
                    className={classNames("has-input", {
                      "has-error":
                        registration_email_err &&
                        !focusName.includes("registration_email_err")
                    })}
                  >
                    <label>Email:</label>
                    <input
                      id="registration_email"
                      name="registration_email"
                      value={registration_email}
                      onChange={this.handelTextChange}
                      type="text"
                      data-pattern="email"
                      data-validate={["email", "required"]}
                      onFocus={e => this.setFocus(e)}
                      onBlur={e => this.unSetFocus(e)}
                    />
                    {registration_email_err &&
                      !focusName.includes("registration_email_err") && (
                        <p className="error">
                          {registration_email_errMsg &&
                          registration_email_errMsg === "can't be empty"
                            ? emailMissingErrMsg
                            : emailNotValidErrMsg}
                        </p>
                      )}
                  </div>

                  <div>
                    <button type="submit" className="btn w-100 btn-main btn7">
                      Reset
                    </button>
                  </div>
                </form>
              </div>
              <div className="row">
                <ul className="login-variation-ul p-0 d-flex w-100 justify-content-between flex-wrap">
                  <li>
                    <Link
                      to={`/${
                        this.props.location.countryCode
                      }/ambassador-portal/login`}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/${
                        this.props.location.countryCode
                      }/ambassador-portal/registration`}
                    >
                      Registration
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={showModal}
          toggle={this.toggleModal}
          className={"full-modal"}
        >
          <ModalHeader toggle={this.toggleModal}>{modalData.title}</ModalHeader>
          <div className="Modal-body center-modal">
            {/* <div className="modal-dismiss" onClick={this.toggleModal}>
              <Icon icon={ic_clear} />
            </div> */}
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
                  <h3 className="text-center title-80 p-3">{modalData.msg}</h3>
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
  location: state.location
});
export default connect(mapStateToProps)(AffForgotPass);
