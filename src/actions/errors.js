import { CLEAR_ERRORS, SET_ERRORS } from "./type";

export const setErrors = payload => ({
  type: SET_ERRORS,
  payload
});
export const clearErrors = payload => ({
  type: CLEAR_ERRORS,
  payload
});
