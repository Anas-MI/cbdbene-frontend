import { SET_CONTINENT, SET_COUNTRY, SET_LOCATION } from "./type";

// const redirectToCountry = (countryCode) => {
//   let pathArr = window.location.pathname.split("/");
//   let newPath = pathArr.map((el, index) => {
//     if (el === "") return "/";

//     if (index === 1) return countryCode;

//     return "/" + el;
//   });
//   return newPath.join("");
// }

export const setLocation = location => dispatch => {
  dispatch({
    type: SET_LOCATION,
    payload: location
  });
  // setTimeout(() => {
  //   window.location.href = redirectToCountry(SET_LOCATION.countryCode);
  // }, 200);
};
export const setCountry = country => ({
  type: SET_COUNTRY,
  payload: country
});
export const setContinent = continent => ({
  type: SET_CONTINENT,
  payload: continent
});
