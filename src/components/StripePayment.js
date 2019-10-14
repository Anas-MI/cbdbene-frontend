import React, { Component } from "react";
import InputMask from "react-input-mask";
import classNames from "classnames";
import { imagePack } from "./Constants";

class StripePayment extends Component {
  constructor(props) {
    super(props);
    this.handelTextChange = this.handelTextChange.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.formValidation = this.formValidation.bind(this);
    this.submitRegistration2 = this.submitRegistration2.bind(this);
    this.autoFillForm = this.autoFillForm.bind(this);
    this.state = {
      cardNumber: null,
      expDate: null,
      cvNumber: null,
      cardNumberErr: false,
      cardNumberErrMsg: "",
      expDateErr: false,
      expDateErrMsg: "",
      cvNumberErr: false,
      cvNumberErrMsg: "",
      formDisable: true,
      focused: []
    };
  }

  componentDidMount() {
    //stripeExpressSaveData
    if (this.props.stripeexpresssavedata) {
      const cartDeatils = this.props.stripeexpresssavedata;
      this.setState({
        cardNumber: cartDeatils.cardnumber,
        expDate: cartDeatils.expirydate,
        cvNumber: cartDeatils.cvc
      });
    }
  }
  autoFillForm() {
    //stripeExpressSaveData
    if (this.props.stripeexpresssavedata) {
      const cartDeatils = this.props.stripeexpresssavedata;
      if (this.props.isDummy) {
        const { cardnumber, expirydate } = cartDeatils;
        const addDummyChar = str => {
          const length = str.length;
          const remains = 16 - length;
          const subStr = new Array(remains).fill("X").join("");
          return subStr + str;
        };
        this.setState({
          cardNumber: addDummyChar(cardnumber),
          expDate: expirydate,
          cvNumber: 123
        });
      } else {
        this.setState({
          cardNumber: cartDeatils.cardnumber,
          expDate: cartDeatils.expirydate,
          cvNumber: cartDeatils.cvc
        });
      }
    }
  }
  handelTextChange(e) {
    const { id, value } = e.target;
    this.setState(
      {
        [id]: value
      },
      () => {
        const backDataToOrder = {
          cardNumber: document.getElementById("cardNumber").value,
          cvNumber: document.getElementById("cvNumber").value,
          expDate: document.getElementById("expDate").value
        };
        this.props.stripereturndata(backDataToOrder);
        this.formValidation(id, value);
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

          const backDataToOrder = {
            cardNumber: value,
            cvNumber: this.state.cvNumber,
            expDate: this.state.expDate
          };
          this.props.stripereturndata(backDataToOrder);
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

          const backDataToOrder = {
            cardNumber: this.state.cardNumber,
            cvNumber: value,
            expDate: this.state.expDate
          };
          this.props.stripereturndata(backDataToOrder);
        }
        break;
      case "expDate":
        if (value.length <= 4) {
          this.setState({
            expDateErr: true,
            expDateErrMsg: "Invalid Expire Date"
          });
        } else {
          const valueArr = value.split("/");
          const month = parseInt(valueArr[0]);
          const year = parseInt(`20${valueArr[1]}`);
          const currentMonth = new Date().getMonth() + 1;
          const currentYear = new Date().getFullYear();

          if (month > 12) {
            this.setState({
              expDateErr: true,
              expDateErrMsg: "Invalid Expire Date"
            });
          } else if (year < currentYear) {
            this.setState({
              expDateErr: true,
              expDateErrMsg: "Invalid Expire Date"
            });
          } else if (month < currentMonth && year <= currentYear) {
            this.setState({
              expDateErr: true,
              expDateErrMsg: "Invalid Expire Date"
            });
          } else {
            this.setState({
              expDateErr: false,
              expDateErrMsg: ""
            });

            const backDataToOrder = {
              cardNumber: this.state.cardNumber,
              cvNumber: this.state.cvNumber,
              expDate: value
            };
            this.props.stripereturndata(backDataToOrder);
          }
        }

        const backDataToOrder = {
          cardNumber: this.state.cardNumber,
          cvNumber: this.state.cvNumber,
          expDate: value
        };
        this.props.stripereturndata(backDataToOrder);
        break;
      default:
        break;
    }
  }
  setFocus = e => {
    const { id } = e.target;
    this.setState(prevState => ({
      focused: [...prevState.focused, id]
    }));
  };
  unsetFocus = e => {
    const { id } = e.target;
    this.setState(prevState => ({
      focused: prevState.focused.filter(el => el !== id)
    }));
  };
  isFocused = id => {
    const { focused } = this.state;
    return focused.includes(id);
  };
  submitRegistration(e) {
    // const er = [];
    e.preventDefault();
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
          const backDataToOrder = {
            cardNumber: this.state.cardNumber,
            cvNumber: this.state.cvNumber,
            expDate: this.state.expDate
          };
          this.props.stripereturndata(backDataToOrder);
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
          const backDataToOrder = {
            cardNumber: this.state.cardNumber,
            cvNumber: this.state.cvNumber,
            expDate: this.state.expDate
          };
          this.props.stripereturndata(backDataToOrder);
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
      cvNumberErrMsg
      // formDisable
    } = this.state;

    if (
      this.props.stripeexpresssavedata &&
      this.state.cardNumber === null &&
      this.state.expDate === null &&
      this.state.cvNumber === null
    ) {
      this.autoFillForm();
    }
    const {
      stripereturndata,
      isDummy,
      noTitle,
      className,
      ...restProps
    } = this.props;
    return (
      <div
        className={classNames("container", {
          [className]: className
        })}
      >
        <div className="row justify-content-center Regular">
          <div className="col-lg-12 p-0 col-md-12 ">
            <div className="inside-form Larger ">
              {!noTitle && <h3 className="product-title">Payment Details</h3>}
              <img
                className="img-responsive pull-right"
                src={imagePack.stripe}
                alt="stripe"
              />
              <hr />
              <form onSubmit={this.submitRegistration}>
                <div
                  className={classNames("has-input", {
                    "has-error": cardNumberErr && !this.isFocused("cardNumber")
                  })}
                >
                  <label>Card Number*</label>
                  <InputMask
                    {...restProps}
                    id="cardNumber"
                    name="cardNumber"
                    value={cardNumber || ""}
                    onChange={this.handelTextChange}
                    type="text"
                    mask={
                      isDummy ? "****-****-****-9999" : "9999-9999-9999-9999"
                    }
                    className="form-control"
                    maskChar=""
                    placeholder="0000-0000-0000-0000"
                    autoComplete="nope"
                    onFocus={this.setFocus}
                    onBlur={this.unsetFocus}
                  />
                  {cardNumberErr && !this.isFocused("cardNumber") ? (
                    <p className="error">{cardNumberErrMsg}</p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div
                      className={classNames("has-input", {
                        "has-error": expDateErr && !this.isFocused("expDate")
                      })}
                    >
                      <label>Expiration Date*</label>
                      <InputMask
                        {...restProps}
                        mask={isDummy ? "**/**" : "99/99"}
                        className="form-control"
                        id="expDate"
                        name="expDate"
                        value={expDate || ""}
                        type="text"
                        maskChar=""
                        onChange={this.handelTextChange}
                        placeholder="mm/yy"
                        autoComplete="nope"
                        onFocus={this.setFocus}
                        onBlur={this.unsetFocus}
                      />
                      {expDateErr && !this.isFocused("expDate") ? (
                        <p className="error">{expDateErrMsg}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className={classNames("has-input", {
                        "has-error": cvNumberErr && !this.isFocused("cvNumber")
                      })}
                    >
                      <label>CVV Code*</label>
                      <InputMask
                        {...restProps}
                        mask="999"
                        id="cvNumber"
                        // name="cvNumber"
                        type="password"
                        value={cvNumber || ""}
                        maskChar=""
                        onChange={this.handelTextChange}
                        className="form-control"
                        autoComplete="off"
                        onFocus={this.setFocus}
                        onBlur={this.unsetFocus}
                      />
                      {cvNumberErr && !this.isFocused("cvNumber") ? (
                        <p className="error">{cvNumberErrMsg}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                {this.props.stripepaymenterror
                  ? "All field are required in payment details"
                  : ""}
                {this.props.stripepaymenterrorresponse && (
                  <div className="has-input has-error">
                    <p
                      className="alert alert-danger"
                      // className="error"
                    >
                      {this.props.stripepaymenterrorresponse}
                    </p>
                    <br />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StripePayment;
