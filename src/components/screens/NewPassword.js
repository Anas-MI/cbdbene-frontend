import React, { Component } from "react";
import waterfall from "async-waterfall";
import {
  passwordMissingErrMsg,
  confirmPasswordErrMsg,
  userNotFound,
  newPasswordSuccessMsg,
  problemTitle
} from "../../constantMessage";
import classNames from "classnames";
// import { Modal } from "../modal";
import { Input } from "../form";
import { fieldValidation } from "../form/validation";

import { forgotPassword } from "../../services/api";
import { FadeTransition, CustomLink } from "..";
import ErrorBlock from "../ErrorBlock";
import { warning } from "react-icons-kit/fa";
import { imagePack } from "../Constants";
import { connect } from "react-redux";
class NewPassword extends Component {
  constructor(props) {
    super(props);
    this.handelTextChange = this.handelTextChange.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.autoModalOff = this.autoModalOff.bind(this);
    this.state = {
      registration_password: "",
      registration_password_err: null,
      registration_password_errMsg: "",
      registration_confirmPassword: "",
      registration_confirmPassword_err: null,
      registration_confirmPassword_errMsg: "",
      showModal: false,
      isLoading: false,
      tokanUrl: false,
      modalData: {
        title: "",
        msg: ""
      },
      focusName: []
    };
  }
  componentDidMount() {
    var url_string = window.location.href;
    var url = new URL(url_string);

    var token = url.searchParams.get("token");
    this.setState({ tokanUrl: token });
    if (token) {
    } else {
      // window.location.href="http://localhost:3000/AF/";
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
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

    const { registration_password } = this.state;
    waterfall([
      done => {
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
          registration_password_err,
          registration_confirmPassword_err
        } = this.state;
        if (!registration_password_err && !registration_confirmPassword_err) {
          this.setState({
            isLoading: true
            // showModal: true
          });
          forgotPassword({
            userid: this.state.tokanUrl,
            newpassword: registration_password
          })
            .then(res => res.json())
            .then(resJson => {
              this.setState({
                isLoading: false
              });
              console.log({
                resJson
              });
              if (resJson.success) {
                this.setState({
                  showModal: true,
                  modalData: {
                    title: "Success",
                    msg: newPasswordSuccessMsg
                  }
                });
                setTimeout(() => {
                  window.location.href = "/";
                }, 2000);
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
                  showModal: true,
                  modalData: {
                    title: problemTitle,
                    msg: msg
                  }
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
      registration_password,
      registration_password_err,
      registration_password_errMsg,
      registration_confirmPassword,
      registration_confirmPassword_err,
      registration_confirmPassword_errMsg,

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
        <div className="container">
          <div className="row justify-content-center Regular">
            <div className="w-100 ">
              <FadeTransition
                // unmountOnExit={true}
                in={showModal}
              >
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
                    <h1 className="title-80">Set New Password</h1>
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
                </div>
              </div>
              <div className="inside-form Larger ">
                <form onSubmit={this.submitRegistration}>
                  <Input
                    isError={registration_password_err}
                    errorMsg={
                      registration_password_errMsg === "can't be empty"
                        ? passwordMissingErrMsg
                        : registration_password_errMsg
                    }
                    name="registration_password"
                    value={registration_password}
                    onChange={this.handelTextChange}
                    type="password"
                    dataValidate={["password", "required"]}
                    label="Password:"
                  />
                  <Input
                    isError={registration_confirmPassword_err}
                    errorMsg={
                      registration_confirmPassword_errMsg === "can't be empty"
                        ? confirmPasswordErrMsg
                        : registration_confirmPassword_errMsg
                    }
                    name="registration_confirmPassword"
                    value={registration_confirmPassword}
                    onChange={this.handelTextChange}
                    type="password"
                    label="Confirm Password:"
                    dataValidate={["repassword", "required"]}
                    dataMatch={registration_password}
                  />
                  <div>
                    <button type="submit" className="btn w-100 btn-main">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <Modal
          isOpen={showModal}
          heading={modalData.title}
          toggle={this.toggleModal}
        >
          <p className="text-center MCItemCarouselIntro-title">
            {modalData.title}
          </p>
          <p className="text-center title-80 p-3">{modalData.msg}</p>
        </Modal> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location
});
export default connect(mapStateToProps)(NewPassword);
