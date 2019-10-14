import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

export default class PaypalBtn extends Component {
  render() {
    const onSuccess = payment => {
      this.props.onChnagePaypalRetrun(payment);
      const { onSuccess } = this.props;
      if (typeof onSuccess === "function") {
        onSuccess();
      }
      // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
    };

    const onCancel = data => {
      // User pressed "cancel" or close Paypal's popup!
      // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    };

    const onError = err => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
      // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    };

    let env = "sandbox"; // you can set here to 'production' for production
    let currency = "USD"; // or you can set this value from your props or state
    let total =
      parseFloat(this.props.allCartData.shippingCharge || 0) +
      parseFloat(this.props.allCartData.subTotal || 0); // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    const client = {
      sandbox:
        "AQzUmw5DjGVBbkSJ6MYh7hCuPm82zDOmVIe75B0PmeZKX8UQVtnkCygBneHooxjmimRrZXIH1XhuURtE",
      production: "" //'YOUR-PRODUCTION-APP-ID',
    };
    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      </div>
    );
  }
}
