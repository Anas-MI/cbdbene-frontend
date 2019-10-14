import { AllCountryObj } from "./";
export const getCountryName = code => {
  let country = AllCountryObj.map(el => {
    if (el.code === code) {
      return el.name;
    }

    return null;
  });
  return country.join("");
};

export const getCountryCode = countryName => {
  let country = AllCountryObj.map(el => {
    if(countryName){
      if (el.name.trim().toLowerCase() === countryName.trim().toLowerCase()) {
        return el.code;
      }
    }

    return null;
  });
  return country.join("");
};
