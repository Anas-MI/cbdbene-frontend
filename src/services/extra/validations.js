import { isAlpha, isEmail, isEmpty, isNumeric } from "validator";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
  emailNotValidErrMsg,
  phoneNotValidErrMsg,
  zipValidErrMsg
} from "../../constantMessage";
import { enableCountry } from "../../components";

export const required = value => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return "require";
  }
};

export const email = value => {
  if (!isEmail(value)) {
    return `${value} is not a valid email.`;
  }
};

export const fieldValidation = (field = " ", type = " ") => {
  const typeArr = type.split(",").map(el => el.trim());
  if (typeArr.includes("required")) {
    if (isEmpty(field.trim())) {
      return {
        isError: true,
        errorMsg: "can't be empty"
      };
    }
  }
  if (typeArr.includes("name")) {
    if (!isAlpha(field)) {
      return {
        isError: true,
        errorMsg: "Only Alphabets"
      };
    }
  }
  if (typeArr.includes("email")) {
    if (!isEmail(field)) {
      return {
        isError: true,
        errorMsg: emailNotValidErrMsg
      };
    }
  }
  if (typeArr.includes("phone")) {
    if (!isValidPhoneNumber(field)) {
      return {
        isError: true,
        errorMsg: phoneNotValidErrMsg
      };
    }
  }
  if (typeArr.includes("zipcode")) {
    // if(isPostalCode(this.state[field])){
    if (!isNumeric(field)) {
      return {
        isError: true,
        errorMsg: zipValidErrMsg
      };
    }
  }
  if (typeArr.includes("routingNumber")) {
    // if(isPostalCode(this.state[field])){
    if (!isNumeric(field)) {
      if (field.length === 9) {
        return {
          isError: true,
          errorMsg: "Bank routing number should be 9 digits."
        };
      }
      return {
        isError: true,
        errorMsg: "Bank routing number is not Correct."
      };
    }
  }
  if (typeArr.includes("country")) {
    console.log("enable", enableCountry.includes(field));
    if (!enableCountry.includes(field)) {
      return {
        isError: true,
        errorMsg: "Bené offers shipping to USA only"
      };
    }
  }

  return {
    isError: false,
    errorMsg: ""
  };
};
