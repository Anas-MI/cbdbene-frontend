import React, { Component } from "react";

import CheckoutLogin from "./checkoutLogin";
export default class PreCheckout extends Component {
  constructor(props) {
    super(props);
    this.handleGaust = this.handleGaust.bind(this);
    this.handleReister = this.handleReister.bind(this);

    this.state = {
      register: false
    };
  }
  handleGaust(e) {
    e.preventDefault();
    this.props.onGaust();
  }
  handleReister(e) {
    e.preventDefault();
    this.props.onRegister();
    // this.setState({register: true})
  }

  render() {
    // const {
    //   match: { params }
    // } = this.props;

    return (
      <div className="container">
        <div className="row align-items-center h80">
          <div className="col-lg-10 offset-lg-1">
            <div
              className="check-wrap
            bg-p2 border p-3 p-md-4 register shadow shadowBoxBackground
             p-md-5 p-3 mb-5 card"
            >
              <div className="center pt-md-5 pb-md-5">
                {/* <div className="inside-checkout-sec-one pb-5">
                  <h3>Being Secured Checkout</h3>
                </div> */}
                <div className="inside-checkout-sec-two">
                  <div className="row">
                    <div className="col-md-6 pl-sm-4 pr-sm-4 border-sm-right">
                      <CheckoutLogin propsData={this.props} />
                    </div>
                    <div className="col-md-6 pl-sm-4 pr-sm-4">
                      <div className="new-customer mt-5 mt-md-0">
                        <h3 className="mb-3">New Customer</h3>
                        <div
                          style={{
                            marginTop: "14px"
                          }}
                          className="inside-new-cus-one"
                        >
                          {/* <p>
                            <strong>Save time now</strong>
                          </p> */}
                          <p
                            style={{
                              fontSize: "15px"
                            }}
                          >
                            You Don't Need an Account to Check Out
                          </p>
                          <button
                            className="btn-main p-3 w-100 btn7"
                            onClick={this.handleGaust}
                            type="button"
                          >
                            Continue as Guest
                          </button>
                        </div>
                        <div
                          style={{
                            marginTop: "30px"
                          }}
                          class="separator-text mb-2 "
                        >
                          <span class="w-auto" style={{ fontSize: "16px" }}>
                            or
                          </span>
                        </div>
                        <div
                          style={{
                            marginTop: "20px"
                          }}
                          className="inside-new-cus-two"
                        >
                          {/* <p>
                            <strong>Save time Later</strong>
                          </p> */}
                          <p
                            style={{
                              fontSize: "15px"
                            }}
                          >
                            Create an Account for Faster Check Out
                          </p>
                          <button
                            onClick={this.handleReister}
                            className="btn-main p-3 w-100 btn7"
                            type="button"
                          >
                            Create Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
