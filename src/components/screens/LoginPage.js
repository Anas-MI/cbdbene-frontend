import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

import classNames from "classnames";
import { regExReplace, credentials, imagePack } from "../Constants";
// import { ic_error_outline, ic_done, ic_clear } from "react-icons-kit/md/";
// import Icon from "react-icons-kit";
import { warning } from "react-icons-kit/fa/";
// import { Modal, ModalHeader } from "reactstrap";
import waterfall from "async-waterfall";
import { connect } from "react-redux";
import { isAlpha, isEmail, isEmpty, isMobilePhone, isNumeric } from "validator";
import { makeCancelable } from "../../services/makeCancelable";
import { Input } from "../form";
import {
  loginMsg,
  loginHeading,
  emailMissingErrMsg,
  emailNotValidErrMsg,
  passwordMissingErrMsg,
  passwordShortErrMsg,
  passIncorrect,
  problemTitle,
  loginFailMSg,
  userNotFound,
  projectName,
  passwordMatchErrMsg
} from "../../constantMessage";

import { setUser, setWishList, getUserMeta } from "../../actions/";

import {
  loginUserApi,
  getWishListApi,
  loginUserApiGoogle,
  registerUserApiGoogle,
  loginUserApiFacebook,
  registerUserApiFaceBook
} from "../../services/api";
import { FadeTransition, CustomLink } from "..";
import ErrorBlock from "../ErrorBlock";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handelTextChange = this.handelTextChange.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.autoModalOff = this.autoModalOff.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.loginWithSocial = this.loginWithSocial.bind(this);
    this.loginWithSocialFacebook = this.loginWithSocialFacebook.bind(this);
    this.wishListGet = this.wishListGet.bind(this);
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
      wishList: "",
      modalData: {
        title: "",
        msg: ""
      },
      loginUserDetails: "",
      focusName: []
    };
  }
  componentDidMount() {
    const { user, history, location } = this.props;
    if (user._id) {
      history.push("/" + location.countryCode + "/my-profile");
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  componentWillUnmount() {
    if (typeof this.cancelabelWishList === "function")
      this.cancelabelWishList();
  }
  setFocus(e) {
    const name = e.target.id + "_err";
    this.setState(
      prevState => ({
        focusName: [...prevState.focusName, name]
      }),
      () => {
        // console.log("focus", this.state.focusName);
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
      }
    );
  }
  wishListGet(user_id) {
    // this.setState({
    //   isLoading: true,
    //   showModal: true,
    //   modalData: {
    //     title: loginHeading,
    //     msg: loginMsg
    //   }
    // });
    const userid = user_id;
    this.cancelabelWishList = makeCancelable(
      getWishListApi(userid).then(res => res.json()),
      resJson => {
        if (resJson.success) {
          const wishList = resJson.wishlist.filter(itm => {
            if (itm.productid && itm.productmeta._id) return true;
            return false;
          });
          const wishListCombo = resJson.combo.filter(itm => {
            if (itm.comboid._id) return true;
            return false;
          });

          const wishListBoth = wishList.concat(wishListCombo);

          // this.setState({
          //   wishList: wishListBoth
          // });
          const items = wishListBoth;
          // var data = [];
          // document.body.scrollTop = document.documentElement.scrollTop = 0;
          // if (items.length > 0) {
          const data = items.map(itm => {
            // var singleObj = "";
            if (itm.combo) {
              return {
                productid: itm.comboid._id,
                productmeta: itm.comboid._id,
                userid: userid,
                wishListId: itm._id,
                combo: true
              };
            } else {
              return {
                productid: itm.productid._id,
                productmeta: itm.productmeta._id,
                userid: userid,
                wishListId: itm._id,
                combo: false
              };
            }
            // data.push(singleObj);
            // return null;
          });
          // }
          this.props.setWishList(data);
          if (this.state.loginUserDetails._id) {
            this.props.getUserMeta(this.state.loginUserDetails._id);
          } else {
            this.props.setUser(this.state.loginUserDetails);
          }
          console.log({
            userData: this.state.loginUserDetails
          });
          // setTimeout(() => {
          const { history, location } = this.props;
          // history.push("/" + location.countryCode + "/my-profile");
          history.push("/" + location.countryCode + "/");
          // }, 800);
        }
      }
    ).catch(err => {
      const { history, location } = this.props;

      setTimeout(() => {
        // history.push("/" + location.countryCode + "/my-profile");
        history.push("/" + location.countryCode + "/");
      }, 2000);
    });

    //   return true;
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

  loginWithSocial(email, google) {
    loginUserApiGoogle(email, google)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          isLoading: true,
          showModal: true,
          loginUserDetails: resJson.user,
          modalData: {
            title: loginHeading,
            msg: loginMsg
          }
        });
        if (resJson.status) {
          // this.props.setUser(resJson.user);
          var user_id = resJson.user._id;
          if (this.wishListGet(user_id)) {
            //window.location.href = "/" + this.props.match.params.lang + "/my-profile";
          } else {
            //  window.location.href ="/" + this.props.match.params.lang + "/my-profile";
          }
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
        console.log({ err });
      });
  }
  loginWithSocialFacebook(email, facebook) {
    loginUserApiFacebook(email, facebook)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          isLoading: true,
          loginUserDetails: resJson.user,
          showModal: true,
          modalData: {
            title: loginHeading,
            msg: loginMsg
          }
        });
        if (resJson.status) {
          // this.props.setUser(resJson.user);
          var user_id = resJson.user._id;
          if (this.wishListGet(user_id)) {
            // window.location.href = "/" + this.props.match.params.lang + "/my-profile";
          } else {
            //  window.location.href ="/" + this.props.match.params.lang + "/my-profile";
          }
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
        console.log({ err });
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
          loginUserApi(login_email, login_password)
            .then(res => res.json())
            .then(resJson => {
              if (resJson.status) {
                this.setState({
                  isLoading: false,
                  // showModal: true,
                  loginUserDetails: {
                    ...resJson.user,
                    userMetaObj: resJson.usermeta
                  }
                  // modalData: {
                  //   title: loginHeading,
                  //   msg: loginMsg
                  // }
                });
                //  this.props.setUser(resJson.user);
                var user_id = resJson.user._id;
                if (this.wishListGet(user_id)) {
                }
              } else if (resJson.messages) {
                if (resJson.messages.length > 1) {
                  this.setState({
                    isLoading: false,
                    showModal: true,
                    modalData: {
                      title: problemTitle,
                      msg: resJson.messages[0].msg
                    }
                  });
                  // this.autoModalOff();
                } else {
                  this.setState({
                    isLoading: false,
                    showModal: true,
                    modalData: {
                      title: problemTitle,
                      msg: resJson.messages.msg
                    }
                  });
                  // this.autoModalOff();
                }
              } else if (resJson.error) {
                let msg = "";
                switch (resJson.error) {
                  case "Password Incorrect":
                    msg = passIncorrect;
                    break;
                  case "User not found":
                    msg = userNotFound;
                    break;
                  default:
                    msg = loginFailMSg;
                }
                this.setState({
                  isLoading: false,
                  showModal: true,
                  modalData: {
                    title: problemTitle,
                    msg: msg
                  }
                });
                // this.autoModalOff();
              } else {
                let msg = "";
                switch (resJson.message) {
                  case "Password Incorrect":
                    msg = passIncorrect;
                    break;
                  case "User not found":
                    msg = userNotFound;
                    break;
                  default:
                    msg = loginFailMSg;
                }
                this.setState({
                  isLoading: false,
                  showModal: true,
                  modalData: {
                    title: problemTitle,
                    msg: msg
                  }
                });
                // this.autoModalOff();
              }
              console.log({ modalData: this.state });
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
    // console.log({field, type})
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
      // console.log(this.state[field].length < 7)
      // if(isPostalCode(this.state[field])){
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
      // console.log(this.state[field].length < 7)
      // if(isPostalCode(this.state[field])){
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
          if (resJson.status) {
            this.setState({
              isLoading: false,
              // modalData: {
              //   title: loginHeading,
              //   msg: loginMsg
              // }
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
          console.log({ err });
        });
    }
  }

  responseGooglefail = response => {
    console.log(response);
  };
  responseFacebook = response => {
    if (response.id) {
      registerUserApiFaceBook({
        email: response.email,
        username: response.name,
        facebook: response.id
      })
        .then(res => res.json())
        .then(resJson => {
          if (resJson.status) {
            this.setState({
              isLoading: false,
              // modalData: {
              //   title: loginHeading,
              //   msg: loginMsg
              // }
            });
            this.loginWithSocialFacebook(response.email, response.id);
          } else if (resJson.error) {
            this.setState({
              isLoading: true,
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
          console.log({ err });
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
      showModal
    } = this.state;
    const { className } = this.props;
    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <Helmet>
          <title>{projectName} | Login</title>
          <meta
            name="keywords"
            content={`cbdbené,CBDBENÉ,
          86th,street,8j,8mm,challenge,900,954,algarve,american,shaman,autism,weight,loss,asylum,bank,beneficios,books,brothers,bud,celeiro,chewing,gum,college,comprar,daily,dosage,drinks,e,liquid,edibles,efeitos,em,portugal,eu,regulation,expo,family,ltd,flower,flowers,geografia,kids,hash,direct,hotel,lisbon,industry,inflammation,infused,isolate,johnston,ri,joint,joints,juul,pods,kangaroo,
          `}
          />
        </Helmet>

        <div className="container">
          <div className="row justify-content-center Regular">
            <div className="w-100 ">
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
                    <h1 className="title-80">Log-in</h1>
                  </div>
                  <div className="">
                    <CustomLink to={`/${this.props.location.countryCode}`}>
                      <img
                        style={{ width: "50px" }}
                        src={imagePack.logo}
                        alt="cbdbené"
                        className="img-fluid"
                      />
                    </CustomLink>
                  </div>
                  {/* <div className="w-100">
                    <h1 className="title-80 pt-2">
                      Log-in
                    </h1>
                  </div> */}
                </div>
              </div>
              <br />

              <div className="inside-form Larger ">
                <form onSubmit={this.submitRegistration}>
                  <Input
                    name="login_email"
                    value={login_email}
                    onChange={this.handelTextChange}
                    dataPattern="email"
                    dataValidate={["email", "required"]}
                    isError={login_email_err}
                    errorMsg={
                      login_email_errMsg === "can't be empty"
                        ? emailMissingErrMsg
                        : login_email_errMsg
                    }
                    label={<div className="label-1">Email</div>}
                  />
                  <Input
                    name="login_password"
                    value={login_password}
                    onChange={this.handelTextChange}
                    type="password"
                    dataValidate={["required"]}
                    isError={login_password_err}
                    errorMsg={
                      login_password_errMsg === "can't be empty"
                        ? passwordMissingErrMsg
                        : login_password_errMsg
                    }
                    label={
                      <div className="container">
                        <div className="row justify-content-between">
                          <div className="label-1">Password</div>
                          <div className="">
                            <Link
                              to={`/${
                                this.props.location.countryCode
                              }/forgot-password`}
                            >
                              Forgot your password?
                            </Link>
                          </div>
                        </div>
                      </div>
                    }
                  />
                  <br />
                  <div>
                    <button disabled={
                      (login_email_err !== false ||
                      login_password_err !== false  )
                    } type="submit" className="btn w-100 btn-main btn7">
                      Login
                    </button>
                  </div>
                  {/* <div className="row">
                    <ul className="login-variation-ul p-0 d-flex w-100 justify-content-between flex-wrap ">
                      <li>
                        <Link
                          to={`/${
                            this.props.location.countryCode
                          }/registration`}
                        >
                          Registration
                        </Link>
                      </li>
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
                  <div className="row social-log-btn-row">
                    <div className="col-md-6 col-6 col-sm-6 col-xs-12 googlelogin social-log-btn">
                      <GoogleLogin
                        clientId={credentials.googleClientId}
                        // clientId="1037392091534-c0ueu688r94srb8ie8usmduavqi8e2o9.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGooglefail}
                      />
                    </div>
                    <div className="col-md-6 col-6 col-sm-6 col-xs-12 social-log-btn social-fb-btn">
                      <FacebookLogin
                        // appId="2132034950208868"
                        appId={credentials.facebookAppId}
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={this.componentClicked}
                        cssclassName="btn btn-info f-14 fb-btn"
                        callback={this.responseFacebook}
                      />
                    </div>
                    <div className="container mt-4">
                      <div className="separator-text mb-2">
                        <span className="small">New to Bené?</span>
                      </div>
                      <Link
                        to={`/${this.props.location.countryCode}/registration`}
                        className="w-100 Link Link--isBtn Link-perl cursor-pointer text-center align-items-center justify-content-center"
                      >
                        Create your Bené account
                      </Link>
                    </div>
                  </div>
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
            <div className="modal-dismiss" onClick={this.toggleModal}>
              <Icon icon={ic_clear} />
            </div>
            <div className="modal-inner">
              <div className="modal-content">
                <p className="text-center MCItemCarouselIntro-title">
                  {modalData.title}
                </p>
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
        </Modal> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  location: state.location
});
export default connect(
  mapStateToProps,
  { setUser, setWishList, getUserMeta }
)(LoginPage);
