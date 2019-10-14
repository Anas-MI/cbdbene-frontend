import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { ic_error_outline, ic_done } from "react-icons-kit/md/";
import Icon from "react-icons-kit";
import { warning } from "react-icons-kit/fa/";

import { setUser } from "../actions";
import {
  loginMsg,
  loginHeading,
  emailMissingErrMsg,
  emailNotValidErrMsg,
  passwordMissingErrMsg,
  passwordShortErrMsg,
  passwordMatchErrMsg
} from "../constantMessage";
// import { registerUserApi } from "react-google-login";
import { isAlpha, isEmail, isEmpty, isMobilePhone, isNumeric } from "validator";
import classNames from "classnames";
import { Modal, ModalHeader } from "reactstrap";
import waterfall from "async-waterfall";
import { loginUserApi } from "../services/api";
import { loginUserApiGoogle } from "../services/api";
import { registerUserApiGoogle } from "../services/api";
import { loginUserApiFacebook } from "../services/api";
import { registerUserApiFaceBook } from "../services/api";
import { FadeTransition } from ".";
import ErrorBlock from "./ErrorBlock";
class CheckoutLogin extends Component {
  constructor(props) {
    super(props);
    this.handelTextChange = this.handelTextChange.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.loginWithSocial = this.loginWithSocial.bind(this);
    this.loginWithSocialFacebook = this.loginWithSocialFacebook.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.unSetFocus = this.unSetFocus.bind(this);
    this.state = {
      login_email: "",
      login_email_err: null,
      login_email_errMsg: "",
      login_password: "",
      login_password_err: null,
      login_password_errMsg: "",
      showModal: false,
      isLoading: false,
      isloginOrNot: false,
      modalData: {
        title: "",
        msg: ""
      },
      focusName: []
    };
  }

  componentDidMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  setFocus(e) {
    const name = e.target.id + "_err";
    this.setState(
      prevState => ({
        focusName: [...prevState.focusName, name]
      }),
      () => {
        //   console.log("focus",this.state.focusName)
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
  handelTextChange(e) {
    const id = e.target.id;
    let type = [];
    let match = null;
    if (e.target.attributes["data-validate"])
      type = e.target.attributes["data-validate"].value;
    if (e.target.attributes["data-match"])
      match = e.target.attributes["data-match"].value;
    this.setState(
      {
        [e.target.id]: e.target.value
      },
      () => {
        this.fieldVaidation(id, type, match);
      }
    );
  }
  toggleModal() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  loginWithSocial(email, google) {
    loginUserApiGoogle(email, google)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          isLoading: false
        });
        if (resJson.status) {
          this.props.setUser(resJson.user, this.props.cart);
          window.location.reload();
          // window.location.href="/" + this.props.match.params.lang + "/my-account";
        } else if (resJson.messages) {
          this.setState({
            modalData: {
              title: "Error",
              msg: resJson.messages
            }
          });
        } else {
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
      });
  }
  loginWithSocialFacebook(email, facebook) {
    loginUserApiFacebook(email, facebook)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          isLoading: false
        });
        if (resJson.status) {
          this.props.setUser(resJson.user, this.props.cart);
          window.location.reload();
          //   window.location.href="/" + this.props.match.params.lang + "/my-account";
        } else if (resJson.messages) {
          this.setState({
            modalData: {
              title: "Error",
              msg: resJson.messages
            }
          });
        } else {
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
      });
  }
  submitRegistration(e) {
    e.preventDefault();

    const { login_email, login_password } = this.state;
    waterfall([
      done => {
        this.fieldVaidation("login_email", "required,email");
        this.fieldVaidation("login_password", "required,password");
        return done();
      },
      done => {
        const { login_email_err, login_password_err } = this.state;
        if (!login_email_err && !login_password_err) {
          this.setState({
            isLoading: true,
            showModal: false
          });
          loginUserApi(login_email, login_password)
            .then(res => res.json())
            .then(resJson => {
              this.setState({
                isLoading: false
              });
              console.log({
                resJson
              })
              if (resJson.status) {
                this.setState({
                  modalData: {
                    title: loginHeading,
                    msg: loginMsg
                  }
                });
                this.props.setUser(resJson.user, this.props.cart);
                // setTimeout(window.location.reload(), 300);
              } else if (resJson.messages) {
                this.setState({
                  showModal: true,
                  modalData: {
                    title: "Error",
                    msg: resJson.messages[0].msg
                  }
                });
              }  else if (resJson.message) {
                this.setState({
                  showModal: true,
                  modalData: {
                    title: "Error",
                    msg: resJson.message
                  }
                });
              } else if (resJson.error) {
                this.setState({
                  showModal: true,
                  modalData: {
                    title: "Error",
                    msg: resJson.error
                  }
                });
              } else {
                this.setState({
                  showModal: true,
                  modalData: {
                    title: "Error",
                    msg: "Try again ..."
                  }
                });
              }
            })
            .catch(err => {
              this.setState({
                isLoading: false,
                modalData: {
                  showModal: true,
                  title: "Error",
                  msg: "Try again ..."
                }
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
  responseGoogle(response) {
    if (response.w3.U3) {
      registerUserApiGoogle({
        email: response.w3.U3,
        username: response.w3.ig,
        google: response.w3.Eea
      })
        .then(res => res.json())
        .then(resJson => {
          this.setState({
            isLoading: false
          });
          if (resJson.status) {
            this.setState({
              modalData: {
                title: loginHeading,
                msg: loginMsg
              }
            });
            this.loginWithSocial(response.w3.U3, response.w3.Eea);
          } else if (resJson.error) {
            this.setState({
              modalData: {
                title: "Error",
                msg: resJson.error
              }
            });
          } else {
            this.loginWithSocial(response.w3.U3, response.w3.Eea);
          }
        })
        .catch(err => {
          this.setState({
            isLoading: false
          });
        });
      //------------------------
      //this.props.history.push('/'+this.props.match.params.lang+'/my-account');
    }
  }

  responseGooglefail = response => {};
  responseFacebook = response => {
    if (response.id) {
      registerUserApiFaceBook({
        email: response.email,
        username: response.name,
        facebook: response.id
      })
        .then(res => res.json())
        .then(resJson => {
          this.setState({
            isLoading: false
          });
          if (resJson.status) {
            this.setState({
              modalData: {
                title: loginHeading,
                msg: loginMsg
              }
            });
            this.loginWithSocialFacebook(response.email, response.id);
          } else if (resJson.error) {
            this.setState({
              modalData: {
                title: "Error",
                msg: resJson.error
              }
            });
          } else {
            this.loginWithSocialFacebook(response.email, response.id);
          }
        })
        .catch(err => {
          this.setState({
            isLoading: false
          });
        });
    }
  };
  render() {
    const {
      login_email,
      login_email_err,
      login_email_errMsg,
      login_password,
      login_password_err,
      login_password_errMsg,
      modalData,
      showModal,
      isLoading,
      focusName
    } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row justify-content-center Regular">
            <div className="col-lg-12 pl-0 pr-0 col-md-12">
              <FadeTransition unmountOnExit={true} in={showModal}>
                <div className="pb-4">
                  <ErrorBlock
                    icon={warning}
                    msg={modalData.msg}
                    title={modalData.title}
                  />
                </div>
              </FadeTransition>
              <h3 className="mb-3">Returning Customer</h3>
              <div className="inside-form Larger ">
                <form onSubmit={this.submitRegistration}>
                  <div
                    className={classNames("has-input", {
                      "has-error":
                        login_email_err &&
                        !focusName.includes("login_email_err")
                    })}
                  >
                    <label>Email:</label>
                    <input
                      id="login_email"
                      name="login_email"
                      value={login_email}
                      onChange={this.handelTextChange}
                      type="text"
                      onFocus={this.setFocus}
                      onBlur={this.unSetFocus}
                      data-validate={["email", "required"]}
                    />
                    {login_email_err &&
                      !focusName.includes("login_email_err") && (
                        <p className="error">
                          {login_email_errMsg === "can't be empty"
                            ? emailMissingErrMsg
                            : login_email_errMsg}
                        </p>
                      )}
                  </div>
                  <div
                    className={classNames("has-input", {
                      "has-error":
                        login_password_err &&
                        !focusName.includes("login_password_err")
                    })}
                  >
                    <label>
                      <div className="d-flex justify-content-between">
                        Password:
                        <Link
                          to={`/${
                            this.props.location.countryCode
                          }/forgot-password`}
                        >
                          Forgot your password ?
                        </Link>
                      </div>
                    </label>
                    <input
                      id="login_password"
                      name="login_password"
                      value={login_password}
                      onChange={this.handelTextChange}
                      type="password"
                      onFocus={this.setFocus}
                      onBlur={this.unSetFocus}
                      data-validate={["password", "required"]}
                    />
                    {login_password_err &&
                      !focusName.includes("login_password_err") && (
                        <p className="error">
                          {login_password_errMsg === "can't be empty"
                            ? passwordMissingErrMsg
                            : login_password_errMsg}
                        </p>
                      )}
                  </div>
                  <div
                    style={{
                      marginTop: "-4px"
                    }}
                    className="row social-log-btn-row"
                  >
                    <div className="col-md-6 col-6 col-sm-6 col-xs-12 googlelogin social-log-btn">
                      <GoogleLogin
                        clientId="1037392091534-c0ueu688r94srb8ie8usmduavqi8e2o9.apps.googleusercontent.com"
                        buttonText="Login With Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGooglefail}
                      />
                    </div>
                    <div className="col-md-6 col-6 col-sm-6 col-xs-12 social-log-btn social-fb-btn">
                      <FacebookLogin
                        appId="2132034950208868"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        cssclassName="btn btn-info f-14"
                        callback={this.responseFacebook}
                      />
                    </div>
                  </div>
                  <div>
                    <button type="submit" className="btn w-100 btn-main btn7">
                      Sign In to Check Out
                    </button>
                  </div>
                  {/* <div className="row">
                    <ul className="login-variation-ul">
                      <li>
                        <Link
                          to={`/${
                            this.props.location.countryCode
                          }/forgot-password`}
                        >
                          Forgot your password ?
                        </Link>
                      </li>
                    </ul>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <Modal
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
        </Modal> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  location: state.location,
  cart: state.cart
});
export default connect(
  mapStateToProps,
  {
    setUser
  }
)(CheckoutLogin);
