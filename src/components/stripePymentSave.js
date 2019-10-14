import React, { Component } from "react";
import InputMask from "react-input-mask";
import classNames from "classnames";
import {
  cardDetailsfail,
  cardDetailsSave,
  expireMonthInvalid,
  expireYearInvalid,
  invaliddateNumber,
  cardNumberInvalid,
  cardDetailsNotMAtch,
  invalidCVVNumber
} from "../constantMessage";
import { imagePack } from "./Constants";
import { stripeTokanCreate, addUpdateUserDetails } from "../services/api";
import { Modal, ModalHeader } from "reactstrap";
import { ic_error_outline, ic_done, ic_clear } from "react-icons-kit/md/";

import Icon from "react-icons-kit";
class StripePymentSave extends Component {
  constructor(props) {
    super(props);
    this.handelTextChange = this.handelTextChange.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.formValidation = this.formValidation.bind(this);
    this.submitRegistration2 = this.submitRegistration2.bind(this);
    this.modalDismis = this.modalDismis.bind(this);
    this.state = {
      cardNumber: "",
      expDate: "",
      cvNumber: "",
      cardNumberErr: false,
      cardNumberErrMsg: "",
      expDateErr: false,
      expDateErrMsg: "",
      cvNumberErr: false,
      cvNumberErrMsg: "",
      formDisable: true,
      showModal: false,
      isLoading: false,
      registration_id: null,
      userDetailsRes: null,
      modalData: {
        title: "",
        msg: ""
      }
    };
  }
  componentWillReceiveProps() {
    if (this.props.stripePaymentError) {
      //this.submitRegistration2();
    }
  }
  componentDidMount() {
    if (this.props.cardDetail && this.props.cardDetail.carddetails) {
      this.setState({
        cardNumber: this.props.cardDetail.carddetails.cardnumber,
        expDate: this.props.cardDetail.carddetails.expirydate,
        cvNumber: this.props.cardDetail.carddetails.cvc
      });
    }
  }
  handelTextChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
      stripePaymentErrorResponse: ""
    });
  }
  modalDismis() {
    this.setState({
      isLoading: false,
      showModal: false
    });
  }
  formValidation(id, value) {
    switch (id) {
      case "cardNumber":
        if (value.length <= 18) {
          this.setState({
            cardNumberErr: true,
            cardNumberErrMsg: "Invalid Card Number"
          });
        } else {
          this.setState({
            cardNumberErr: false,
            cardNumberErrMsg: ""
          });
        }
        break;

      case "cvNumber":
        if (value.length <= 2) {
          this.setState({
            cvNumberErr: true,
            cvNumberErrMsg: "Invalid CV Number"
          });
        } else {
          this.setState({
            cvNumberErr: false,
            cvNumberErrMsg: ""
          });
        }
        break;
      case "expDate":
        if (value.length <= 4) {
          this.setState({
            expDateErr: true,
            expDateErrMsg: "Invalid Expire Date"
          });
        } else {
          this.setState({
            expDateErr: false,
            expDateErrMsg: ""
          });
        }
        break;
      default:
        break;
    }
  }
  submitRegistration(e) {
    // const er = [];
    e.preventDefault();
    if (this.state.cardNumber.length <= 18) {
      this.setState({
        cardNumberErr: true,
        cardNumberErrMsg: cardNumberInvalid
      });
    } else {
      this.setState({
        cardNumberErr: false,
        cardNumberErrMsg: ""
      });
      if (this.state.expDate.length <= 4) {
        this.setState({
          expDateErr: true,
          expDateErrMsg: invaliddateNumber
        });
      } else {
        this.setState({
          expDateErr: false,
          expDateErrMsg: ""
        });
        if (this.state.cvNumber.length <= 2) {
          this.setState({
            cvNumberErr: true,
            cvNumberErrMsg: invalidCVVNumber
          });
        } else {
          this.setState({
            cvNumberErr: false,
            cvNumberErrMsg: ""
          });
          const { cvNumber, expDate, cardNumber } = this.state;
          const cardno = cardNumber.replace(/-/g, "");
          const expMonth = expDate.split("/");
          const bodyData = {
            cardnumber: cardNumber,
            expmonth: expMonth[0],
            expyear: expMonth[1],
            cvc: cvNumber,
            userid: this.props.userId
          };
          var d = new Date();
          var n = d.getFullYear();
          var final = n.toString().substring(2);
          if (expMonth[0] <= 12 && expMonth[1] >= final) {
            stripeTokanCreate(bodyData)
              .then(res => res.json())
              .then(resJson => {
                if (resJson.status) {
                  const carddetails = {
                    cardnumber: cardno,
                    expirydate: expDate,
                    cvc: cvNumber
                  };
                  this.setState({
                    isLoading: true,
                    showModal: true
                  });

                  addUpdateUserDetails({
                    userid: this.props.userId,
                    carddetails: carddetails
                  })
                    .then(res => res.json())
                    .then(resJson => {
                      if (resJson.status) {
                        this.setState({
                          isLoading: false,
                          modalData: {
                            title: "Success",
                            msg: cardDetailsSave,
                            stripePaymentErrorResponse: ""
                          }
                        });
                      } else if (resJson.error) {
                        this.setState({
                          modalData: {
                            title: "Error",
                            msg: cardDetailsfail
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
                } else {
                  var errorMessage = "";
                  switch (resJson.error.message) {
                    case "Your card number is incorrect.":
                      errorMessage = cardNumberInvalid;
                      break;
                    case "Missing required param: card[exp_year].":
                      errorMessage = expireYearInvalid;
                      break;
                    case "Could not find payment information.":
                      errorMessage = cardDetailsNotMAtch;
                      break;
                    case "Your card's expiration year is invalid.":
                      errorMessage = expireYearInvalid;
                      break;
                    case "Your card's expiration month is invalid.":
                      errorMessage = expireMonthInvalid;
                      break;
                    default:
                      errorMessage = expireMonthInvalid;
                  }
                  this.setState({
                    stripePaymentErrorResponse: errorMessage
                  });
                }
              })
              .catch(err => {
                this.setState({
                  stripePaymentErrorResponse: "Invalid card details"
                });
              });
          } else {
            this.setState({
              stripePaymentErrorResponse: "Invalid Expiration date"
            });
          }
        }
      }
    }
  }
  submitRegistration2() {
    // const er = [];
    //e.preventDefault();
    if (this.state.cardNumber.length <= 18) {
      this.setState({
        cardNumberErr: true,
        cardNumberErrMsg: "Invalid Card Number"
      });
    } else {
      this.setState({
        cardNumberErr: false,
        cardNumberErrMsg: ""
      });
      if (this.state.expDate.length <= 4) {
        this.setState({
          expDateErr: true,
          expDateErrMsg: "Invalid Expire Date"
        });
      } else {
        this.setState({
          expDateErr: false,
          expDateErrMsg: ""
        });
        if (this.state.cvNumber.length <= 2) {
          this.setState({
            cvNumberErr: true,
            cvNumberErrMsg: "Invalid CV Number"
          });
        } else {
          this.setState({
            cvNumberErr: false,
            cvNumberErrMsg: ""
          });
          // code for check stripe code
        }
      }
    }
  }
  render() {
    const {
      cardNumber,
      expDate,
      cvNumber,
      cardNumberErr,
      cardNumberErrMsg,
      expDateErr,
      expDateErrMsg,
      cvNumberErr,
      cvNumberErrMsg,
      // formDisable,
      modalData,
      showModal,
      isLoading
    } = this.state;

    return (
      <div className="container">
        <div className="row justify-content-center Regular">
          <div className="col-lg-12 p-5 col-md-12">
            <div className="inside-form Larger ">
              <h3 className="product-title">Payment Details</h3>
              <img
                className="img-responsive pull-right"
                src={imagePack.stripe}
                alt="stripe"
              />
              <hr />
              <form onSubmit={this.submitRegistration}>
                <div
                  className={classNames("has-input", {
                    "has-error": cardNumberErr
                  })}
                >
                  <label>Card Number*</label>
                  <InputMask
                    {...this.props}
                    id="cardNumber"
                    name="cardNumber"
                    value={cardNumber}
                    onChange={this.handelTextChange}
                    type="text"
                    mask="9999-9999-9999-9999"
                    className="form-control"
                    maskChar=""
                    placeholder="0000-0000-0000-0000"
                    autoComplete="off"
                  />
                  {cardNumberErr ? (
                    <p className="error">{cardNumberErrMsg}</p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div
                      className={classNames("has-input", {
                        "has-error": expDateErr
                      })}
                    >
                      <label>Expiration Date*</label>
                      <InputMask
                        {...this.props}
                        mask="99/99"
                        className="form-control"
                        id="expDate"
                        name="expDate"
                        value={expDate}
                        type="text"
                        maskChar=""
                        onChange={this.handelTextChange}
                        placeholder="mm/yy"
                        autoComplete="off"
                      />
                      {expDateErr ? (
                        <p className="error">{expDateErrMsg}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className={classNames("has-input", {
                        "has-error": cvNumberErr
                      })}
                    >
                      <label>CVV Code*</label>
                      <InputMask
                        {...this.props}
                        mask="999"
                        id="cvNumber"
                        name="cvNumber"
                        type="password"
                        value={cvNumber}
                        maskChar=""
                        onChange={this.handelTextChange}
                        className="form-control"
                        placeholder="123"
                        autoComplete="off"
                      />
                      {cvNumberErr ? (
                        <p className="error">{cvNumberErrMsg}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="has-input has-error">
                  <p className="error">
                    {" "}
                    {this.state.stripePaymentErrorResponse}
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <button type="submit" className="btn btn-main btn7">
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Modal
          isOpen={showModal}
          toggle={this.modalDismis}
          className={"full-modal"}
        >
          <ModalHeader toggle={this.modalDismis}>{modalData.title}</ModalHeader>
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

export default StripePymentSave;
