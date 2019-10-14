import React, { Component } from "react";
import InputMask from "react-input-mask";
import classNames from "classnames";
// import { Button } from "reactstrap";
import { connect } from "react-redux";
import {
  // cardDetailsfail,
  // cardDetailsSave,
  // expireMonthInvalid,
  // expireYearInvalid,
  invaliddateNumber,
  cardNumberInvalid,
  // cardDetailsNotMAtch,
  invalidCVVNumber,
  cardSubmitSuccessMsg
} from "../../constantMessage";
import { imagePack } from "../Constants";
// import {
//   stripeTokanCreate
//   // addUpdateUserDetails
// } from "../../services/api";
import { addCard, addCardAuthorize } from "../../actions";
import { Modal, ModalHeader } from "reactstrap";
import { ic_error_outline, ic_done, ic_clear } from "react-icons-kit/md/";

import Icon from "react-icons-kit";
class CardForm extends Component {
  constructor(props) {
    super(props);
    this.handelTextChange = this.handelTextChange.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.formValidation = this.formValidation.bind(this);
    this.submitRegistration2 = this.submitRegistration2.bind(this);
    this.modalDismis = this.modalDismis.bind(this);
    this.state = {
      cardNumber: props.card ? props.card.cardnumber : "" || "",
      expDate: props.card
        ? props.card.expmonth + "/" + props.card.expyear
        : "" || "",
      cvNumber: props.card ? props.card.cvc : "" || "",
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
      cardName: props.card ? props.card.name : "" || "",
      cardNameErr: "",
      cardNameErrMsg: "",
      update: props.card ? true : false,
      modalData: {
        title: "",
        msg: ""
      },
      isSubmitted: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.isSubmitted) {
      if (nextProps.cards.cards && !nextProps.errors.cards) {
        this.clearOnSuccess();
        this.setState(
          prevState => ({
            // showModal: true,
            isLoading: false,
            modalData: {
              ...prevState.modalDate,
              msg: cardSubmitSuccessMsg
            },
            isSubmitted: false
          }),
          () => {
            this.modalTimeout = setTimeout(() => {
              this.modalDismis();
            }, 3000);
          }
        );
      }
    }
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
      [e.target.name]: e.target.value,
      stripePaymentErrorResponse: "",
      cardNumberErr: false,
      expDateErr: false,
      cvNumberErr: false
    });
  }
  onSubmitSuccess = () => {
    const { onSubmitSuccess } = this.props;
    if (typeof onSubmitSuccess === "function") {
      onSubmitSuccess();
    }
  };
  clearOnSuccess = () => {
    if (this.props.clearOnSuccess) {
      this.setState({
        cardNumber: "",
        expDate: "",
        cvNumber: "",
        cardNumberErr: false,
        cardNumberErrMsg: "",
        expDateErr: false,
        expDateErrMsg: "",
        cvNumberErr: false,
        cvNumberErrMsg: "",
        cardName: "",
        cardNameErr: "",
        cardNameErrMsg: "",
        isSubmitted: false
      });
    }
  };
  modalDismis() {
    this.setState(
      {
        isLoading: false,
        showModal: false
      },
      () => {
        this.onSubmitSuccess();
      }
    );
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
      // var cardNumber=this.state.cardNumber.trim();
      if (this.state.cardNumber.length === 0) {
        this.setState({
          cardNumberErr: true,
          cardNumberErrMsg: "Card Number is required"
        });
      } else {
        this.setState({
          cardNumberErr: true,
          cardNumberErrMsg: cardNumberInvalid
        });
      }
    } else {
      this.setState({
        cardNumberErr: false,
        cardNumberErrMsg: ""
      });
    }
    if (this.state.expDate.length <= 4) {
      let expDate = this.state.expDate.trim();
      if (expDate.length === 0) {
        this.setState({
          expDateErr: true,
          expDateErrMsg: "Expiration  Date is required"
        });
      } else {
        this.setState({
          expDateErr: true,
          expDateErrMsg: invaliddateNumber
        });
      }
    } else {
      this.setState({
        expDateErr: false,
        expDateErrMsg: ""
      });
    }

    if (this.state.cvNumber.length <= 2) {
      let cvNumber = this.state.cvNumber.trim();
      if (cvNumber.length === 0) {
        this.setState({
          cvNumberErr: true,
          cvNumberErrMsg: "CVV Code is required"
        });
      } else {
        this.setState({
          cvNumberErr: true,
          cvNumberErrMsg: invalidCVVNumber
        });
      }
    } else {
      this.setState({
        cvNumberErr: false,
        cvNumberErrMsg: ""
      });
    }
    if (
      !(this.state.cardNumber.length <= 18) &&
      !(this.state.expDate.length <= 4) &&
      !(this.state.cvNumber.length <= 2)
    ) {
      const { cvNumber, expDate, cardNumber } = this.state;
      // const cardno = cardNumber.replace(/-/g, "");
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
        const oldCards = this.props.cards.cards;
        this.setState({
          isSubmitted: true
        });
        this.props.addCardAuthorize({
          card: bodyData,
          user: this.props.user,
          oldCards
        });
      } else {
        this.setState({
          stripePaymentErrorResponse: "Invalid Expiration date"
        });
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
      isLoading,
      cardName,
      cardnameErr,
      cardNameErrMsg,
      update
    } = this.state;
    const {
      onSubmitSuccess,
      cardDetail,
      countryCode,
      addCard,
      clearOnSuccess,
      ...restProps
    } = this.props;
    const cardId = this.props.id || new Date().getTime() * Math.random();
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
                    "has-error": cardnameErr
                  })}
                >
                  <label>Card Full Name:</label>
                  <input
                    id={"cardName" + cardId}
                    name="cardName"
                    value={cardName}
                    onChange={this.handelTextChange}
                    type="text"
                    maxLength="30"
                    data-validate={["required"]}
                  />
                  {cardnameErr ? <p className="error">{cardNameErrMsg}</p> : ""}
                </div>
                <div
                  className={classNames("has-input", {
                    "has-error": cardNumberErr
                  })}
                >
                  <label>Card Number*</label>
                  <InputMask
                    {...restProps}
                    id={"cardNumber" + cardId}
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
                        {...restProps}
                        mask="99/99"
                        className="form-control"
                        id={"expDate" + cardId}
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
                        {...restProps}
                        mask="999"
                        id={"cvNumber" + cardId}
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
                {this.state.stripePaymentErrorResponse && (
                  <div className="alert alert-danger">
                    <p className="error mb-0">
                      {" "}
                      {this.state.stripePaymentErrorResponse}
                    </p>
                  </div>
                )}

                <div>
                  {this.props.errors &&
                    this.props.errors.cards &&
                    this.props.errors.cards.map((el, index) => (
                      <div key={index} className="alert alert-danger">
                        <p className="error mb-0"> {el}</p>
                      </div>
                    ))}
                </div>
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <button type="submit" className="btn btn-main btn7">
                      {update ? "Update" : "Save card"}
                    </button>
                  </div>
                  {/* <div className="col-md-3">
                    <Button color="link" className="simple-link">
                      Set as Default
                    </Button>
                  </div> */}
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
const mapStateToProps = state => ({
  countryCode: state.location.countryCode,
  cards: state.cards,
  user: state.user,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addCard, addCardAuthorize }
)(CardForm);
