import React, { Component } from "react";
import { connect } from "react-redux";
import { imagePack, regExReplace } from "../Constants";
import { Link } from "react-router-dom";
import waterfall from "async-waterfall";
import { fieldValidation } from "../../services/extra/validations";
import { Input } from "../form";
import { makeCancelable } from "../../services/makeCancelable";
import { isAlpha, isEmail, isEmpty, isMobilePhone, isNumeric } from "validator";
import { warning } from "react-icons-kit/fa/";
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

import { loginUserApi, getWishListApi } from "../../services/api";
import { FadeTransition, CustomLink } from "..";
import ErrorBlock from "../ErrorBlock";
class ConsultLogin extends Component {
  constructor(props) {
    super(props);
    this.handelTextChange = this.handelTextChange.bind(this);
    this.wishListGet = this.wishListGet.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.unSetFocus = this.unSetFocus.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.autoModalOff = this.autoModalOff.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.state = {
      login_email: "",
      login_password: "",
      modalData: {
        title: "",
        msg: ""
      }
    };
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
  wishListGet(user_id) {
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
          const items = wishListBoth;
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
          });
          this.props.setWishList(data);
          if (this.state.loginUserDetails._id) {
            this.props.getUserMeta(this.state.loginUserDetails._id);
          } else {
            this.props.setUser(this.state.loginUserDetails);
          }

          this.props.loginToPersonal();
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
                  loginUserDetails: {
                    ...resJson.user,
                    userMetaObj: resJson.usermeta
                  }
                });
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

  onTextChange = e => {
    const { value, name, attributes } = e.target;
    const type =
      attributes["data-validate"] && attributes["data-validate"].value;
    this.setState(
      {
        [name]: value
      },
      () => {
        const { isError, errorMsg } = fieldValidation(this.state[name], type);
        this.setState({
          [`${name}_err`]: isError,
          [`${name}_errMsg`]: errorMsg
        });
      }
    );
  };
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

  render() {
    const {
      login_email,
      login_password,
      login_email_errMsg,
      login_password_errMsg,
      login_email_err,
      login_password_err,
      modalData,
      showModal
    } = this.state;
    return (
      <div className="">
        <div className="row ">
          <div className="p-md-4 p-3 w-430 register border bg-p2 shadow shadowBoxBackground">
            <div className="inside-form Larger ">
              <div className="w-100 ">
                <FadeTransition unmountOnExit={true} in={showModal}>
                  <ErrorBlock
                    icon={warning}
                    msg={modalData.msg}
                    title={modalData.title}
                  />
                </FadeTransition>
              </div>
              <form onSubmit={this.submitRegistration}>
                <div className="top-section">
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

                  <div className="has-input">
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
                  </div>
                  <br />
                  <center>
                    <button type="submit" className="btn3 w-100">
                      Sign in
                    </button>
                  </center>

                  {/* <div className="separator-text mt-2 mb-2  mb-2">
                    <span
                      style={{
                        width: "auto",
                        paddingLeft: "10px",
                        paddingRight: "10px"
                      }}
                      className="small"
                    >
                      or
                    </span>
                  </div>
                  <center>
                    <button
                      type="submit"
                      // onClick={() => this.onSubmit() }
                      // this.props.loginToPersonal()
                      className="btn btn-main btn3 w-100"
                    >
                      Sign up later
                    </button>
                  </center> */}
                </div>
              </form>
            </div>
          </div>
        </div>
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
)(ConsultLogin);
