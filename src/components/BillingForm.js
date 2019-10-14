import React from "react";
import { Field, reduxForm } from "redux-form";

let BillingForm = props => {
  const { handleSubmit } = props;
  return <form onSubmit={handleSubmit}>{/* form body*/}</form>;
};

BillingForm = reduxForm({
  // a unique name for the form
  form: "contact"
})(BillingForm);

export default BillingForm;
