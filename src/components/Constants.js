import menuCategory from '../menuOrder'

import norton from "../assets/images/getseal.gif";
import bbb from "../assets/images/bbb-accredited-business-logo-png.png";
import mcafee from "../assets/images/mcafee.png";
import truste from "../assets/images/TRUSTe1.png";
import trustWave from "../assets/images/trustwave-logo.png";
import thawte from "../assets/images/thawteimg.png";
import stripe from "../assets/images/strip.png";
import rightArrow from "../assets/images/right-arrow.svg";
import leftChavron from "../assets/images/left-chavron.svg";
import rightChavron from "../assets/images/right-chavron.svg";
import plusCircle from "../assets/images/plus.svg";
import search from "../assets/images/search.svg";
// import logo from "../assets/images/logo.png";
import logo from "../assets/images/bene_new.png";

import allIcon from "../assets/images/all-new.svg";
import capsulesIcon from "../assets/images/capsules-new.svg";
import ediblesIcon from "../assets/images/edibles-new.svg";
import featuredIcon from "../assets/images/featured-new.svg";
import oilsIcon from "../assets/images/oils-new.svg";
import petsIcon from "../assets/images/pets-new.svg";
import topicalIcon from "../assets/images/topical-new.svg";

import slide01 from "../assets/images/slide-1.jpeg";
import thirdPartyIcon from "../assets/images/thirdparty.png";
import affordableIcon from "../assets/images/affordable-icon.png";
import allNaturalIcon from "../assets/images/all-natural.png";
import veganIcon from "../assets/images/vegan.png";
import homeBannerImage from "../assets/images/banner-image.png";
import manImage from "../assets/images/man.png";
import user1 from "../assets/images/user-1.jpg";
import user2 from "../assets/images/user-2.jpg";
import user3 from "../assets/images/user-3.jpg";
import beneLeafHollow from "../assets/images/bene-leaf-hollow.png";
import beneLeaf from "../assets/images/bene-leaf.png";
import beneLeafThumb from "../assets/images/bene-leaf-thumb.png";
import checkHelp from "../assets/images/checkHelp.png";
import menuDummy from "../assets/images/menu-dummy.png";
import banner2bg from "../assets/images/bg-banner-2.png";
import consult1bg from "../assets/images/doctor-smiling-e1479990735873.jpg";
//src\assets\images\doctor-with-tablet.jpg
import consult2bg from "../assets/images/doctor-with-tablet.jpg";
import consultIcon1 from "../assets/images/icon-l-1.svg";
import consultIcon2 from "../assets/images/icon-l-2.svg";
import consultIcon3 from "../assets/images/icon-l-3.svg";
import consultIcon4 from "../assets/images/icon-l-4.svg";
import drEric from "../assets/images/dr-eric.jpg";
import drJamie from "../assets/images/dr-jamie.jpg";
import dropper from "../assets/images/dropper.png";
import cannabis from "../assets/images/cannabis.png";
import medical from "../assets/images/medical.png";
import inkBottle from "../assets/images/ink-bottle.png";
import doctorPng from "../assets/images/doctor.png";
import consult1bgAlter from "../assets/images/doctor-bg-alter.jpg";
import homeBannerImage2 from "../assets/images/home-bg-1.png";
import homeBannerImage3 from "../assets/images/home-bg-2.png";


//

// const menuCategory = JSON.parse(process.env.PUBLIC_URL+'/constants/menuOrder.json')

export const credentials = {
  googleClientId:
    "1037392091534-c0ueu688r94srb8ie8usmduavqi8e2o9.apps.googleusercontent.com",
  facebookAppId: "2132034950208868"
};

export const imagePack = {
  norton,
  bbb,
  mcafee,
  truste,
  trustWave,
  thawte,
  stripe,
  rightArrow,
  leftChavron,
  rightChavron,
  plusCircle,
  search,
  logo,
  allIcon,
  capsulesIcon,
  ediblesIcon,
  featuredIcon,
  oilsIcon,
  petsIcon,
  topicalIcon,
  slide01,
  thirdPartyIcon,
  affordableIcon,
  allNaturalIcon,
  veganIcon,
  homeBannerImage,
  manImage,
  user1,
  user2,
  user3,
  beneLeafHollow,
  beneLeaf,
  beneLeafThumb,
  checkHelp,
  menuDummy,
  banner2bg,
  consult1bg,
  consult2bg,
  consultIcon1,
  consultIcon2,
  consultIcon3,
  consultIcon4,
  drEric,
  drJamie,
  dropper,
  cannabis,
  medical,
  inkBottle,
  doctorPng,
  consult1bgAlter,
  homeBannerImage2,
  homeBannerImage3,
};
export const flickityOptions = {
  initialIndex: 0,
  pageDots: false,
  cellAlign: "left",
  contain: true
};
export const qtyOptions = [
  {
    label: "1",
    value: "1"
  },
  {
    label: "2",
    value: "2"
  },
  {
    label: "3",
    value: "3"
  },
  {
    label: "4",
    value: "4"
  },
  {
    label: "5",
    value: "5"
  },
  {
    label: "6",
    value: "6"
  },
  {
    label: "7",
    value: "7"
  },
  {
    label: "8",
    value: "8"
  },
  {
    label: "9",
    value: "9"
  },
  {
    label: "10",
    value: "10"
  }
];

export const susTimeOptions = [
  {
    label: "1 Month",
    value: "1"
  },
  {
    label: "3 Months",
    value: "3"
  },
  {
    label: "6 Months",
    value: "6"
  },
  {
    label: "1 Year",
    value: "12"
  }
];

export const baseUrl =
  process.env.REACT_APP_SERVER_URL ||
  "http://localhost:3000" ||
  "https://maxxbio.herokuapp.com";

export const filePath = process.env.REACT_APP_FILEPATH || "";
export const regEx = {
  name: /[^a-zA-Z]/,
  fullName: /[^a-zA-Z ]/,
  onlyNumber: /[^0-9]/
};
export const copyToClipboard = str => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
export const regExReplace = {
  name: /[^a-zA-Z]/g,
  fullName: /[^a-zA-Z ]/g,
  onlyNumber: /[^0-9]/g,
  email: /\s/g,
  zipcode: /[^a-zA-Z0-9 ]/g,
  fullname: /[^a-zA-Z ]/g
};
export const colors = {
  dark: "#333",
  lightGrey: "#ccc",
  gainsboro: "#dbdbdb",
  romanceAlter: "#dbdbdb" //#eceae2
};
export const fonts = {
  mainfont: `"Montserrat", "sans-sarif", "sarif"`
};
export const googleFontsInUse = [
  {
    font: "Raleway",
    weights: [
      100,
      "100i",
      200,
      "200i",
      300,
      "300i",
      400,
      "400i",
      500,
      "500i",
      600,
      "600i",
      700,
      "700i",
      800,
      "800i",
      900,
      "900i"
    ]
  },
  {
    font: "Nunito",
    weights: [
      200,
      "200i",
      300,
      "300i",
      400,
      "400i",
      600,
      "600i",
      700,
      "700i",
      800,
      "800i",
      900,
      "900i"
    ]
  },
  {
    font: "Questrial",
    weights: [400]
  },
  {
    font: "Montserrat",
    weights: [
      100,
      "100i",
      200,
      "200i",
      300,
      "300i",
      400,
      "400i",
      500,
      "500i",
      600,
      "600i",
      700,
      "700i",
      800,
      "800i",
      900,
      "900i"
    ]
  }
];
export const localFontList = [
  "Bodoni",
  "Caslon Bold",
  "Clarendon Bold",
  "Clarendon Black",
  "Franklin Gothic",
  "Frutiger",
  "Futura BT",
  "Futura",
  "Garamond",
  "Georgia",
  "Gill Sans",
  "Gill Sans Condensed",
  "Gill Sans Ultra",
  "Gill Sans Ultra Condensed",
  "Graphik",
  "Verdana",
  "Verlag Book",
  "ZapfHumnst BT"
];
export const selectStyle = {
  valueContainer: styles => ({
    ...styles,
    backgroundColor: "transparent",
    padding: 0
  }),
  control: (styles, { isFocused, isSelected }) => ({
    ...styles,
    minHeight: "50px",
    height: "50px",
    border: `1px solid ${colors.lightGrey}`,
    borderRadius: "0",
    backgroundColor: "transparent",
    paddingLeft: "0.8889rem ",
    boxShadow: isFocused ? 0 : 0,
    "&:hover": {
      border: `1px solid ${colors.lightGrey}`
    }
  }),
  input: styles => ({
    ...styles,
    // fontSize: "1.6rem",
    "&:placeholder": {
      color: "rgba(65, 51, 183, 0.5)"
    }
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      fontFamily: fonts.mainfont,
      // fontSize: "1.6rem",
      color: colors.dark,
      backgroundColor: "transparent",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgba(197, 192, 240, 0.25)"
      }
    };
  },
  singleValue: styles => ({
    ...styles,
    fontFamily: fonts.mainfont,
    // fontSize: "1.6rem",
    color: colors.dark,
    fontWeight: "normal"
  }),
  placeholder: styles => ({
    ...styles,
    whiteSpace: "nowrap"
  }),
  dropdownIndicator: (styles, {isDisabled}) => ({
    ...styles,
    padding: "2px",
    display :isDisabled ? "none" : "block"
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: "none"
  }),
  menu: styles => ({
    ...styles,
    borderRadius: "0",
    border: `1px solid ${colors.lightGrey}`,
    marginTop: 0
  }),
  multiValueLabel: styles => ({
    ...styles,
    fontFamily: fonts.mainfont,
    // fontSize: "1.6rem",
    color: colors.dark
  }),
  multiValue: styles => ({
    ...styles,
    border: `1px solid ${colors.lightGrey}`,
    borderRadius: "0",
    backgroundColor: "rgba(197, 192, 240, 0.25)",
    fontFamily: fonts.mainfont,
    // fontSize: "1.6rem",
    color: colors.dark
  }),
  multiValueRemove: styles => ({
    ...styles,
    cursor: "pointer",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
      color: colors.dark
    }
  })
};
export const selectStyleSmall = {
  ...selectStyle,
  control: (styles, { isFocused, isSelected }) => ({
    ...styles,
    minHeight: "40px",
    height: "40px",
    border: `1px solid ${colors.lightGrey}`,
    borderRadius: "0",
    backgroundColor: "transparent",
    paddingLeft: "0.8889rem ",
    boxShadow: isFocused ? 0 : 0,
    "&:hover": {
      border: `1px solid ${colors.lightGrey}`
    }
  }),
  singleValue: styles => ({
    ...styles,
    fontFamily: fonts.mainfont,
    color: colors.dark,
    fontWeight: "normal",
    lineHeight: "40px",
    fontSize: "14px"
  })
};
export const categoryList = [
  // "Capsules",
  // "Bundles",
  // "Topicals",
  // "Edibles",
  // "Pets",
  // "Oils"
  ...menuCategory
];

export const regionsList = [
  {
    name: "Oceania",
    data: "oceania"
  },
  {
    name: "North America",
    data: "north-america"
  },
  {
    name: "South America",
    data: "south-america"
  },
  // {
  //   name: "Americas",
  //   data: "americas"
  // },
  {
    name: "Europe",
    data: "europe"
  },
  {
    name: "Asia",
    data: "asia"
  }
];
export const countryList = [
  {
    title: "Afghanistan",
    code: "AF",
    region: "asia"
  },
  {
    title: "Åland Islands",
    code: "AX",
    region: "europe"
  },
  {
    title: "Albania",
    code: "AL",
    region: "europe"
  },
  {
    title: "Algeria",
    code: "DZ",
    region: "africa"
  },
  {
    title: "American Samoa",
    code: "AS",
    region: "oceania"
  },
  {
    title: "Andorra",
    code: "AD",
    region: "europe"
  },
  {
    title: "Angola",
    code: "AO",
    region: "africa"
  },
  {
    title: "Anguilla",
    code: "AI",
    region: "north-america"
  },
  {
    title: "Antigua and Barbuda",
    code: "AG",
    region: "north-america"
  },
  {
    title: "Argentina",
    code: "AR",
    region: "south-america"
  },
  {
    title: "Armenia",
    code: "AM",
    region: "asia"
  },
  {
    title: "Aruba",
    code: "AW",
    region: "north-america"
  },
  {
    title: "Australia",
    code: "AU",
    region: "oceania"
  },
  {
    title: "Austria",
    code: "AT",
    region: "europe"
  },
  {
    title: "Azerbaijan",
    code: "AZ",
    region: "asia"
  },
  {
    title: "Bahamas",
    code: "BS",
    region: "north-america"
  },
  {
    title: "Bahrain",
    code: "BH",
    region: "asia"
  },
  {
    title: "Bangladesh",
    code: "BD",
    region: "asia"
  },
  {
    title: "Barbados",
    code: "BB",
    region: "north-america"
  },
  {
    title: "Belarus",
    code: "BY",
    region: "europe"
  },
  {
    title: "Belgium",
    code: "BE",
    region: "europe"
  },
  {
    title: "Belize",
    code: "BZ",
    region: "north-america"
  },
  {
    title: "Benin",
    code: "BJ",
    region: "africa"
  },
  {
    title: "Bermuda",
    code: "BM",
    region: "north-america"
  },
  {
    title: "Bhutan",
    code: "BT",
    region: "asia"
  },
  {
    title: "Bolivia, Plurinational State of",
    code: "BO",
    region: "south-america"
  },
  {
    title: "Bonaire, Sint Eustatius and Saba",
    code: "BQ",
    region: "north-america"
  },
  {
    title: "Bosnia and Herzegovina",
    code: "BA",
    region: "europe"
  },
  {
    title: "Botswana",
    code: "BW",
    region: "africa"
  },
  {
    title: "Bouvet Island",
    code: "BV"
  },
  {
    title: "Brazil",
    code: "BR",
    region: "south-america"
  },
  {
    title: "British Indian Ocean Territory",
    code: "IO"
  },
  {
    title: "Brunei Darussalam",
    code: "BN",
    region: "Asia"
  },
  {
    title: "Bulgaria",
    code: "BG",
    region: "europe"
  },
  {
    title: "Burkina Faso",
    code: "BF",
    region: "africa"
  },
  {
    title: "Burundi",
    code: "BI",
    region: "africa"
  },
  {
    title: "Cambodia",
    code: "KH",
    region: "asia"
  },
  {
    title: "Cameroon",
    code: "CM",
    region: "africa"
  },
  {
    title: "Canada",
    code: "CA",
    region: "north-america"
  },
  {
    title: "Cape Verde",
    code: "CV",
    region: "africa"
  },
  {
    title: "Cayman Islands",
    code: "KY",
    region: "north-america"
  },
  {
    title: "Central African Republic",
    code: "CF",
    region: "africa"
  },
  {
    title: "Chad",
    code: "TD",
    region: "africa"
  },
  {
    title: "Chile",
    code: "CL",
    region: "south-america"
  },
  {
    title: "China",
    code: "CN",
    region: "asia"
  },
  {
    title: "Christmas Island",
    code: "CX",
    region: "asia"
  },
  {
    title: "Cocos (Keeling) Islands",
    code: "CC",
    region: "asia"
  },
  {
    title: "Colombia",
    code: "CO",
    region: "south-america"
  },
  {
    title: "Comoros",
    code: "KM",
    region: "africa"
  },
  {
    title: "Congo",
    code: "CG",
    region: "africa"
  },
  {
    title: "Congo, the Democratic Republic of the",
    code: "CD",
    region: "africa"
  },
  {
    title: "Cook Islands",
    code: "CK",
    region: "oceania"
  },
  {
    title: "Costa Rica",
    code: "CR",
    region: "north-america"
  },
  {
    title: "Côte d’Ivoire",
    code: "CI",
    region: "africa"
  },
  {
    title: "Croatia",
    code: "HR",
    region: "europe"
  },
  {
    title: "Cuba",
    code: "CU",
    region: "north-america"
  },
  {
    title: "Cyprus",
    code: "CY",
    region: "asia"
  },
  {
    title: "Czech Republic",
    code: "CZ",
    region: "europe"
  },
  {
    title: "Denmark",
    code: "DK",
    region: "europe"
  },
  {
    title: "Djibouti",
    code: "DJ",
    region: "africa"
  },
  {
    title: "Dominica",
    code: "DM",
    region: "north-america"
  },
  {
    title: "Dominican Republic",
    code: "DO",
    region: "north-america"
  },
  {
    title: "Ecuador",
    code: "EC",
    region: "south-america"
  },
  {
    title: "Egypt",
    code: "EG",
    region: "africa"
  },
  {
    title: "El Salvador",
    code: "SV",
    region: "north-america"
  },
  {
    title: "Equatorial Guinea",
    code: "GQ",
    region: "africa"
  },
  {
    title: "Eritrea",
    code: "ER",
    region: "africa"
  },
  {
    title: "Estonia",
    code: "EE",
    region: "europe"
  },
  {
    title: "Ethiopia",
    code: "ET",
    region: "africa"
  },
  {
    title: "Falkland Islands (Malvinas)",
    code: "FK",
    region: "south-america"
  },
  {
    title: "Faroe Islands",
    code: "FO",
    region: "europe"
  },
  {
    title: "Fiji",
    code: "FJ",
    region: "oceania"
  },
  {
    title: "Finland",
    code: "FI",
    region: "europe"
  },
  {
    title: "France",
    code: "FR",
    region: "europe"
  },
  {
    title: "French Guiana",
    code: "GF",
    region: "south-america"
  },
  {
    title: "French Polynesia",
    code: "PF",
    region: "oceania"
  },
  {
    title: "French Southern Territories",
    code: "TF"
  },
  {
    title: "Gabon",
    code: "GA",
    region: "africa"
  },
  {
    title: "Gambia",
    code: "GM",
    region: "africa"
  },
  {
    title: "Georgia",
    code: "GE",
    region: "asia"
  },
  {
    title: "Germany",
    code: "DE",
    region: "europe"
  },
  {
    title: "Ghana",
    code: "GH",
    region: "africa"
  },
  {
    title: "Gibraltar",
    code: "GI",
    region: "europe"
  },
  {
    title: "Greece",
    code: "GR",
    region: "europe"
  },
  {
    title: "Greenland",
    code: "GL",
    region: "north-america"
  },
  {
    title: "Grenada",
    code: "GD",
    region: "north-america"
  },
  {
    title: "Guadeloupe",
    code: "GP",
    region: "north-america"
  },
  {
    title: "Guam",
    code: "GU",
    region: "oceania"
  },
  {
    title: "Guatemala",
    code: "GT",
    region: "north-america"
  },
  {
    title: "Guernsey",
    code: "GG",
    region: "europe"
  },
  {
    title: "Guinea",
    code: "GN",
    region: "africa"
  },
  {
    title: "Guinea-Bissau",
    code: "GW",
    region: "africa"
  },
  {
    title: "Guyana",
    code: "GY",
    region: "south-america"
  },
  {
    title: "Haiti",
    code: "HT",
    region: "north-america"
  },
  {
    title: "Holy See (Vatican City State)",
    code: "VA",
    region: "europe"
  },
  {
    title: "Honduras",
    code: "HN",
    region: "north-america"
  },
  {
    title: "Hong Kong",
    code: "HK",
    region: "asia"
  },
  {
    title: "Hungary",
    code: "HU",
    region: "europe"
  },
  {
    title: "Iceland",
    code: "IS",
    region: "europe"
  },
  {
    title: "India",
    code: "IN",
    region: "asia"
  },
  {
    title: "Indonesia",
    code: "ID",
    region: "asia"
  },
  {
    title: "Iran, Islamic Republic of",
    code: "IR",
    region: "Asia"
  },
  {
    title: "Iraq",
    code: "IQ",
    region: "asia"
  },
  {
    title: "Ireland",
    code: "IE",
    region: "europe"
  },
  {
    title: "Isle of Man",
    code: "IM",
    region: "europe"
  },
  {
    title: "Israel",
    code: "IL",
    region: "asia"
  },
  {
    title: "Italy",
    code: "IT",
    region: "europe"
  },
  {
    title: "Jamaica",
    code: "JM",
    region: "north-america"
  },
  {
    title: "Japan",
    code: "JP",
    region: "asia"
  },
  {
    title: "Jersey",
    code: "JE",
    region: "europe"
  },
  {
    title: "Jordan",
    code: "JO",
    region: "asia"
  },
  {
    title: "Kazakhstan",
    code: "KZ",
    region: "asia"
  },
  {
    title: "Kenya",
    code: "KE",
    region: "africa"
  },
  {
    title: "Kiribati",
    code: "KI",
    region: "oceania"
  },
  {
    title: "Korea, Democratic People's Republic of",
    code: "KP",
    region: "asia"
  },
  {
    title: "Korea, Republic of",
    code: "KR",
    region: "asia"
  },
  {
    title: "Kuwait",
    code: "KW",
    region: "asia"
  },
  {
    title: "Kyrgyzstan",
    code: "KG",
    region: "asia"
  },
  {
    title: "Lao People's Democratic Republic",
    code: "LA"
  },
  {
    title: "Latvia",
    code: "LV",
    region: "europe"
  },
  {
    title: "Lebanon",
    code: "LB",
    region: "asia"
  },
  {
    title: "Lesotho",
    code: "LS",
    region: "africa"
  },
  {
    title: "Liberia",
    code: "LR",
    region: "africa"
  },
  {
    title: "Libya",
    code: "LY",
    region: "africa"
  },
  {
    title: "Liechtenstein",
    code: "LI",
    region: "europe"
  },
  {
    title: "Lithuania",
    code: "LT",
    region: "europe"
  },
  {
    title: "Luxembourg",
    code: "LU",
    region: "europe"
  },
  {
    title: "Macao",
    code: "MO",
    region: "asia"
  },
  {
    title: "Macedonia, the Former Yugoslav Republic of",
    code: "MK",
    region: "europe"
  },
  {
    title: "Madagascar",
    code: "MG",
    region: "africa"
  },
  {
    title: "Malawi",
    code: "MW",
    region: "africa"
  },
  {
    title: "Malaysia",
    code: "MY",
    region: "asia"
  },
  {
    title: "Maldives",
    code: "MV",
    region: "asia"
  },
  {
    title: "Mali",
    code: "ML",
    region: "africa"
  },
  {
    title: "Malta",
    code: "MT",
    region: "europe"
  },
  {
    title: "Marshall Islands",
    code: "MH",
    region: "oceania"
  },
  {
    title: "Martinique",
    code: "MQ",
    region: "north-america"
  },
  {
    title: "Mauritania",
    code: "MR",
    region: "africa"
  },
  {
    title: "Mauritius",
    code: "MU",
    region: "africa"
  },
  {
    title: "Mayotte",
    code: "YT",
    region: "africa"
  },
  {
    title: "Mexico",
    code: "MX",
    region: "north-america"
  },
  {
    title: "Micronesia, Federated States of",
    code: "FM",
    region: "oceania"
  },
  {
    title: "Moldova, Republic of",
    code: "MD",
    region: "europe"
  },
  {
    title: "Monaco",
    code: "MC",
    region: "europe"
  },
  {
    title: "Mongolia",
    code: "MN",
    region: "asia"
  },
  {
    title: "Montenegro",
    code: "ME",
    region: "europe"
  },
  {
    title: "Montserrat",
    code: "MS",
    region: "north-america"
  },
  {
    title: "Morocco",
    code: "MA",
    region: "africa"
  },
  {
    title: "Mozambique",
    code: "MZ",
    region: "africa"
  },
  {
    title: "Myanmar",
    code: "MM",
    region: "asia"
  },
  {
    title: "Namibia",
    code: "NA",
    region: "africa"
  },
  {
    title: "Nauru",
    code: "NR",
    region: "oceania"
  },
  {
    title: "Nepal",
    code: "NP",
    region: "asia"
  },
  {
    title: "Netherlands",
    code: "NL",
    region: "europe"
  },
  {
    title: "New Caledonia",
    code: "NC",
    region: "oceania"
  },
  {
    title: "New Zealand",
    code: "NZ",
    region: "oceania"
  },
  {
    title: "Nicaragua",
    code: "NI",
    region: "north-america"
  },
  {
    title: "Niger",
    code: "NE",
    region: "africa"
  },
  {
    title: "Nigeria",
    code: "NG",
    region: "africa"
  },
  {
    title: "Niue",
    code: "NU",
    region: "oceania"
  },
  {
    title: "Norfolk Island",
    code: "NF",
    region: "oceania"
  },
  {
    title: "Northern Mariana Islands",
    code: "MP",
    region: "oceania"
  },
  {
    title: "Norway",
    code: "NO",
    region: "europe"
  },
  {
    title: "Oman",
    code: "OM",
    region: "asia"
  },
  {
    title: "Pakistan",
    code: "PK",
    region: "asia"
  },
  {
    title: "Palau",
    code: "PW",
    region: "oceania"
  },
  {
    title: "Palestine, State of",
    code: "PS",
    region: "asia"
  },
  {
    title: "Panama",
    code: "PA",
    region: "north-america"
  },
  {
    title: "Papua New Guinea",
    code: "PG",
    region: "oceania"
  },
  {
    title: "Paraguay",
    code: "PY",
    region: "south-america"
  },
  {
    title: "Peru",
    code: "PE",
    region: "south-america"
  },
  {
    title: "Philippines",
    code: "PH",
    region: "asia"
  },
  {
    title: "Pitcairn",
    code: "PN",
    region: "oceania"
  },
  {
    title: "Poland",
    code: "PL",
    region: "europe"
  },
  {
    title: "Portugal",
    code: "PT",
    region: "europe"
  },
  {
    title: "Puerto Rico",
    code: "PR",
    region: "north-america"
  },
  {
    title: "Qatar",
    code: "QA",
    region: "asia"
  },
  {
    title: "Reunion",
    code: "RE",
    region: "africa"
  },
  {
    title: "Romania",
    code: "RO",
    region: "europe"
  },
  {
    title: "Russian Federation",
    code: "RU",
    region: "asia"
  },
  {
    title: "Rwanda",
    code: "RW",
    region: "africa"
  },
  {
    title: "Saint Barthélemy",
    code: "BL",
    region: "europe"
  },
  {
    title: "Saint Helena, Ascension and Tristan da Cunha",
    code: "SH",
    region: "africa"
  },
  {
    title: "Saint Kitts and Nevis",
    code: "KN",
    region: "north-america"
  },
  {
    title: "Saint Lucia",
    code: "LC",
    region: "north-america"
  },
  {
    title: "Saint Martin (French part)",
    code: "MF",
    region: "north-america"
  },
  {
    title: "Saint Pierre and Miquelon",
    code: "PM",
    region: "north-america"
  },
  {
    title: "Saint Vincent and the Grenadines",
    code: "VC",
    region: "north-america"
  },
  {
    title: "Samoa",
    code: "WS",
    region: "oceania"
  },
  {
    title: "San Marino",
    code: "SM",
    region: "europe"
  },
  {
    title: "Sao Tome and Principe",
    code: "ST",
    region: "africa"
  },
  {
    title: "Saudi Arabia",
    code: "SA",
    region: "asia"
  },
  {
    title: "Senegal",
    code: "SN",
    region: "africa"
  },
  {
    title: "Serbia",
    code: "RS",
    region: "europe"
  },
  {
    title: "Seychelles",
    code: "SC",
    region: "africa"
  },
  {
    title: "Sierra Leone",
    code: "SL",
    region: "africa"
  },
  {
    title: "Singapore",
    code: "SG",
    region: "asia"
  },
  {
    title: "Sint Maarten (Dutch part)",
    code: "SX",
    region: "north-america"
  },
  {
    title: "Slovakia",
    code: "SK",
    region: "europe"
  },
  {
    title: "Slovenia",
    code: "SI",
    region: "europe"
  },
  {
    title: "Solomon Islands",
    code: "SB",
    region: "oceania"
  },
  {
    title: "Somalia",
    code: "SO",
    region: "africa"
  },
  {
    title: "South Africa",
    code: "ZA",
    region: "africa"
  },
  {
    title: "South Sudan",
    code: "SS",
    region: "africa"
  },
  {
    title: "Spain",
    code: "ES",
    region: "europe"
  },
  {
    title: "Sri Lanka",
    code: "LK",
    region: "asia"
  },
  {
    title: "Sudan",
    code: "SD",
    region: "africa"
  },
  {
    title: "Suriname",
    code: "SR",
    region: "south-america"
  },
  {
    title: "Svalbard and Jan Mayen",
    code: "SJ",
    region: "europe"
  },
  {
    title: "Swaziland",
    code: "SZ",
    region: "africa"
  },
  {
    title: "Sweden",
    code: "SE",
    region: "europe"
  },
  {
    title: "Switzerland",
    code: "CH",
    region: "europe"
  },
  {
    title: "Syrian Arab Republic",
    code: "SY",
    region: "asia"
  },
  {
    title: "Taiwan, Province of China",
    code: "TW",
    region: "asia"
  },
  {
    title: "Tajikistan",
    code: "TJ",
    region: "asia"
  },
  {
    title: "Tanzania, United Republic of",
    code: "TZ",
    region: "africa"
  },
  {
    title: "Thailand",
    code: "TH",
    region: "asia"
  },
  {
    title: "Timor-Leste",
    code: "TL",
    region: "asia"
  },
  {
    title: "Togo",
    code: "TG",
    region: "africa"
  },
  {
    title: "Tokelau",
    code: "TK",
    region: "oceania"
  },
  {
    title: "Tonga",
    code: "TO",
    region: "oceania"
  },
  {
    title: "Trinidad and Tobago",
    code: "TT",
    region: "north-america"
  },
  {
    title: "Tunisia",
    code: "TN",
    region: "africa"
  },
  {
    title: "Turkey",
    code: "TR",
    region: "europe"
  },
  {
    title: "Turkmenistan",
    code: "TM",
    region: "asia"
  },
  {
    title: "Turks and Caicos Islands",
    code: "TC",
    region: "north-america"
  },
  {
    title: "Tuvalu",
    code: "TV",
    region: "oceania"
  },
  {
    title: "Uganda",
    code: "UG",
    region: "africa"
  },
  {
    title: "Ukraine",
    code: "UA",
    region: "europe"
  },
  {
    title: "United Arab Emirates",
    code: "AE",
    region: "asia"
  },
  {
    title: "United Kingdom",
    code: "GB",
    region: "europe"
  },
  {
    title: "United States",
    code: "US",
    region: "north-america"
  },
  {
    title: "United States Minor Outlying Islands",
    code: "UM",
    region: "north-america"
  },
  {
    title: "Uruguay",
    code: "UY",
    region: "south-america"
  },
  {
    title: "Uzbekistan",
    code: "UZ",
    region: "asia"
  },
  {
    title: "Vanuatu",
    code: "VU",
    region: "oceania"
  },
  {
    title: "Venezuela, Bolivarian Republic of",
    code: "VE",
    region: "south-america"
  },
  {
    title: "Vietnam",
    code: "VN",
    region: "asia"
  },
  {
    title: "Virgin Islands, British",
    code: "VG",
    region: "north-america"
  },
  {
    title: "Virgin Islands, U.S.",
    code: "VI",
    region: "north-america"
  },
  {
    title: "Wallis and Futuna",
    code: "WF",
    region: "oceania"
  },
  {
    title: "Western Sahara",
    code: "EH",
    region: "africa"
  },
  {
    title: "Yemen",
    code: "YE",
    region: "asia"
  },
  {
    title: "Zambia",
    code: "ZM",
    region: "africa"
  },
  {
    title: "Zimbabwe",
    code: "ZW",
    region: "africa"
  }
];
export const countryListOld = [
  {
    title: "Andorra",
    code: "AD",
    region: "europe"
  },
  {
    title: "Australia",
    code: "AU",
    region: "oceania"
  },
  {
    title: "Austria",
    code: "AT",
    region: "europe"
  },
  {
    title: "Belgium",
    code: "BE",
    region: "europe"
  },
  {
    title: "Bulgaria",
    code: "BG",
    region: "europe"
  },
  {
    title: "Canada",
    code: "CA",
    region: "americas"
  },
  {
    title: "Cyprus",
    code: "CY",
    region: "europe"
  },
  {
    title: "Czech Republic",
    code: "CZ",
    region: "europe"
  },
  {
    title: "Denmark",
    code: "DK",
    region: "europe"
  },
  {
    title: "Estonia",
    code: "EE",
    region: "europe"
  },
  {
    title: "Finland",
    code: "FI",
    region: "europe"
  },
  {
    title: "France",
    code: "FR",
    region: "europe"
  },
  {
    title: "Germany",
    code: "DE",
    region: "europe"
  },
  {
    title: "Greece",
    code: "GR",
    region: "europe"
  },
  {
    title: "Hong Kong",
    code: "HK",
    region: "asia"
  },
  {
    title: "Hungary",
    code: "HU",
    region: "europe"
  },
  {
    title: "Iceland",
    code: "IS",
    region: "europe"
  },
  {
    title: "Ireland",
    code: "IE",
    region: "europe"
  },
  {
    title: "Italy",
    code: "IT",
    region: "europe"
  },
  {
    title: "Japan",
    code: "JP",
    region: "asia"
  },
  {
    title: "Korea, republic of",
    code: "KR",
    region: "asia"
  },
  {
    title: "Latvia",
    code: "LV",
    region: "europe"
  },
  {
    title: "Lithuania",
    code: "LT",
    region: "europe"
  },
  {
    title: "Luxembourg",
    code: "LU",
    region: "europe"
  },
  {
    title: "Malta",
    code: "MT",
    region: "europe"
  },
  {
    title: "Monaco",
    code: "MC",
    region: "europe"
  },
  {
    title: "Netherlands",
    code: "NL",
    region: "europe"
  },
  {
    title: "New Zealand",
    code: "NZ",
    region: "oceania"
  },
  {
    title: "Norway",
    code: "NO",
    region: "europe"
  },
  {
    title: "Poland",
    code: "PL",
    region: "europe"
  },
  {
    title: "Portugal",
    code: "PT",
    region: "europe"
  },
  {
    title: "Romania",
    code: "RO",
    region: "europe"
  },
  {
    title: "San Marino",
    code: "SM",
    region: "europe"
  },
  {
    title: "Singapore",
    code: "SG",
    region: "asia"
  },
  {
    title: "Slovak Republic",
    code: "SK",
    region: "europe"
  },
  {
    title: "Slovenia",
    code: "SI",
    region: "europe"
  },
  {
    title: "Spain",
    code: "ES",
    region: "europe"
  },
  {
    title: "Sweden",
    code: "SE",
    region: "europe"
  },
  {
    title: "Switzerland",
    code: "CH",
    region: "europe"
  },
  {
    title: "Taiwan",
    code: "TW",
    region: "asia"
  },
  {
    title: "Thailand",
    code: "TH",
    region: "asia"
  },
  {
    title: "United Kingdom",
    code: "GB",
    region: "europe"
  },
  {
    title: "United States",
    code: "US",
    region: "americas"
  }
];

export const phoneCodeList = {
  AF: {
    name: "Afghanistan",
    iso2: "AF",
    code: "93"
  },
  AL: {
    name: "Albania",
    iso2: "AL",
    code: "355"
  },
  DZ: {
    name: "Algeria",
    iso2: "DZ",
    code: "213"
  },
  AS: {
    name: "American Samoa",
    iso2: "AS",
    code: "1 684"
  },
  AD: {
    name: "Andorra",
    iso2: "AD",
    code: "376"
  },
  AO: {
    name: "Angola",
    iso2: "AO",
    code: "244"
  },
  AI: {
    name: "Anguilla",
    iso2: "AI",
    code: "1 264"
  },
  AQ: {
    name: "Antarctica",
    iso2: "AQ",
    code: "672"
  },
  AG: {
    name: "Antigua And Barbuda",
    iso2: "AG",
    code: "1 268"
  },
  AR: {
    name: "Argentina",
    iso2: "AR",
    code: "54"
  },
  AM: {
    name: "Armenia",
    iso2: "AM",
    code: "374"
  },
  AW: {
    name: "Aruba",
    iso2: "AW",
    code: "297"
  },
  AC: {
    name: "Ascension Island",
    iso2: "AC",
    code: "247"
  },
  AU: {
    name: "Australia",
    iso2: "AU",
    code: "61"
  },
  AT: {
    name: "Austria",
    iso2: "AT",
    code: "43"
  },
  AZ: {
    name: "Azerbaijan",
    iso2: "AZ",
    code: "994"
  },
  BS: {
    name: "Bahamas",
    iso2: "BS",
    code: "1 242"
  },
  BH: {
    name: "Bahrain",
    iso2: "BH",
    code: "973"
  },
  BD: {
    name: "Bangladesh",
    iso2: "BD",
    code: "880"
  },
  BB: {
    name: "Barbados",
    iso2: "BB",
    code: "1 246"
  },
  BY: {
    name: "Belarus",
    iso2: "BY",
    code: "375"
  },
  BE: {
    name: "Belgium",
    iso2: "BE",
    code: "32"
  },
  BZ: {
    name: "Belize",
    iso2: "BZ",
    code: "501"
  },
  BJ: {
    name: "Benin",
    iso2: "BJ",
    code: "229"
  },
  BM: {
    name: "Bermuda",
    iso2: "BM",
    code: "1 441"
  },
  BT: {
    name: "Bhutan",
    iso2: "BT",
    code: "975"
  },
  BO: {
    name: "Bolivia, Plurinational State Of",
    iso2: "BO",
    code: "591"
  },
  BQ: {
    name: "Bonaire, Saint Eustatius And Saba",
    iso2: "BQ",
    code: "599"
  },
  BA: {
    name: "Bosnia & Herzegovina",
    iso2: "BA",
    code: "387"
  },
  BW: {
    name: "Botswana",
    iso2: "BW",
    code: "267"
  },
  BV: {
    name: "Bouvet Island",
    iso2: "BV",
    code: ""
  },
  BR: {
    name: "Brazil",
    iso2: "BR",
    code: "55"
  },
  IO: {
    name: "British Indian Ocean Territory",
    iso2: "IO",
    code: "246"
  },
  BN: {
    name: "Brunei Darussalam",
    iso2: "BN",
    code: "673"
  },
  BG: {
    name: "Bulgaria",
    iso2: "BG",
    code: "359"
  },
  BF: {
    name: "Burkina Faso",
    iso2: "BF",
    code: "226"
  },
  BI: {
    name: "Burundi",
    iso2: "BI",
    code: "257"
  },
  KH: {
    name: "Cambodia",
    iso2: "KH",
    code: "855"
  },
  CM: {
    name: "Cameroon",
    iso2: "CM",
    code: "237"
  },
  CA: {
    name: "Canada",
    iso2: "CA",
    code: "1"
  },
  IC: {
    name: "Canary Islands",
    iso2: "IC",
    code: ""
  },
  CV: {
    name: "Cape Verde",
    iso2: "CV",
    code: "238"
  },
  KY: {
    name: "Cayman Islands",
    iso2: "KY",
    code: "1 345"
  },
  CF: {
    name: "Central African Republic",
    iso2: "CF",
    code: "236"
  },
  EA: {
    name: "Ceuta, Mulilla",
    iso2: "EA",
    code: ""
  },
  TD: {
    name: "Chad",
    iso2: "TD",
    code: "235"
  },
  CL: {
    name: "Chile",
    iso2: "CL",
    code: "56"
  },
  CN: {
    name: "China",
    iso2: "CN",
    code: "86"
  },
  CX: {
    name: "Christmas Island",
    iso2: "CX",
    code: "61"
  },
  CP: {
    name: "Clipperton Island",
    iso2: "CP",
    code: ""
  },
  CC: {
    name: "Cocos (Keeling) Islands",
    iso2: "CC",
    code: "61"
  },
  CO: {
    name: "Colombia",
    iso2: "CO",
    code: "57"
  },
  KM: {
    name: "Comoros",
    iso2: "KM",
    code: "269"
  },
  CK: {
    name: "Cook Islands",
    iso2: "CK",
    code: "682"
  },
  CR: {
    name: "Costa Rica",
    iso2: "CR",
    code: "506"
  },
  CI: {
    name: "Cote d'Ivoire",
    iso2: "CI",
    code: "225"
  },
  HR: {
    name: "Croatia",
    iso2: "HR",
    code: "385"
  },
  CU: {
    name: "Cuba",
    iso2: "CU",
    code: "53"
  },
  CW: {
    name: "Curacao",
    iso2: "CW",
    code: "599"
  },
  CY: {
    name: "Cyprus",
    iso2: "CY",
    code: "357"
  },
  CZ: {
    name: "Czech Republic",
    iso2: "CZ",
    code: "420"
  },
  CD: {
    name: "Democratic Republic Of Congo",
    iso2: "CD",
    code: "243"
  },
  DK: {
    name: "Denmark",
    iso2: "DK",
    code: "45"
  },
  DG: {
    name: "Diego Garcia",
    iso2: "DG",
    code: ""
  },
  DJ: {
    name: "Djibouti",
    iso2: "DJ",
    code: "253"
  },
  DM: {
    name: "Dominica",
    iso2: "DM",
    code: "1 767"
  },
  DO: {
    name: "Dominican Republic",
    iso2: "DO",
    code: "1 809"
  },
  TL: {
    name: "East Timor",
    iso2: "TL",
    code: "670"
  },
  EC: {
    name: "Ecuador",
    iso2: "EC",
    code: "593"
  },
  EG: {
    name: "Egypt",
    iso2: "EG",
    code: "20"
  },
  SV: {
    name: "El Salvador",
    iso2: "SV",
    code: "503"
  },
  GQ: {
    name: "Equatorial Guinea",
    iso2: "GQ",
    code: "240"
  },
  ER: {
    name: "Eritrea",
    iso2: "ER",
    code: "291"
  },
  EE: {
    name: "Estonia",
    iso2: "EE",
    code: "372"
  },
  ET: {
    name: "Ethiopia",
    iso2: "ET",
    code: "251"
  },
  EU: {
    name: "European Union",
    iso2: "EU",
    code: "388"
  },
  FK: {
    name: "Falkland Islands",
    iso2: "FK",
    code: "500"
  },
  FO: {
    name: "Faroe Islands",
    iso2: "FO",
    code: "298"
  },
  FJ: {
    name: "Fiji",
    iso2: "FJ",
    code: "679"
  },
  FI: {
    name: "Finland",
    iso2: "FI",
    code: "358"
  },
  FR: {
    name: "France",
    iso2: "FR",
    code: "33"
  },
  FX: {
    name: "France, Metropolitan",
    iso2: "FX",
    code: "241"
  },
  GF: {
    name: "French Guiana",
    iso2: "GF",
    code: "44"
  },
  PF: {
    name: "French Polynesia",
    iso2: "PF",
    code: "689"
  },
  TF: {
    name: "French Southern Territories",
    iso2: "TF",
    code: ""
  },
  GA: {
    name: "Gabon",
    iso2: "GA",
    code: "44"
  },
  GM: {
    name: "Gambia",
    iso2: "GM",
    code: "220"
  },
  GE: {
    name: "Georgia",
    iso2: "GE",
    code: "594"
  },
  DE: {
    name: "Germany",
    iso2: "DE",
    code: "49"
  },
  GH: {
    name: "Ghana",
    iso2: "GH",
    code: "233"
  },
  GI: {
    name: "Gibraltar",
    iso2: "GI",
    code: "350"
  },
  GR: {
    name: "Greece",
    iso2: "GR",
    code: "30"
  },
  GL: {
    name: "Greenland",
    iso2: "GL",
    code: "299"
  },
  GD: {
    name: "Grenada",
    iso2: "GD",
    code: "995"
  },
  GP: {
    name: "Guadeloupe",
    iso2: "GP",
    code: "590"
  },
  GU: {
    name: "Guam",
    iso2: "GU",
    code: "1 671"
  },
  GT: {
    name: "Guatemala",
    iso2: "GT",
    code: "502"
  },
  GG: {
    name: "Guernsey",
    iso2: "GG",
    code: ""
  },
  GN: {
    name: "Guinea",
    iso2: "GN",
    code: "224"
  },
  GW: {
    name: "Guinea-bissau",
    iso2: "GW",
    code: "245"
  },
  GY: {
    name: "Guyana",
    iso2: "GY",
    code: "592"
  },
  HT: {
    name: "Haiti",
    iso2: "HT",
    code: "509"
  },
  HM: {
    name: "Heard Island And McDonald Islands",
    iso2: "HM",
    code: ""
  },
  HN: {
    name: "Honduras",
    iso2: "HN",
    code: "504"
  },
  HK: {
    name: "Hong Kong",
    iso2: "HK",
    code: "852"
  },
  HU: {
    name: "Hungary",
    iso2: "HU",
    code: "36"
  },
  IS: {
    name: "Iceland",
    iso2: "IS",
    code: "354"
  },
  IN: {
    name: "India",
    iso2: "IN",
    code: "91"
  },
  ID: {
    name: "Indonesia",
    iso2: "ID",
    code: "62"
  },
  IR: {
    name: "Iran, Islamic Republic Of",
    iso2: "IR",
    code: "98"
  },
  IQ: {
    name: "Iraq",
    iso2: "IQ",
    code: "964"
  },
  IE: {
    name: "Ireland",
    iso2: "IE",
    code: "353"
  },
  IM: {
    name: "Isle Of Man",
    iso2: "IM",
    code: "44"
  },
  IL: {
    name: "Israel",
    iso2: "IL",
    code: "972"
  },
  IT: {
    name: "Italy",
    iso2: "IT",
    code: "39"
  },
  JM: {
    name: "Jamaica",
    iso2: "JM",
    code: "1 876"
  },
  JP: {
    name: "Japan",
    iso2: "JP",
    code: "81"
  },
  JE: {
    name: "Jersey",
    iso2: "JE",
    code: "44"
  },
  JO: {
    name: "Jordan",
    iso2: "JO",
    code: "962"
  },
  KZ: {
    name: "Kazakhstan",
    iso2: "KZ",
    code: "7"
  },
  KE: {
    name: "Kenya",
    iso2: "KE",
    code: "254"
  },
  KI: {
    name: "Kiribati",
    iso2: "KI",
    code: "686"
  },
  KP: {
    name: "Korea, Democratic People's Republic Of",
    iso2: "KP",
    code: "850"
  },
  KR: {
    name: "Korea, Republic Of",
    iso2: "KR",
    code: "82"
  },
  KW: {
    name: "Kuwait",
    iso2: "KW",
    code: "965"
  },
  KG: {
    name: "Kyrgyzstan",
    iso2: "KG",
    code: "996"
  },
  LA: {
    name: "Lao People's Democratic Republic",
    iso2: "LA",
    code: "856"
  },
  LV: {
    name: "Latvia",
    iso2: "LV",
    code: "371"
  },
  LB: {
    name: "Lebanon",
    iso2: "LB",
    code: "961"
  },
  LS: {
    name: "Lesotho",
    iso2: "LS",
    code: "266"
  },
  LR: {
    name: "Liberia",
    iso2: "LR",
    code: "231"
  },
  LY: {
    name: "Libya",
    iso2: "LY",
    code: "218"
  },
  LI: {
    name: "Liechtenstein",
    iso2: "LI",
    code: "423"
  },
  LT: {
    name: "Lithuania",
    iso2: "LT",
    code: "370"
  },
  LU: {
    name: "Luxembourg",
    iso2: "LU",
    code: "352"
  },
  MO: {
    name: "Macao",
    iso2: "MO",
    code: "853"
  },
  MK: {
    name: "Macedonia, The Former Yugoslav Republic Of",
    iso2: "MK",
    code: "389"
  },
  MG: {
    name: "Madagascar",
    iso2: "MG",
    code: "261"
  },
  MW: {
    name: "Malawi",
    iso2: "MW",
    code: "265"
  },
  MY: {
    name: "Malaysia",
    iso2: "MY",
    code: "60"
  },
  MV: {
    name: "Maldives",
    iso2: "MV",
    code: "960"
  },
  ML: {
    name: "Mali",
    iso2: "ML",
    code: "223"
  },
  MT: {
    name: "Malta",
    iso2: "MT",
    code: "356"
  },
  MH: {
    name: "Marshall Islands",
    iso2: "MH",
    code: "692"
  },
  MQ: {
    name: "Martinique",
    iso2: "MQ",
    code: "596"
  },
  MR: {
    name: "Mauritania",
    iso2: "MR",
    code: "222"
  },
  MU: {
    name: "Mauritius",
    iso2: "MU",
    code: "230"
  },
  YT: {
    name: "Mayotte",
    iso2: "YT",
    code: "262"
  },
  MX: {
    name: "Mexico",
    iso2: "MX",
    code: "52"
  },
  FM: {
    name: "Micronesia, Federated States Of",
    iso2: "FM",
    code: "691"
  },
  MD: {
    name: "Moldova",
    iso2: "MD",
    code: "373"
  },
  MC: {
    name: "Monaco",
    iso2: "MC",
    code: "377"
  },
  MN: {
    name: "Mongolia",
    iso2: "MN",
    code: "976"
  },
  ME: {
    name: "Montenegro",
    iso2: "ME",
    code: "382"
  },
  MS: {
    name: "Montserrat",
    iso2: "MS",
    code: "1 664"
  },
  MA: {
    name: "Morocco",
    iso2: "MA",
    code: "212"
  },
  MZ: {
    name: "Mozambique",
    iso2: "MZ",
    code: "258"
  },
  MM: {
    name: "Myanmar",
    iso2: "MM",
    code: "95"
  },
  NA: {
    name: "Namibia",
    iso2: "NA",
    code: "264"
  },
  NR: {
    name: "Nauru",
    iso2: "NR",
    code: "674"
  },
  NP: {
    name: "Nepal",
    iso2: "NP",
    code: "977"
  },
  NL: {
    name: "Netherlands",
    iso2: "NL",
    code: "31"
  },
  NC: {
    name: "New Caledonia",
    iso2: "NC",
    code: "687"
  },
  NZ: {
    name: "New Zealand",
    iso2: "NZ",
    code: "64"
  },
  NI: {
    name: "Nicaragua",
    iso2: "NI",
    code: "505"
  },
  NE: {
    name: "Niger",
    iso2: "NE",
    code: "227"
  },
  NG: {
    name: "Nigeria",
    iso2: "NG",
    code: "234"
  },
  NU: {
    name: "Niue",
    iso2: "NU",
    code: "683"
  },
  NF: {
    name: "Norfolk Island",
    iso2: "NF",
    code: "672"
  },
  MP: {
    name: "Northern Mariana Islands",
    iso2: "MP",
    code: "1 670"
  },
  NO: {
    name: "Norway",
    iso2: "NO",
    code: "47"
  },
  OM: {
    name: "Oman",
    iso2: "OM",
    code: "968"
  },
  PK: {
    name: "Pakistan",
    iso2: "PK",
    code: "92"
  },
  PW: {
    name: "Palau",
    iso2: "PW",
    code: "680"
  },
  PS: {
    name: "Palestinian Territory, Occupied",
    iso2: "PS",
    code: "970"
  },
  PA: {
    name: "Panama",
    iso2: "PA",
    code: "507"
  },
  PG: {
    name: "Papua New Guinea",
    iso2: "PG",
    code: "675"
  },
  PY: {
    name: "Paraguay",
    iso2: "PY",
    code: "595"
  },
  PE: {
    name: "Peru",
    iso2: "PE",
    code: "51"
  },
  PH: {
    name: "Philippines",
    iso2: "PH",
    code: "63"
  },
  PN: {
    name: "Pitcairn",
    iso2: "PN",
    code: ""
  },
  PL: {
    name: "Poland",
    iso2: "PL",
    code: "48"
  },
  PT: {
    name: "Portugal",
    iso2: "PT",
    code: "351"
  },
  PR: {
    name: "Puerto Rico",
    iso2: "PR",
    code: "1 787"
  },
  QA: {
    name: "Qatar",
    iso2: "QA",
    code: "974"
  },
  CG: {
    name: "Republic Of Congo",
    iso2: "CG",
    code: "242"
  },
  RE: {
    name: "Reunion",
    iso2: "RE",
    code: "262"
  },
  RO: {
    name: "Romania",
    iso2: "RO",
    code: "40"
  },
  RU: {
    name: "Russian Federation",
    iso2: "RU",
    code: "7"
  },
  RW: {
    name: "Rwanda",
    iso2: "RW",
    code: "250"
  },
  BL: {
    name: "Saint Barthélemy",
    iso2: "BL",
    code: "590"
  },
  SH: {
    name: "Saint Helena, Ascension And Tristan Da Cunha",
    iso2: "SH",
    code: "290"
  },
  KN: {
    name: "Saint Kitts And Nevis",
    iso2: "KN",
    code: "1 869"
  },
  LC: {
    name: "Saint Lucia",
    iso2: "LC",
    code: "1 758"
  },
  MF: {
    name: "Saint Martin",
    iso2: "MF",
    code: "590"
  },
  PM: {
    name: "Saint Pierre And Miquelon",
    iso2: "PM",
    code: "508"
  },
  VC: {
    name: "Saint Vincent And The Grenadines",
    iso2: "VC",
    code: "1 784"
  },
  WS: {
    name: "Samoa",
    iso2: "WS",
    code: "685"
  },
  SM: {
    name: "San Marino",
    iso2: "SM",
    code: "378"
  },
  ST: {
    name: "Sao Tome And Principe",
    iso2: "ST",
    code: "239"
  },
  SA: {
    name: "Saudi Arabia",
    iso2: "SA",
    code: "966"
  },
  SN: {
    name: "Senegal",
    iso2: "SN",
    code: "221"
  },
  RS: {
    name: "Serbia",
    iso2: "RS",
    code: "381"
  },
  SC: {
    name: "Seychelles",
    iso2: "SC",
    code: "248"
  },
  SL: {
    name: "Sierra Leone",
    iso2: "SL",
    code: "232"
  },
  SG: {
    name: "Singapore",
    iso2: "SG",
    code: "65"
  },
  SX: {
    name: "Sint Maarten",
    iso2: "SX",
    code: "1 721"
  },
  SK: {
    name: "Slovakia",
    iso2: "SK",
    code: "421"
  },
  SI: {
    name: "Slovenia",
    iso2: "SI",
    code: "386"
  },
  SB: {
    name: "Solomon Islands",
    iso2: "SB",
    code: "677"
  },
  SO: {
    name: "Somalia",
    iso2: "SO",
    code: "252"
  },
  ZA: {
    name: "South Africa",
    iso2: "ZA",
    code: "27"
  },
  GS: {
    name: "South Georgia And The South Sandwich Islands",
    iso2: "GS",
    code: ""
  },
  ES: {
    name: "Spain",
    iso2: "ES",
    code: "34"
  },
  LK: {
    name: "Sri Lanka",
    iso2: "LK",
    code: "94"
  },
  SD: {
    name: "Sudan",
    iso2: "SD",
    code: "249"
  },
  SR: {
    name: "Suriname",
    iso2: "SR",
    code: "597"
  },
  SJ: {
    name: "Svalbard And Jan Mayen",
    iso2: "SJ",
    code: "47"
  },
  SZ: {
    name: "Swaziland",
    iso2: "SZ",
    code: "268"
  },
  SE: {
    name: "Sweden",
    iso2: "SE",
    code: "46"
  },
  CH: {
    name: "Switzerland",
    iso2: "CH",
    code: "41"
  },
  SY: {
    name: "Syrian Arab Republic",
    iso2: "SY",
    code: "963"
  },
  TW: {
    name: "Taiwan, Province Of China",
    iso2: "TW",
    code: "886"
  },
  TJ: {
    name: "Tajikistan",
    iso2: "TJ",
    code: "992"
  },
  TZ: {
    name: "Tanzania, United Republic Of",
    iso2: "TZ",
    code: "255"
  },
  TH: {
    name: "Thailand",
    iso2: "TH",
    code: "66"
  },
  TG: {
    name: "Togo",
    iso2: "TG",
    code: "228"
  },
  TK: {
    name: "Tokelau",
    iso2: "TK",
    code: "690"
  },
  TO: {
    name: "Tonga",
    iso2: "TO",
    code: "676"
  },
  TT: {
    name: "Trinidad And Tobago",
    iso2: "TT",
    code: "1 868"
  },
  TA: {
    name: "Tristan de Cunha",
    iso2: "TA",
    code: "290"
  },
  TN: {
    name: "Tunisia",
    iso2: "TN",
    code: "216"
  },
  TR: {
    name: "Turkey",
    iso2: "TR",
    code: "90"
  },
  TM: {
    name: "Turkmenistan",
    iso2: "TM",
    code: "993"
  },
  TC: {
    name: "Turks And Caicos Islands",
    iso2: "TC",
    code: "1 649"
  },
  TV: {
    name: "Tuvalu",
    iso2: "TV",
    code: "688"
  },
  SU: {
    name: "USSR",
    iso2: "SU",
    code: ""
  },
  UG: {
    name: "Uganda",
    iso2: "UG",
    code: "256"
  },
  UA: {
    name: "Ukraine",
    iso2: "UA",
    code: "380"
  },
  AE: {
    name: "United Arab Emirates",
    iso2: "AE",
    code: "971"
  },
  GB: {
    name: "United Kingdom",
    iso2: "GB",
    code: "1 473"
  },
  UK: {
    name: "United Kingdom",
    iso2: "UK",
    code: ""
  },
  US: {
    name: "United States",
    iso2: "US",
    code: "1"
  },
  UM: {
    name: "United States Minor Outlying Islands",
    iso2: "UM",
    code: ""
  },
  UY: {
    name: "Uruguay",
    iso2: "UY",
    code: "598"
  },
  UZ: {
    name: "Uzbekistan",
    iso2: "UZ",
    code: "998"
  },
  VU: {
    name: "Vanuatu",
    iso2: "VU",
    code: "678"
  },
  VA: {
    name: "Vatican City State",
    iso2: "VA",
    code: "379"
  },
  VE: {
    name: "Venezuela, Bolivarian Republic Of",
    iso2: "VE",
    code: "58"
  },
  VN: {
    name: "Viet Nam",
    iso2: "VN",
    code: "84"
  },
  VG: {
    name: "Virgin Islands (British)",
    iso2: "VG",
    code: "1 284"
  },
  VI: {
    name: "Virgin Islands (US)",
    iso2: "VI",
    code: "1 340"
  },
  WF: {
    name: "Wallis And Futuna",
    iso2: "WF",
    code: "681"
  },
  EH: {
    name: "Western Sahara",
    iso2: "EH",
    code: "212"
  },
  YE: {
    name: "Yemen",
    iso2: "YE",
    code: "967"
  },
  ZM: {
    name: "Zambia",
    iso2: "ZM",
    code: "260"
  },
  ZW: {
    name: "Zimbabwe",
    iso2: "ZW",
    code: "263"
  }
};

export const stateArr = [
  "AK",
  "AL",
  "AR",
  "AS",
  "AZ",
  "CA",
  "CO",
  "CT",
  "CZ",
  "DC",
  "DE",
  "FL",
  "GA",
  "GU",
  "HI",
  "IA",
  "ID",
  "IL",
  "IN",
  "KS",
  "KY",
  "LA",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MP",
  "MS",
  "MT",
  "NC",
  "ND",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VA",
  "VI",
  "VT",
  "WA",
  "WI",
  "WV",
  "WY"
];

export const initialCart = {
  items: [],
  subTotal: 0,
  unSubscribeProductAmount: 0,
  shippingCharge: 0,
  shippingType: "standard",
  taxPersent: 0,
  taxCountry: null,
  totalWeight: 0,
  totalVolume: 0,
  taxCouponCode: "",
  taxCouponDiscount: 0,
  setFav: 0,
  hasNulled: false
};

export const accountTypeOpt = [
  {
    label: "Checking",
    value: "checking"
  },
  {
    label: "Savings",
    value: "savings"
  },
  {
    label: "Business Checking",
    value: "businessChecking"
  }
];
export const encodeUrlFn = url => url.replace(/-/g, "_").replace(/ /g, "-");

export const getRandomFromArr = arr => {
  const length = arr.length;
  const r = Math.floor(Math.random() * length);
  return arr[r];
};

export const referralPresent = 25;

export const enableCountry = ["US", "USA", "United States"];

export const invoiceUrl = process.env.REACT_APP_INVOICE_URL || "";
  // "https://admin.cbdbene.com/var/www/cbdbene_3rde/cbdbene/public/invoices/";
