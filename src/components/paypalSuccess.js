import React, { Component } from "react";
import { connect } from "react-redux";
import {
  clearCart,
  setPaypalFail,
  setOrderFlag,
  setBillingPlan,
  setPaypalSuccess,
  setSubscribedProducts
} from "../actions";
import classNames from "classnames";
import { Lodar } from "./";
import {
  placeOrderApi,
  createPaypalPlanApi,
  createPaypalAgreementApi,
  paypalprocessagreement,
  addPlanTocutomer
} from "../services/api";
class PaypalSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getParameter: "",
      Message: "Checking Response",
      SpinnerToggle: true
    };
    this.paypalSubscriptionSuccessMessasgeOrder = this.paypalSubscriptionSuccessMessasgeOrder.bind(
      this
    );
  }

  componentDidMount() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var paymentId = url.searchParams.get("paymentId");
    var token = url.searchParams.get("token");
    var PayerID = url.searchParams.get("PayerID");
    if (paymentId) {
      const paymentSuccessDetails = {
        paymentId,
        token,
        PayerID
      };
      if (this.props.paypalOrderDetails) {
        this.orderGanrateCode(paymentSuccessDetails);
      }
    } else {
      this.props.setPaypalFail(true);
    }
  }

  componentWillReceiveProps() {
    this.paypalSubscriptionSuccessMessasgeOrder();
  }

  orderGanrateCode(paymentData = []) {
    const order = this.props.paypalOrderDetails;
    const { user, history, location, orderFlag } = this.props;
    let userid = null;
    userid = user._id;
    if (order) {
      order.paymentmethod = "paypal";
      order.transactionid = paymentData.paymentId;
      if (orderFlag) {
        this.props.setOrderFlag(false);
        order.orderproduct.paymentmethod = "paypal";
        placeOrderApi(order)
          .then(res => res.json())
          .then(resJson => {
            if (resJson.success) {
              if (userid) {
                const subscribedItem = this.props.cart.items.filter(el => {
                  return el.subscribed;
                });
                //********check item have subscription or not **** */
                if (subscribedItem.length > 0) {
                  this.props.setSubscribedProducts(subscribedItem);
                  subscribedItem.map(el => {
                    let amount = 0; //parseFloat(el.)
                    if (el.saleprice) {
                      amount = parseFloat(el.saleprice);
                    } else if (el.regularprice) {
                      amount = parseFloat(el.regularprice);
                    }
                    const discount =
                      amount / parseFloat(el.subscribedDiscountPersent);
                    const data = {
                      name: user.username,
                      description: user.email,
                      interval: el.subscribedTime,
                      currency: "USD",
                      amount: Math.ceil(amount - discount),
                      paypalid: user._id
                    };
                    createPaypalPlanApi(data)
                      .then(res => res.json())
                      .then(resJson => {
                        if (resJson.status) {
                          const planid = resJson.planid;
                          const billingplan = resJson.billingplan;
                          this.props.setBillingPlan(billingplan);

                          const newData = {
                            name: user.username,
                            description: user.email,
                            planid: planid,
                            shippingdetails: {
                              line1: "abc",
                              city: order.country,
                              state: "abc",
                              postal_code: "45220",
                              country_code: "US"
                            }
                          };

                          createPaypalAgreementApi(newData)
                            .then(res => {
                              if (res.status === 404) {
                                this.setState({
                                  Message:
                                    "You can't subscribe without card details"
                                });
                              }
                              return res.json();
                            })
                            .then(resPaypal => {
                              if (resPaypal.approval_url) {
                                const url = resPaypal.approval_url.href;
                                window.open(url, "");
                              }
                            });
                        }
                      });
                    return null;
                  });
                } else {
                  this.props.setOrderFlag(false);
                  this.props.clearCart(user.userMetaId);
                  if (location.countryCode)
                    history.push(`/${location.countryCode}/my-account`);
                  else history.push(`/my-account`);
                  this.props.setPaypalOrderDetails({});
                }

                this.props.clearCart(user.userMetaId);
                this.props.setPaypalOrderDetails({});
                this.props.setOrderFlag(false);
                // window.location.href= "my-account";
              } else {
                this.props.clearCart(user.userMetaId);
                this.props.setOrderFlag(false);
                if (location.countryCode)
                  history.push(`/${location.countryCode}`);
                else history.push("/");
                this.props.setPaypalOrderDetails({});
              }
            } else {
              // this.setState({
              //   Message:"Somthing was wrong please try again."
              // })
            }
          })
          .catch(err => {
            // this.setState({
            //   Message:"Somthing was wrong please try again."
            // })
          });
      }
    }
  }

  paypalSubscriptionSuccessMessasgeOrder() {
    const { location, history, subscribedProducts } = this.props;
    if (localStorage.getItem("paypalSubscriptionSuccesss")) {
      const responsePaypalSubscription = JSON.parse(
        localStorage.getItem("paypalSubscriptionSuccesss")
      );
      // const { cart } = this.props;

      const subscribedItem = subscribedProducts;

      if (subscribedItem.length === responsePaypalSubscription.length) {
        localStorage.removeItem("paypalSubscriptionSuccesss");
        const user = this.props.user;
        const userid = user._id;
        var count = 0;
        subscribedItem.map((key, i) => {
          const token = responsePaypalSubscription[i].token;
          paypalprocessagreement({ token })
            .then(res => {
              return res.json();
            })
            .then(resJson => {})
            .catch(err => {});
          const data = {
            plan: token,
            userid: userid,
            customer: userid
          };
          addPlanTocutomer(data)
            .then(res => res.json())
            .then(resJson => {
              if (count === subscribedItem.length) {
                setTimeout(() => {
                  window.location.href = "my-account";
                }, 2000);
              }
            });
          return null;
        });

        if (location.countryCode)
          history.push(`/${location.countryCode}/my-account`);
        else history.push(`/my-account`);
      }
    }
  }

  render() {
    setInterval(() => {
      this.paypalSubscriptionSuccessMessasgeOrder();
    }, 300);
    const { className } = this.props;
    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        {" "}
        {this.state.SpinnerToggle && <Lodar />} {this.state.Message}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart,
  isExpressCheckout: state.checkout.isExpressCheckout,
  paypalOrderDetails: state.checkout.paypalOrderDetails,
  isPaypalSuccess: state.checkout.isPaypalSuccess,
  billingPlan: state.checkout.billingPlan,
  orderFlag: state.checkout.orderFlag,
  subscribedProducts: state.checkout.subscribedProducts,
  location: state.location
});
export default connect(
  mapStateToProps,
  {
    clearCart,
    setPaypalFail,
    setOrderFlag,
    setSubscribedProducts,
    setBillingPlan,
    setPaypalSuccess
  }
)(PaypalSuccess);
