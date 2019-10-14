import React, { Component } from "react";
import { addUpdateUserDetails, updatePassword } from "../services/api/";
import { isAlpha, isEmail, isEmpty, isMobilePhone, isNumeric } from "validator";
import { ic_done, ic_error_outline } from "react-icons-kit/md/";
import Icon from "react-icons-kit";
import { Modal, ModalHeader } from "reactstrap";
import waterfall from "async-waterfall";
import classNames from "classnames";
import {
  profileUpdateMessage,
  emailNotValidErrMsg,
  phoneNotValidErrMsg,
  passwordShortErrMsg,
  passwordMatchErrMsg,
  oldPasswordRequired,
  passwordValidErrMsg,
  invalidOldPass,
  zipValidErrMsg,
  newPasswordSuccessMsg
} from "../constantMessage";
export default class ProfileUpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.handelTextChange = this.handelTextChange.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.submitRegistration2 = this.submitRegistration2.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.unSetFocus = this.unSetFocus.bind(this);
    this.autoModalOff = this.autoModalOff.bind(this);
    this.state = {
      passwordOld: "",
      passwordOld_err: null,
      passwordOld_errMsg: "",
      passwordNew: "",
      passwordNew_err: null,
      passwordNew_errMsg: "",
      passwordNewConfirm: "",
      passwordNewConfirm_err: null,
      passwordNewConfirm_errMsg: "",
      userDetailsLocal: "",

      showModal: false,
      isLoading: false,
      modalData: {
        title: "",
        msg: ""
      },
      focusName: []
    };
  }
  componentDidMount() {}

  setFocus(e) {
    const name = e.target.id + "_err";
    this.setState(
      prevState => ({
        focusName: [...prevState.focusName, name]
      }),
      () => {
        // console.log("focus",this.state.focusName)
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

    const { passwordNew } = this.state;
    waterfall([
      done => {
        this.fieldVaidation("passwordOld", "required,password");
        this.fieldVaidation("passwordNew", "required,password");
        this.fieldVaidation(
          "passwordNewConfirm",
          "required,password,repassword",
          passwordNew
        );
        return done();
      },
      done => {
        const {
          passwordOld_err,
          passwordNew_err,
          passwordNewConfirm_err
        } = this.state;
        if (!passwordOld_err && !passwordNew_err && !passwordNewConfirm_err) {
          this.setState({
            isLoading: true,
            showModal: true
          });
          updatePassword({
            userid: this.props.userDetailsRes.userid,
            newpassword: this.state.passwordNew,
            oldpassword: this.state.passwordOld
          })
            .then(res => res.json())
            .then(resJson => {
              this.setState({
                isLoading: false
              });
              if (resJson.status) {
                this.setState({
                  passwordOld: "",
                  passwordOld_err: null,
                  passwordOld_errMsg: "",
                  passwordNew: "",
                  passwordNew_err: null,
                  passwordNew_errMsg: "",
                  passwordNewConfirm: "",
                  passwordNewConfirm_err: null,
                  passwordNewConfirm_errMsg: "",
                  modalData: {
                    title: "Password Changed",
                    msg: newPasswordSuccessMsg
                  }
                });
                this.autoModalOff();
                this.props.updateProfileFormToMyProfile();
              } else if (resJson.error) {
                var msg = "";
                switch (resJson.message) {
                  case "Incorrect Old Password":
                    msg = invalidOldPass;
                    break;

                  default:
                    msg = invalidOldPass;
                }
                this.setState({
                  modalData: {
                    title: "Error",
                    msg: msg
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

  submitRegistration2(e) {
    e.preventDefault();

    const { passwordNew } = this.state;
    waterfall([
      done => {
        this.fieldVaidation("passwordNew", "required,password");
        this.fieldVaidation(
          "passwordNewConfirm",
          "required,password,repassword",
          passwordNew
        );
        return done();
      },
      done => {
        const { passwordNew_err, passwordNewConfirm_err } = this.state;
        if (!passwordNew_err && !passwordNewConfirm_err) {
          this.setState({
            isLoading: true,
            showModal: true
          });
          addUpdateUserDetails({
            userid: this.props.userDetailsRes.userid,
            password: this.state.passwordNew
          })
            .then(res => res.json())
            .then(resJson => {
              this.setState({
                isLoading: false
              });
              if (resJson.status) {
                this.setState({
                  modalData: {
                    title: "Password Changed",
                    msg: profileUpdateMessage
                  }
                });
                this.props.updateProfileFormToMyProfile();
                this.autoModalOff();
                this.setState({
                  passwordOld: "",
                  passwordNew: "",
                  passwordNewConfirm: ""
                });
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
        var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{2,25}$/;
        if (true || reg.test(this.state[field])) {
          this.setState({
            [field + "_err"]: false,
            [field + "_errMsg"]: ""
          });
        } else {
          this.setState({
            [field + "_err"]: true,
            [field + "_errMsg"]: passwordValidErrMsg
          });
          return;
        }
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
  render() {
    const {
      passwordOld,
      passwordNew,
      passwordNewConfirm,
      passwordOld_errMsg,
      passwordNew_errMsg,
      passwordNewConfirm_errMsg,
      passwordOld_err,
      passwordNew_err,
      passwordNewConfirm_err,

      modalData,
      showModal,
      isLoading,
      focusName
    } = this.state;
    const { noTitle } = this.props;
    return (
      <div className="row">
        <div className="col-lg-12 p-3 p-md-5  col-md-12 ">
          {!noTitle && <h4 className="">Update Password</h4>}
          {this.props.userDetailsRes.userid &&
          this.props.userDetailsRes.userid.password ? (
            <div className="inside-form Larger ">
              <form onSubmit={this.submitRegistration}>
                <div className="row frm-details">
                  <div className=" col-md-12">
                    <div
                      className={classNames("has-input", {
                        "has-error":
                          passwordOld_err &&
                          !focusName.includes("passwordOld_err")
                      })}
                    >
                      <label>Old Password:</label>
                      <input
                        id="passwordOld"
                        name="passwordOld"
                        value={passwordOld}
                        onChange={this.handelTextChange}
                        type="password"
                        onFocus={this.setFocus}
                        onBlur={this.unSetFocus}
                        data-validate={["password", "required"]}
                      />
                      {passwordOld_err &&
                        !focusName.includes("passwordOld_err") && (
                          <p className="error">
                            {passwordOld_errMsg &&
                            passwordOld_errMsg === "can't be empty"
                              ? oldPasswordRequired
                              : passwordOld_errMsg}
                          </p>
                        )}
                    </div>
                  </div>
                </div>
                <div className="row frm-details">
                  <div className=" col-md-6">
                    <div
                      className={classNames("has-input", {
                        "has-error":
                          passwordNew_err &&
                          !focusName.includes("passwordNew_err")
                      })}
                    >
                      <label>New Password:</label>
                      <input
                        id="passwordNew"
                        name="passwordNew"
                        value={passwordNew}
                        onChange={this.handelTextChange}
                        type="password"
                        onFocus={this.setFocus}
                        onBlur={this.unSetFocus}
                        data-validate={["password", "required"]}
                      />
                      {passwordNew_err &&
                        !focusName.includes("passwordNew_err") && (
                          <p className="error">
                            {passwordNew_errMsg &&
                            passwordNew_errMsg === "can't be empty"
                              ? "New Password is required"
                              : passwordNew_errMsg}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className=" col-md-6">
                    <div
                      className={classNames("has-input", {
                        "has-error":
                          passwordNewConfirm_err &&
                          !focusName.includes("passwordNewConfirm_err")
                      })}
                    >
                      <label>Confirm Password:</label>
                      <input
                        id="passwordNewConfirm"
                        name="passwordNewConfirm"
                        value={passwordNewConfirm}
                        onChange={this.handelTextChange}
                        type="password"
                        onFocus={this.setFocus}
                        onBlur={this.unSetFocus}
                        data-validate={["repassword", "required"]}
                        data-match={passwordNew}
                      />
                      {passwordNewConfirm_err &&
                        !focusName.includes("passwordNewConfirm_err") && (
                          <p className="error">
                            {passwordNewConfirm_errMsg &&
                            passwordNewConfirm_errMsg === "can't be empty"
                              ? "Confirm Password is required"
                              : passwordNewConfirm_errMsg}
                          </p>
                        )}
                    </div>
                  </div>
                </div>

                <div className="">
                  <button type="submit" className="btn btn-main col-md-3 btn7">
                    Update
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="inside-form Larger ">
              <form onSubmit={this.submitRegistration2}>
                <div className="row frm-details">
                  <div className=" col-md-6">
                    <div
                      className={classNames("has-input", {
                        "has-error": passwordNew_err
                      })}
                    >
                      <label>New Password:</label>
                      <input
                        id="passwordNew"
                        name="passwordNew"
                        value={passwordNew}
                        onChange={this.handelTextChange}
                        type="password"
                        data-validate={["password", "required"]}
                      />
                      {passwordNew_err && (
                        <p className="error">
                          {passwordNew_errMsg &&
                          passwordNew_errMsg === "can't be empty"
                            ? "New Password is required"
                            : passwordNew_errMsg}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className=" col-md-6">
                    <div
                      className={classNames("has-input", {
                        "has-error": passwordNewConfirm_err
                      })}
                    >
                      <label>Confirm Password:</label>
                      <input
                        id="passwordNewConfirm"
                        name="passwordNewConfirm"
                        value={passwordNewConfirm}
                        onChange={this.handelTextChange}
                        type="password"
                        data-validate={["repassword", "required"]}
                        data-match={passwordNew}
                      />
                      {passwordNewConfirm_err && (
                        <p className="error">
                          {passwordNewConfirm_errMsg &&
                          passwordNewConfirm_errMsg === "can't be empty"
                            ? "Confirm Password is required"
                            : passwordNewConfirm_errMsg}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="">
                  <button type="submit" className="btn btn-main col-md-3">
                    Update
                  </button>
                </div>
              </form>
            </div>
          )}
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
