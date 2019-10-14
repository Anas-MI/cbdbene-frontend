import _ from "lodash"
import {
  expireMonthInvalid,
  expireYearInvalid,
  cardNumberInvalid,
  cardDetailsNotMAtch,
  shippingExtraRate,
  defaultOrderStatus,
  defaultStatusInOrder,
  shippingStaticRate
} from "../../constantMessage";
import { referralPresent } from "../../components";

import { combineLoop } from "box-dimension-calculator";
// import { variablePriceSet } from "./cartHealpers";

export default class BasicFunction {
  dateFun(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [month, day, year].join("/");
  }
  dateFun2(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [month, day, year].join("/");
  }
  dateTimeAmPm(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    const dateis = month + "/" + day + "/" + year + " ";
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return dateis + strTime;
  }
  dateTimeAmPmOld(date) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    const monthnameis = monthNames[month - 1];
    const dateis = monthnameis + " " + day + "," + year + " ";
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return dateis + strTime;
  }
  dateTimeInMonthName(date) {
    if (!date) return "-";

    const monthNames = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    const monthnameis = monthNames[month - 1];
    const dateis = monthnameis + " " + day + ", " + year + " ";
    //var hours = d.getHours();
    // var minutes = d.getMinutes();
    //  hours = hours % 12;
    //  hours = hours ? hours : 12; // the hour '0' should be '12'
    // minutes = minutes < 10 ? "0" + minutes : minutes;

    return dateis;
  }

  currancyAdd(number) {
    if (number >= 0) {
      return "$" + number;
    } else {
      return "-$" + Math.abs(number);
    }
  }
  nombarFormat(nbr) {
    if (nbr === 0 && nbr === "") {
      return "0.00";
    } else {
      if (nbr) {
        var nr = nbr.toFixed(2);
        nr = nr.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(nr)) nr = nr.replace(pattern, "$1,$2");
        return nr;
      } else {
        return 0.0;
      }
    }
  }
  currancyAddWithNumber(numberX) {
    const number = parseFloat(numberX);
    const withoutUsd = this.currencyWithoutUsd(number);
    // return `${withoutUsd} USD`;
    return `${withoutUsd}`;
  }

  currencyWithoutUsd(numberX) {
    if (numberX) {
      let number = parseFloat(numberX);
      number = number.toFixed(2);
      var pattern = /(-?\d+)(\d{3})/;
      if (number >= 0) {
        number = number.toString();
        while (pattern.test(number)) number = number.replace(pattern, "$1,$2");
        return "$" + number;
      } else {
        var num = Math.abs(number);
        num = num.toFixed(2);
        num = num.toString();

        while (pattern.test(num)) num = num.replace(pattern, "$1,$2");
        return "-$" + num;
      }
    } else {
      return "$0.00";
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  sliceToNumber(string = 0, digit = 0) {
    return string.slice(0, digit);
  }

  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    // var months = [
    //   "Jan",
    //   "Feb",
    //   "Mar",
    //   "Apr",
    //   "May",
    //   "Jun",
    //   "Jul",
    //   "Aug",
    //   "Sep",
    //   "Oct",
    //   "Nov",
    //   "Dec"
    // ];
    // var year = a.getFullYear();
    // var month = months[a.getMonth()];
    // var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    // var sec = a.getSeconds();
    if (min < 10) {
      min = "0" + min;
    }
    // var ampm = "AM";
    var timeis = "";
    if (hour <= 12) {
      timeis = hour + ":" + min + "AM";
    } else {
      hour = parseFloat(hour) - 12;
      timeis = hour + ":" + min + "PM";
    }
    //   var res = hour + ":" + min;
    return timeis;
  }
  currentDate() {
    var d = new Date();
    var year = parseInt(d.getYear()) - 100;
    var month = d.getMonth() + 1;
    return "20" + year + "/" + month + "/" + d.getDate();
  }
  currentDateYesterday() {
    var d = new Date();
    var year = parseInt(d.getYear()) - 100;
    var month = d.getMonth() + 1;
    var yesterday = new Date(d.getTime());
    yesterday.setDate(d.getDate() - 1);
    var date = yesterday.getDate();
    return "20" + year + "/" + month + "/" + date;
  }
  currentDateBeforeDay(beforeDay) {
    var d = new Date();

    var yesterday = new Date(d.getTime());
    yesterday.setDate(d.getDate() - parseInt(beforeDay));
    var date = yesterday.getDate();
    var year = parseInt(yesterday.getYear()) - 100;
    var month = yesterday.getMonth() + 1;

    return "20" + year + "/" + month + "/" + date;
  }
  currentDateBeforeMonth(beforeMonth) {
    var d = new Date();
    d.setMonth(d.getMonth() - parseInt(beforeMonth));
    var month = d.getMonth() + parseInt(1);
    var year = parseInt(d.getYear()) - 100;
    return "20" + year + "/" + month + "/" + d.getDate();
  }
  currentDateBeforeYear(beforeYear) {
    var d = new Date();
    var month = d.getMonth() + parseInt(1);
    var year = parseInt(d.getYear()) - 100;
    year = year - parseInt(beforeYear);
    return "20" + year + "/" + month + "/" + d.getDate();
  }

  graphColorPostion(data) {
    if (data >= 0) {
      return "#1fa764";
    } else {
      return "#ed5454";
    }
  }
  graphColorFillPostion(data) {
    if (data >= 0) {
      return "#abe5c1";
    } else {
      return "#ffa1a9";
    }
  }

  stringToArray(str) {
    var res = str.split(",");
    var newArray = [];
    res.forEach(character => {
      if (character === character.toUpperCase()) {
        if (character.length <= 4) {
          newArray.push(character);
        }
      }
    });
    return newArray.slice(0, 10);
  }

  checkIsUpparCashOrNot(character) {
    if (character === character.toUpperCase()) {
      if (character.length <= 4) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  stringCheckResponseInColor(str, spn) {
    var innerHTML = str;
    spn = spn.toUpperCase();
    var index = innerHTML.indexOf(spn);
    if (index >= 0) {
      innerHTML =
        innerHTML.substring(0, index) +
        "<span className='highlight'>" +
        innerHTML.substring(index, index + spn.length) +
        "</span>" +
        innerHTML.substring(index + spn.length);

      // return 'ram';
    }

    return innerHTML;
  }

  subStrStartEnd(str, starting, ending) {
    if (str) {
      return str.substr(starting, ending);
    } else {
      return str;
    }
  }

  bodyColor() {
    var currentUrl = window.location.href;
    var ar = currentUrl.split("/");

    if (ar[3] === "stocks") {
      return "black";
    } else {
      return "";
    }
  }

  getParchantage(parValue, totalvalue) {
    return (parseFloat(parValue) * parseFloat(totalvalue)) / 100;
  }
  getUnknownParchantage(parValue, totalvalue) {
    return (parseFloat(parValue) / totalvalue) * 100;
  }

  getMinMaxValue(ar) {
    /*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
    if (ar.producttype === "variable") {
      const arr = [];
      ar.variation.map(key => {
        arr.push(key.sale_price);
        return null;
      });
      Array.prototype.max = function() {
        return Math.max.apply(null, this);
      };

      Array.prototype.min = function() {
        return Math.min.apply(null, this);
      };
      if (arr.length > 1) {
        if (arr.min() === arr.max()) {
          const returnString = "From $" + this.nombarFormat(arr.min()) ;
          return returnString;
        }
        const returnString =
          "From $" +
          this.nombarFormat(arr.min()) +
          " - $" +
          this.nombarFormat(arr.max());
        return returnString;
      } else {
        const returnString = "From $" + this.nombarFormat(arr.min());
        return returnString;
      }
    }
  }
  getMinMaxValue2(ar) {
    /*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
    if (ar.producttype === "variable") {
      const arr = [];
      ar.variation.map(key => {
        arr.push(key.sale_price);
        return null;
      });
      Array.prototype.max = function() {
        return Math.max.apply(null, this);
      };

      Array.prototype.min = function() {
        return Math.min.apply(null, this);
      };
      if (arr.length > 1) {
        if (arr.min() === arr.max()) {
          const returnString = "$" + this.nombarFormat(arr.min());
          return returnString;
        }
        const returnString =
          "$" +
          this.nombarFormat(arr.min()) +
          " - $" +
          this.nombarFormat(arr.max());
        return returnString;
      } else {
        const returnString = "$" + this.nombarFormat(arr.min());
        return returnString;
      }
    }
  }
  getMinMaxValueWithVariation(ar) {
    if (ar.producttype === "variable") {
      const arr = [];
      ar.variation.map(key => {
        arr.push(key.sale_price);
        return null;
      });
      Array.prototype.max = function() {
        return Math.max.apply(null, this);
      };

      Array.prototype.min = function() {
        return Math.min.apply(null, this);
      };
      if (arr.length > 1) {
        const returnString =
          "From $" +
          this.nombarFormat(arr.min()) +
          " - $" +
          this.nombarFormat(arr.max());
        return returnString;
      } else {
        const returnString = "From $" + this.nombarFormat(arr.min());
        return returnString;
      }
    } else {
      if (ar.dsaleprice) {
        const returnString =
          "From $" + this.nombarFormat(ar.dsaleprice) ;
        return returnString;
      } else {
        const returnString =
          "From $" + this.nombarFormat(ar.dregularprice) ;
        return returnString;
      }
    }
  }

  isLoaded(obj) {
    return Object.values(obj).every(el => el);
  }

  removeParams(url, sParam) {
    url = url.split("?")[0] + "?";
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");
      if (sParameterName[0] !== sParam) {
        url = url + sParameterName[0] + "=" + sParameterName[1] + "&";
      }
    }
    return url.substring(0, url.length - 1);
  }

  returnReferringUrl(url) {
    if (!url) return "Direct traffic";
    if (url.trim() === "") return "Direct traffic";
    return url;
  }
  getDialCode(countryCodeList, countryCode) {
    var returnCuntryCode = "";
    countryCodeList.forEach(element => {
      if (element.code === countryCode) {
        returnCuntryCode = element.dial_code;
      }
    });
    return returnCuntryCode;
  }
  showExportMsg(shippingType, isSame, billingAddress, shippingAddress) {
    if (shippingType !== "express") return false;

    if (isSame) {
      if (billingAddress)
        if (billingAddress.toLowerCase().trim() === "usa") {
          return false;
        }
    } else {
      if (shippingAddress)
        if (shippingAddress.toLowerCase().trim() === "usa") {
          return false;
        }
    }

    return true;
  }
  parseOrderProduct(item) {
    console.log({ item });
    const isCombo = item.combo ? true : false,
      comboId = item.combo ? item._id : null,
      productId = item.combo ? null : item.productid._id,
      productMeta = item.combo ? null : item._id,
      isSubscribed = item.subscribed ? true : false,
      subscriptionMeta = item.subscribed
        ? {
            duration: item.subscribedTime
          }
        : null,
      itemId = item._id,
      _id = item._id,
      qty = item.qty.value,
      title = item.combo ? item.title : item.productid.producttitle,
      unitPrice = item.saleprice ? item.saleprice : item.regularprice,
      subTotal = item.saleprice
        ? this.multiply(item.saleprice, item.qty.value)
        : this.multiply(item.regularprice, item.qty.value),
      attribute = this.getSelectedAttributes(item),
      height = item.shipping_height,
      width = item.shipping_width,
      length = item.shipping_length,
      volume = item.volume,
      weight = item.weight;

    const order = {
      isCombo,
      comboId,
      productId,
      productMeta,
      isSubscribed,
      subscriptionMeta,
      itemId,
      _id,
      qty,
      unitPrice,
      subTotal,
      attribute,
      width,
      length,
      height,
      title,
      volume,
      weight
    };
    this.removeEmpty(order);
    return order;
  }
  removeEmpty = obj => {
    Object.keys(obj).forEach(key => obj[key] === null && delete obj[key]);
  };
  getSelectedAttributes = item => {
    if (item.producttype === "variable")
      return item.attributes
        .map(el => ({
          [el.names]: item[el.names].value
        }))
        .filter(el => el)
        .reduce(
          (a, b) => ({
            ...a,
            ...b
          }),
          {}
        );
    return null;
  };
  multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
  }
  generateOrderNew(
    stateObj,
    paymentResponse = "",
    referralId,
    cart,
    user,
    confirmShipRes
  ) {
    console.log({ user });
    const { service, ...confirmRest } = confirmShipRes;
    const { paymentMethod } = stateObj;
    const {
      items,
      shippingCharge,
      subTotal,
      totalWeight,
      totalVolume,
      taxValue,
      taxPersent,
      taxCouponDiscount,
      taxCouponCode
    } = cart;

    const orderProducts = items.map(el => this.parseOrderProduct(el));
    const {
      height: totalHeight,
      length: totalLength,
      width: totalWidth
    } = this.getHeightWeight(orderProducts);
    const order = {
      totalVolume,
      totalWeight,
      shippingMethod: service,
      products: orderProducts,
      countryTax: taxPersent * 100,
      taxAmount:
        taxValue ||
        parseFloat(cart.subTotal || 0) * parseFloat(taxPersent || 0) ||
        0,
      shippingCharge,
      userDetails: this.getUserDetails(stateObj).user,
      orderStatus: defaultOrderStatus,
      paymentMethod: paymentMethod === "stripe" ? "Authorize" : paymentMethod,
      status: defaultStatusInOrder,
      wholeSubtotal: parseFloat(subTotal.toFixed(2)),
      wasReferred: referralId ? true : false,
      referral: referralId ? referralId : null,
      isCoupon: taxCouponCode ? true : false,
      couponId: taxCouponCode,
      couponDisc: taxCouponCode ? taxCouponDiscount : null,
      grandTotal: this.getGrandTotal(
        subTotal,
        taxPersent,
        shippingCharge,
        taxCouponDiscount
      ),
      isGuest: user._id ? false : true,
      userId: user._id ? user._id : null,
      userMetaId: user.userMetaId ? user.userMetaId : null,
      totalHeight,
      totalWidth,
      totalLength,
      refPercentage: referralPresent,
      ...confirmRest
    };
    this.removeEmpty(order);
    return order;
  }
  getDiscount(discount, subTotal) {
    return (discount * subTotal) / 100 || 0;
  }
  getGrandTotal(subTotal, taxPresent, shippingCharge, discount) {
    const amountWithTax = subTotal + taxPresent * subTotal + shippingCharge;
    const discountAmount = this.getDiscount(discount, subTotal);
    const total =
      parseFloat(amountWithTax || 0) - parseFloat(discountAmount || 0);
    return parseFloat(total.toFixed(2));
  }
  getHeightWeight(items) {
    console.log({ items });
    const height = items.map(el => el.height * parseFloat(el.qty));
    const width = items.map(el => el.width * parseFloat(el.qty));
    const length = items.map(el => el.length * parseFloat(el.qty));
    console.log({
      height: height.reduce((a, b) => a + b, 0),
      width,
      length
    });
    const shape = {
      height: height.reduce((a, b) => a + b, 0),
      width: width.reduce((a, b) => a + b, 0),
      length: length.reduce((a, b) => a + b, 0)
    };
    return shape;
  }
  generateOrder(
    stateObj,
    paymentResponse = "",
    referrer_url_id,
    cart,
    user,
    confirmShipRes
  ) {
    console.log({
      confirmShipRes
    });
    const { service, ...confirmRest } = confirmShipRes;
    var transactionId = "000";
    const payType = stateObj.paymentMethod;
    if (stateObj.paymentMethod === "stripe" && paymentResponse) {
      transactionId = paymentResponse;
    }
    if (
      stateObj.paymentMethod === "paypal" &&
      paymentResponse &&
      paymentResponse.paymentID
    ) {
      transactionId = paymentResponse.paymentID;
    }
    // return false;
    const {
      items,
      shippingCharge,
      subTotal,
      totalWeight,
      totalVolume,
      taxValue,
      taxPersent,
      taxCouponDiscount,
      taxCouponCode
    } = cart;
    const {
      billing_first_name,
      billing_last_name,
      billing_email_name,
      billing_phone_name,
      billing_address_name_01,
      billing_address_name_02,
      billing_address_town,
      shipping_first_name,
      shipping_last_name,

      shipping_address_name_01,
      shipping_address_name_02,
      shipping_address_town,
      selectedShippingCity,
      selectedCity,
      selectedShippingCountry,
      selectedCountry,
      shipping_zip_code,
      billing_zip_code,
      sameShipping
    } = stateObj;

    let order = {};
    let country = "";
    if (selectedShippingCountry) {
      country = selectedShippingCountry;
    } else if (selectedCountry) {
      country = selectedCountry || "";
    }
    let state = "";
    if (selectedShippingCity) {
      state = selectedShippingCity;
    } else if (selectedCity) {
      state = selectedCity || "";
    }
    let zipcode = "";
    if (shipping_zip_code) {
      zipcode = shipping_zip_code;
    } else if (billing_zip_code) {
      zipcode = billing_zip_code;
    }
    order.orderproduct = items.map(el => {
      // console.log({el})
      // this.parseOrderProduct(el);
      // console.log({
      //   checkOrder: this.parseOrderProduct(el)
      // })
      // return this.parseOrderProduct(el)
      let returnItem = {
        productmetaid: el._id,
        proucttitle: el.combo ? el.title : el.productid.producttitle,
        quantity: el.qty.value,
        singleprice: el.saleprice ? el.saleprice : el.regularprice,
        subtotal: 0,
        orderdate: Date(),
        country,
        isguest: true || false,
        subscribed: el.subscribed,
        subscribedDiscountPersent: el.subscribedDiscountPersent
      };

      let subtotal =
        parseInt(returnItem.quantity || 1) *
        parseInt(returnItem.singleprice || 1);
      let attribute = {};
      if (el.producttype === "variable") {
        el.attributes.map((item, index) => {
          attribute = { ...attribute, [item.names]: el[item.names].value };
          return null;
        });
      }

      returnItem = { ...returnItem, subtotal, attribute };
      return { ...returnItem };
    });

    let shippingAddress = `${shipping_first_name} ${shipping_last_name}, ${shipping_address_name_01} ${shipping_address_name_02} ${shipping_address_town} `;
    let billingAddress = `${billing_first_name} ${billing_last_name}, ${billing_address_name_01} ${billing_address_name_02} ${billing_address_town} `;

    const TaxgrandTotalWithTax =
      subTotal + taxPersent * subTotal + shippingCharge;
    const discount = (taxCouponDiscount * subTotal) / 100;
    if (user._id) {
      const userid = user._id;
      order.userid = userid;
    }

    order.grandtotal =
      parseFloat(TaxgrandTotalWithTax || 0) - parseFloat(discount || 0);
    order.coupondisc = taxCouponDiscount;
    order.couponid = taxCouponCode;
    order.country = country;
    order.offerprice = 100;
    order.shippingmethod = service || "Express shipping" || "Normal shipping";
    order.wholesubtotal = subTotal;
    order.shippingcharge = shippingCharge || 0;
    order.paymentmethod = payType;
    order.ordernote = "Make it quick";
    order.status = "in process";
    order.paymentstatus = "Done";
    order.transactionid = transactionId;
    order.country_tax = taxPersent * 100;
    order.totalweight = totalWeight;
    order.totalvolume = totalVolume;
    order.taxamount = taxValue;
    order.userdetails = {
      country,
      firstname: billing_first_name,
      lastname: billing_last_name,
      email: billing_email_name,
      shippingaddress: sameShipping ? billingAddress : shippingAddress,
      billingaddress: billingAddress,
      extraaddress: "jdjdjd",
      city: shipping_address_town
        ? shipping_address_town
        : billing_address_town,
      state,
      zipcode,
      phonenumber: billing_phone_name
    };
    order.orderstatus = "Not delivered";
    if (referrer_url_id) {
      order.wasreferred = true;
      order.referral = referrer_url_id;
    }
    console.log({ order, ...confirmRest });
    return { ...order, ...confirmRest };
  }
  getUserDetails(stateObj) {
    const {
      billing_first_name,
      billing_last_name,
      billing_email_name,
      billing_phone_name,
      billing_address_name_01,
      billing_address_name_02,
      billing_address_town,
      shipping_first_name,
      shipping_last_name,

      shipping_address_name_01,
      shipping_address_name_02,
      shipping_address_town,
      selectedShippingCity,
      selectedCity,
      selectedShippingCountry,
      selectedCountry,
      shipping_zip_code,
      billing_zip_code,
      sameShipping
    } = stateObj;

    const shippingAddress = `${shipping_first_name} ${shipping_last_name}, ${shipping_address_name_01} ${shipping_address_name_02} ${shipping_address_town} `;
    const billingAddress = `${billing_first_name} ${billing_last_name}, ${billing_address_name_01} ${billing_address_name_02} ${billing_address_town} `;

    const user = {
      firstname: billing_first_name,
      lastname: billing_last_name,
      email: billing_email_name,
      shippingaddress: sameShipping ? billingAddress : shippingAddress,
      billingaddress: billingAddress,
      phonenumber: billing_phone_name,
      country: this.getOneValid(selectedShippingCountry, selectedCountry),
      zipcode: this.getOneValid(shipping_zip_code, billing_zip_code),
      state: this.getOneValid(selectedShippingCity, selectedCity)
    };
    return {
      user,
      shippingAddress,
      billingAddress
    };
  }
  getOneValid(a, b) {
    if (a && a.trim()) return a;
    if (b && b.trim()) return b;

    return "";
  }
  calculatePrice = item => {
    const {
      saleprice,
      regularprice,
      subscribedDiscountPersent,
      qty: { value },
      subscribed
    } = item;
    if (subscribed) {
      if (saleprice) {
        const price =
          (parseFloat(saleprice) * parseFloat(value)) /
          parseFloat(subscribedDiscountPersent);
        return price;
      } else if (regularprice) {
        const price =
          (parseFloat(regularprice) * parseFloat(value)) /
          parseFloat(subscribedDiscountPersent);
        return price;
      }
      return 0;
    }
  };
  convertCardErrors = error => {
    switch (error) {
      case "Your card number is incorrect.":
        return cardNumberInvalid;

      case "Missing required param: card[exp_year].":
        return expireYearInvalid;

      case "Could not find payment information.":
        return cardDetailsNotMAtch;

      case "Your card's expiration year is invalid.":
        return expireYearInvalid;

      case "Your card's expiration month is invalid.":
        return expireMonthInvalid;

      default:
        return expireMonthInvalid;
    }
  };
  stripeCheckValidation = paymentDetail => {
    const { cvNumber, expDate, cardNumber } = paymentDetail;
    if (cvNumber && cvNumber.length <= 2) {
      return false;
    }
    if (expDate && expDate.length <= 4) {
      return false;
    }
    if (cardNumber && cardNumber.length <= 18) {
      return false;
    }

    return true;
  };
  checkProductInWishList(list = [], product_id) {
    var flag = false;
    if (list.length > 0) {
      list.forEach((itm, i) => {
        if (itm.productid === product_id) {
          flag = i;
        }
      });
    }
    return flag;
  }

  getSingleElementByMultipleObject(arrayData, f) {
    const result = arrayData.reduce(function(r, a) {
      r[a.carrier] = r[a.carrier] || [];
      r[a.carrier].push(a);
      return r;
    }, {});
    return result;
  }
  shippingStringRate(key) {
    if (key && key.est_delivery_days) {
      return " in " + key.est_delivery_days + " Days .";
    } else {
      return " in - Days .";
    }
  }
  cartHeightWidhtCalculation(item) {
    var height = 0;
    var width = 0;
    var length = 0;
    var weight = 0;
    if (item.length > 0) {
      item.forEach(itm => {
        height = height + itm.shipping_height;
        width = width + itm.shipping_width;
        length = length + itm.shipping_length;
        weight = weight + itm.weight;
      });
    }
    return {
      height,
      width,
      length,
      weight
    };
  }
  cartHeightWidhtCalculation2(itemA) {
    var height = 0;
    var width = 0;
    var length = 0;
    var weight = 0;
    function flatten(arr) {
      return arr.reduce(function(flat, toFlatten) {
        return flat.concat(
          Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
        );
      }, []);
    }
    const item = flatten(
      itemA.map(el => {
        const qty = el.qty ? (el.qty.value ? parseInt(el.qty.value) : 1) : 1;
        if (qty > 1) return new Array(qty).fill(el);

        return el;
      })
    );
    const getGreater = (a, b) => {
      if (a > b) return a;
      return b;
    };
    if (item.length > 0) {
      item.forEach(itm => {
        // height = getGreater(height, itm.shipping_height);
        // width = width + itm.shipping_width;
        // length = getGreater(length, itm.shipping_length);
        weight = weight + itm.weight;
      });
    }
    const itemsB = itemA.map(el => ({
      h: el.shipping_height,
      l: el.shipping_length,
      w: el.shipping_width,
      qty: el.qty.value
    }))
    const itemsC = [].concat.apply([], itemsB);
    const itemsD = combineLoop(itemsC)[0]

    return {
      height: itemsD.h,
      width: itemsD.w,
      length: itemsD.l,
      weight
    };
  }
  getShippingRates = rateArr => {
    if (rateArr.length > 0) {
      const filteredRates =  _.uniqBy(rateArr, function (e) {
        return e.service;
      });
      const smallSorted = filteredRates.sort((a, b) => parseFloat(a.rate || 0) - parseFloat(b.rate || 0))
      const Smallest = smallSorted[0];
      const Smallest1 = smallSorted[1];
      const Smallest2 = smallSorted[2];
      const PriorityRaw = filteredRates.find(el => el.service === "Priority");
      const ExpressRaw = filteredRates.find(el => el.service === "Express");

      // const standard =
      //   Smallest.service === "Priority" || Smallest.service === "Express"
      //     ? null
      //     : {
      //         ...Smallest,
      //         customName: "Standard",
      //         customRate: parseFloat(Smallest.rate) + shippingExtraRate
      //       };
      // const Priority = PriorityRaw
      //   ? {
      //       ...PriorityRaw,
      //       customName: "Priority",
      //       customRate: parseFloat(PriorityRaw.rate) + shippingExtraRate
      //     }
      //   : null;
      // const Express = ExpressRaw
      //   ? {
      //       ...ExpressRaw,
      //       customName: "Express",
      //       customRate: parseFloat(ExpressRaw.rate) + shippingExtraRate
      //     }
      //   : null;
      const standard = Smallest && {
                ...Smallest,
                customName: "Standard",
                customRate: parseFloat(Smallest.rate) + shippingExtraRate
              };
      const Priority = Smallest1 && {
                ...Smallest1,
                customName: "Priority",
                customRate: parseFloat(Smallest1.rate) + shippingExtraRate
              };
      const Express = Smallest2 && {
                ...Smallest2,
                customName: "Express",
                customRate: parseFloat(Smallest2.rate) + shippingExtraRate
              };
      return [standard, Priority, Express].filter(el => el);
    }
    return rateArr;
    // return [
    //   {
    //     carrier: "Carrier_Not_Found",
    //     created_at: new Date(),
    //     currency: "USD",
    //     mode: "test",
    //     object: "Rate",
    //     customName: "Standard",
    //     rate: shippingStaticRate,
    //     customRate: shippingStaticRate,
    //     retail_currency: "USD",
    //   }
    // ]

  };

  exportToJson(objectData, fileName = "export") {
    let filename = `${fileName}.json`;
    let contentType = "application/json;charset=utf-8;";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob(
        [decodeURIComponent(encodeURI(JSON.stringify(objectData)))],
        { type: contentType }
      );
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement("a");
      a.download = filename;
      a.href =
        "data:" +
        contentType +
        "," +
        encodeURIComponent(JSON.stringify(objectData));
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
  qtyList(qty = 10) {
    const quantity = parseFloat(qty) > 10 ? parseFloat(qty) : 10;
    const temp = new Array(quantity).fill("");
    const newarray = temp.map((el, index) => ({
      label: index + 1,
      value: index + 1
    }));
    return newarray;
  }
}
