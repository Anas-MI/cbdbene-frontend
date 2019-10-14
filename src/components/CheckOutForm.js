import React, { Component } from "react";
import { connect } from "react-redux";
import { countryCodeList } from "./allCountryCode";
import classNames from "classnames";
import debounce from "debounce";
import moment from "moment";

import validator from "validator";
import SelectMulti from "react-select";
import {
  regExReplace,
  imagePack,
  // stateArr,
  selectStyleSmall,
  accountTypeOpt,
  enableCountry
} from "./Constants";
import StripePayment from "./StripePayment";
// import CheckForm from "./CheckForm";
import Icon from "react-icons-kit";
import { phone } from "react-icons-kit/fa";
import { Lodar, CustomLink } from "./";
import "react-phone-input-2/dist/style.css";
import { AddressForm, CheckBox, Input, AddressRadio } from "./form";
import { fieldValidation } from "../services/extra/validations";

import {
  projectName,
  contactNumber,
  firstNameMissingErrMsg,
  lastNameMissingErrMsg,
  emailMissingErrMsg,
  emailNotValidErrMsg,
  phoneMissingErrMsg,
  phoneNotValidErrMsg,
  zipValidErrMsg,
  zipMissingErrMsg,
  someThingWrongTryAgain,
  invalidExpiryDate,
  orderPlacedSuccessfully,
  allFieldReq,
  subscribeFailMsg,
  someThingWrong,
  shippingFreeAfter,
  selectCarrierMsg,
  billingAddressMsg,
  sameShippingMsg,
  shippingAddressMsg,
  reviewOrderMsg,
  checkoutPageTitle,
  checkoutPageSubTitle,
  paymentMethodMsg,
  wrongCardDetails,
  accountNumberMissingMsg,
  accountNumberValidMsg,
  accountHolderMissingMsg,
  accountHolderNameValidMsg,
  // accountNumberConfirmMissingMsg,
  // accountNumberConfirmValidMsg,
  routingTypeValidMsg,
  routingTypeMissingMsg,
  // drivingLicenseMissingErr,
  // drivingLicenseValidMsg,
  orderPlacedModalTitle,
  wrongModalTitle,
  zipCodeInvalidShippingError
} from "../constantMessage";
import {
  setShippingCharge,
  setShippingType,
  setPaypalOrderDetails,
  clearCart,
  clearCartA,
  setOrderFlag,
  setExpressCheckout,
  setExpressPaypalCheckout,
  setGuest,
  getCards,
  addCardAuthorize,
  getAddress,
  addAddress,
  setTax
} from "../actions";
import { infoCircle } from "react-icons-kit/fa/";
import {
  ic_keyboard_arrow_down,
  ic_keyboard_arrow_up,
  ic_add,
  ic_clear,
} from "react-icons-kit/md/";
import "react-phone-number-input/style.css";
import {
  stripeTokanCreate,
  addStripePlan,
  addPlanTocutomer,
  addSubscribeToBackendApi,
  paypalApi,
  getSingleUserApi,
  getShipByAddress,
  placeOrderApiNew,
  stripePaymentApi,
  confirmShipmentApi,
  authorizeChargeApi,
  authorizeSubscriptionApi,
  authorizeProfileChargeApi,
  authorizeBankChargeApi,
  authorizeSubscriptionProfileApi,
  authorizeSubscriptionBankApi,
  getTaxValueApi
} from "../services/api";

import { Spinner, Collapse } from "reactstrap";

import CartItemsSmall from "./CartItemsSmall";
import { Modal } from "./modal";
import BasicFunction from "../services/extra/basicFunction";
// import { ic_add } from "react-icons-kit/md";
// import { ic_close } from "react-icons-kit/md";
import { makeCancelable } from "../services/makeCancelable";
import { getCountryCode } from "../services/extra";

const basicFunction = new BasicFunction();

class CheckOutForm extends Component {
  constructor(props) {
    super(props);
    this.handleSameShipping = this.handleSameShipping.bind(this);
    this.validateOnSubmit = this.validateOnSubmit.bind(this);
    this.generateOrder = this.generateOrder.bind(this);
    this.toggle = this.toggle.bind(this);
    this.modalDismiss = this.modalDismiss.bind(this);
    this.toggleAcc = this.toggleAcc.bind(this);
    this.toggleAcc2 = this.toggleAcc2.bind(this);
    this.paymentMethod = this.paymentMethod.bind(this);
    this.stripeReturnData = this.stripeReturnData.bind(this);
    this.stripePaymentCheck = this.stripePaymentCheck.bind(this);
    this.orderGenerateCode = this.orderGenerateCode.bind(this);
    this.addSubscriptionThenAddPlan = this.addSubscriptionThenAddPlan.bind(
      this
    );
    this.onChangeCarrier = this.onChangeCarrier.bind(this);
    this.SubscriptionCheckout = this.SubscriptionCheckout.bind(this);
    // this.handleShippingTypeChange = this.handleShippingTypeChange.bind(this);
    this.paypalPayment = this.paypalPayment.bind(this);
    this.paymentTokanThenPayment = this.paymentTokanThenPayment.bind(this);
    this.addPlantoSubscription = this.addPlantoSubscription.bind(this);

    this.expressCheckOutFormFill = this.expressCheckOutFormFill.bind(this);
    this.expressCheckOutFormFillPaypal = this.expressCheckOutFormFillPaypal.bind(
      this
    );
    this.shippingPriceGetMethod = debounce(
      this.shippingPriceGetMethod,
      500
    ).bind(this);
    this.shippingaddressautoFill = this.shippingaddressautoFill.bind(this);
    this.state = {
      selectedCountry: " ",
      selectedCountry_err: null,
      selectedCountry_errMsg: " ",
      selectedRegion: null,
      selectedCity: " ",
      selectedCity_err: null,
      selectedCity_errMsg: " ",
      selectedShippingRegion: null,
      selectedShippingCountry: " ",
      selectedShippingCountry_err: null,
      selectedShippingCountry_errMsg: " ",
      selectedShippingCity: " ",
      selectedShippingCity_err: null,
      selectedShippingCity_errMsg: " ",
      sameShipping: true,
      shipping_first_name: " ",
      shipping_first_name_err: null,
      shipping_first_name_errMsg: " ",
      shipping_last_name: " ",
      shipping_last_name_err: null,
      shipping_last_name_errMsg: "",
      shipping_email_name: "",
      shipping_email_name_err: null,
      shipping_email_name_errMsg: "",
      shipping_phone_name: "",
      shipping_phone_name_err: null,
      shipping_phone_name_errMsg: "",
      shipping_address_name_01: "",
      shipping_address_name_01_err: null,
      shipping_address_name_01_errMsg: "",
      shipping_address_name_02: "",
      shipping_address_name_02_err: null,
      shipping_address_name_02_errMsg: "",
      shipping_address_town: "",
      shipping_address_town_err: null,
      shipping_address_town_errMsg: "",
      billing_first_name: "",
      billing_first_name_err: null,
      billing_first_name_errMsg: "",
      billing_last_name: "",
      billing_last_name_err: null,
      billing_last_name_errMsg: "",
      billing_email_name: "",
      billing_email_name_err: null,
      billing_email_name_errMsg: "",
      billing_phone_name: "",
      billing_phone_name_err: null,
      billing_phone_name_errMsg: "",
      billing_address_name_01: "",
      billing_address_name_01_err: null,
      billing_address_name_01_errMsg: "",
      billing_address_name_02: "",
      billing_address_name_02_err: null,
      billing_address_name_02_errMsg: "",
      billing_address_town: "",
      billing_address_town_err: null,
      billing_address_town_errMsg: "",
      shipping_zip_code: "",
      shipping_zip_code_err: null,
      shipping_zip_code_errMsg: "",
      billing_zip_code: "",
      billing_zip_code_err: null,
      billing_zip_code_errMsg: "",
      paypalButtonShow: false,
      SpinnerToggle: false,
      stripePaymentData: {
        cvNumber: "",
        expDate: "",
        cardNumber: ""
      },
      paypalSuccessDetails: "",
      paypalShow: false,
      stripePaymentError: false,
      stripePaymentErrorResponse: "",
      // counter: 0,
      SubscriptionCheckout: false,
      modal: false,
      modalData: "",
      modalTitle: "",
      clearCart: false,
      collapse: false,
      collapse2: false,
      paymentMethod: "stripe",
      stripeReturncusId: "",
      stripeSubscriptPlanId: "",
      paymetnBtnDisable: false,
      expressCarddetails: null,
      expressCarddetailsFill: false,
      shippingChargesArr: {
        standard: 0,
        express: 20,
        priority: 30
      },
      shippingType: props.cart.shippingType || "standard",
      iframeurl: "",
      stripeSubscriptPlanSubscriptionId: [],
      formResetValue: {
        shipping_first_name: "",
        shipping_last_name: "",
        shipping_email_name: "",
        shipping_phone_name: "",
        shipping_address_name_01: "",
        shipping_address_name_02: "",
        shipping_address_town: "",
        shipping_zip_code: "",
        billing_first_name: "",
        billing_last_name: "",
        billing_email_name: "",
        billing_phone_name: "",
        billing_address_name_01: "",
        billing_address_name_02: "",
        billing_address_town: "",
        billing_zip_code: ""
      },
      addressData: {
        country: false,
        state: false,
        city: false,
        address: false,
        zip: false
      },
      addressData2: {
        country: false,
        state: false,
        city: false,
        address: false,
        zip: false
      },
      mehtodShippingMethodDisable: true,
      mehtodPaymentMethodDisable: true,
      methodReviewYourOrderDisable: true,
      shipinngBreakData: [],
      shippingCarrier: [],
      shippingRates: [],
      shippingAllData: [],
      shippingSendData: {},
      shippingErrMsg: null,
      confirmShipRes: null,
      isShippingLoading: false,
      countryUSAError: null,
      accountNumber: "",
      accountNumber_err: null,
      accountNumber_errMsg: "",
      accountNumberConfirm: "",
      accountNumberConfirm_err: null,
      accountNumberConfirm_errMsg: "",
      accName: "",
      accName_err: null,
      accName_errMsg: "",
      accName_err2: null,
      routingType: "",
      bankName: "",
      drivingLicense: "",
      drivingLicense_err: null,
      drivingLicense_errMsg: "",
      dlState: "",
      dlState_err: null,
      dlState_errMsg: "",
      isDefaultPayment: false,
      isPaymentProfile: false,
      accountType: accountTypeOpt[0],
      defaultPaymentProfile: {
        profileid: null,
        paymentid: null
      },
      checkingResponseError: null,
      isSaveCard: props.user && props.user._id ? true : false,
      openPaymentAccordion: null,
      saveAddress1: props.user && props.user._id ? true : false,
      saveAddress2: props.user && props.user._id ? true : false,
      openAddFrmBill: false,
      billAddShowLess: true,
      openAddFrmShip: false,
      shipAddShowLess: true,
    };

    this.validateAddressFields = this.validateAddressFields.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.billingaddressautoFill = this.billingaddressautoFill.bind(this);
  }

  componentDidMount() {
    const countryDialCode = basicFunction.getDialCode(
      countryCodeList,
      this.props.location.countryCode
    );
    this.setState({
      shipping_phone_name: countryDialCode,
      billing_phone_name: countryDialCode
    });
    const { user, getAddress } = this.props;
    if (user._id) getAddress(user._id);

    if (this.props.isExpressPaypalCheckout) {
      if (user._id) {
        this.setState({
          registration_id: user._id,
          expressCarddetailsFill: true
        });
        this.expressCheckOutFormFillPaypal(user._id);
        this.props.setExpressPaypalCheckout(false);
      }
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if (this.props.isExpressCheckout) {
      if (user._id) {
        this.setState({
          registration_id: user._id,
          expressCarddetailsFill: true
        });
        const { setShippingCharge } = this.props;
        setShippingCharge("", this.props.cart, this.props.user.userMetaId);

        this.props.getCards(user._id);
        this.expressCheckOutFormFill(user._id);
        this.props.setExpressCheckout(false);
      }
    } else {
      if (user._id) {
        this.props.getCards(user._id);
        this.expressCheckOutFormFill(user._id);
      }
    }
    if (user._id) {
      this.setState({
        paymetnBtnDisable: true
      });
    } else {
      this.setState({
        paymetnBtnDisable: true
      });
      this.props.cart.items.map(item => {
        if (item.subscribed) {
          this.setState({
            paymetnBtnDisable: false
          });
        }
        return null;
      });
    }
    var url_string = window.location.href;
    var url = new URL(url_string);
    var paymentId = url.searchParams.get("paymentId");
    if (paymentId) {
    }

    setTimeout(() => {
      this.getTaxPrice();

      setTimeout(() => {
        console.log({
          address_____: this.props.address.address
        })
      }, 5000);
    }, 300);
    // setInterval(() => this.setState({ counter: Date.now() }), 1000);
  }

  componentWillUnmount() {
    if (this.orderDismissTimeout) {
      clearTimeout(this.orderDismissTimeout);
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log({
      nextProps,
      props: this.props
    });
    if (nextProps.cart.items !== this.props.cart.items) {
      if (!this.validateOnDisable()) {
        this.shippingPriceGetMethod(nextProps);
      }
    }
    if (nextProps.address.address !== this.props.address.address) {
      const foundedAddress = this.props.address.address && this.props.address.address.find(el => el.isDefault)
      this.setState({
        billing_address_select: foundedAddress ? `billing_address_select${foundedAddress.id}` : ""
      })
    }
  }
  changeBillingAddressRadio = (e, id) => {
    if (id) {
      const foundedAddress = this.props.address.address && this.props.address.address.find(el => el.id === id)
      const addressData = {
        country:
          foundedAddress.country.value || foundedAddress.country,
        state: foundedAddress.state.value || foundedAddress.state,
        city: foundedAddress.city,
        other: foundedAddress.address,
        address: foundedAddress.address,
        zip: foundedAddress.zip
      }
      this.setState({
        billing_address_select: `billing_address_select${id}`,
        billing_first_name: foundedAddress.firstname,
        billing_last_name: foundedAddress.lastname,
        billing_email_name: foundedAddress.email,
        billing_phone_name: foundedAddress.phone,
        billing_address_name_01: foundedAddress.address,
        billing_address_town: foundedAddress.city,
        billing_zip_code: foundedAddress.zip,
        selectedCountry: foundedAddress.country,
        selectedCity: foundedAddress.state,
        addressData: {
          country:
            foundedAddress.country.value || foundedAddress.country,
          state: foundedAddress.state.value || foundedAddress.state,
          city: foundedAddress.city,
          other: foundedAddress.address,
          address: foundedAddress.address,
          zip: foundedAddress.zip
        },
        // mehtodShippingMethodDisable: false,
        // methodReviewYourOrderDisable: false,
        openAddFrmBill: false
      }, () => {
        console.log({
          addddddddd: this.state.addressData
        })
        this.billingaddressautoFill(addressData);
        this.validateOnDisable(true);
        this.shippingPriceGetMethod();
        // this.setState({
        //   mehtodShippingMethodDisable: false
        // });
      })
    }
  }
  changeShippingAddressRadio = (e, id) => {
    if (id) {
      const foundedAddress = this.props.address.address && this.props.address.address.find(el => el.id === id)
      const addressData2 = {
        country:
          foundedAddress.country.value || foundedAddress.country,
        state: foundedAddress.state.value || foundedAddress.state,
        city: foundedAddress.city,
        other: foundedAddress.address,
        address: foundedAddress.address,
        zip: foundedAddress.zip
      }
      this.setState({
        shipping_address_select: `shipping_address_select${id}`,
        shipping_first_name: foundedAddress.firstname,
        shipping_last_name: foundedAddress.lastname,
        shipping_email_name: foundedAddress.email,
        shipping_phone_name: foundedAddress.phone,
        shipping_address_name_01: foundedAddress.address,
        shipping_address_town: foundedAddress.city,
        shipping_zip_code: foundedAddress.zip,
        selectedShippingCountry: foundedAddress.country,
        selectedShippingCity: foundedAddress.state,
        addressData2: {
          country:
            foundedAddress.country.value || foundedAddress.country,
          state: foundedAddress.state.value || foundedAddress.state,
          city: foundedAddress.city,
          other: foundedAddress.address,
          address: foundedAddress.address,
          zip: foundedAddress.zip
        },
        // mehtodShippingMethodDisable: false,
        // methodReviewYourOrderDisable: false,
        openAddFrmShip: false
      }, () => {
        console.log({
          addddddddd: this.state.addressData2
        })
        this.shippingaddressautoFill(addressData2);
        this.validateOnDisable(true);
        this.shippingPriceGetMethod();
        // this.setState({
        //   mehtodShippingMethodDisable: false
        // });
      })
    }
  }
  changeBillAddCollapse = () => {
    this.setState(prevState => {
      // if(prevState.billing_address_select)
      if (!prevState.openAddFrmBill) {
        return {
          billing_address_select: "",
          openAddFrmBill: !prevState.openAddFrmBill
        }
      }
      return {
        openAddFrmBill: !prevState.openAddFrmBill
      }
    })
  }
  changeShipAddCollapse = () => {
    this.setState(prevState => {
      // if(prevState.billing_address_select)
      if (!prevState.openAddFrmShip) {
        return {
          shipping_address_select: "",
          openAddFrmShip: !prevState.openAddFrmShip
        }
      }
      return {
        openAddFrmShip: !prevState.openAddFrmShip
      }
    })
  }
  getTaxPrice = (countryCode = this.props.location.countryCode) => {
    // this.cancelTax = makeCancelable(
    //   getTaxValueApi(countryCode).then(res => res.json()),
    //   resJson => {
    //     const { cart } = this.props;
    //     this.setState(
    //       {
    //         taxPersent: resJson.rate,
    //         taxValue: resJson.rate * cart.subTotal
    //       },
    //       () => {
    //         this.props.setTax(
    //           {
    //             taxPersent: resJson.rate,
    //             taxCountry: this.state.selectedShipping
    //           },
    //           this.props.cart,
    //           this.props.user.userMetaId
    //         );
    //       }
    //     );
    //   },
    //   err => console.log({ err })
    // );
    getTaxValueApi(countryCode)
      .then(res => res.json())
      .then(resJson => {
        const { cart } = this.props;
        this.setState(
          {
            taxPersent: resJson.rate,
            taxValue: resJson.rate * cart.subTotal
          },
          () => {
            this.props.setTax(
              {
                taxPersent: resJson.rate,
                taxCountry: this.state.selectedShipping
              },
              this.props.cart,
              this.props.user && this.props.user.userMetaId
            );
          }
        );
      });
  };
  onPhoneChange(value, stateName) {
    this.setState(
      {
        [stateName]: value
      },
      () => {
        setTimeout(() => {
          this.validateAddressFields(stateName, "phone");
          if (!this.validateOnDisable()) {
            this.shippingPriceGetMethod();
            this.setState({
              mehtodShippingMethodDisable: false
            });
          } else {
            const { setShippingCharge } = this.props;
            setShippingCharge("", this.props.cart, this.props.user.userMetaId);
            this.setState({
              mehtodShippingMethodDisable: true,
              mehtodPaymentMethodDisable: true
            });
          }
        }, 100);
      }
    );
  }

  onAddressChange(e) {
    const { name, value, attributes } = e.target;

    const type = attributes["data-validate"];
    const pattern = attributes["data-pattern"];
    this.setState(
      {
        [name]: pattern
          ? value.replace(regExReplace[pattern.value], "")
          : value.trim()
      },
      () => {
        if (type) if (type.value) this.validateAddressFields(name, type.value);

        setTimeout(() => {
          if (!this.validateOnDisable()) {
            this.shippingPriceGetMethod();
            this.setState({
              mehtodShippingMethodDisable: false
            });
          } else {
            const { setShippingCharge } = this.props;
            setShippingCharge("", this.props.cart, this.props.user.userMetaId);
            this.setState({
              mehtodShippingMethodDisable: true,
              mehtodPaymentMethodDisable: true
            });
          }
        }, 200);
      }
    );
  }
  changeAccountType = accountType => {
    this.setState({
      accountType
    });
  };
  shippingPriceGetMethod(props = this.props) {
    const {
      billing_address_name_01,
      selectedCountry,
      selectedCity,
      billing_address_town,
      billing_first_name,
      billing_last_name,
      billing_zip_code,
      billing_phone_name,
      sameShipping,
      shipping_first_name,
      shipping_last_name,
      shipping_address_name_01,
      selectedShippingCountry,
      selectedShippingCity,
      shipping_address_town,
      shipping_zip_code,
      shipping_phone_name
    } = this.state;
    const { cart } = props;
    const dimantion = basicFunction.cartHeightWidhtCalculation2(cart.items);

    var data = {
      name: billing_first_name + " " + billing_last_name,
      street: billing_address_name_01,
      city: billing_address_town,
      state: selectedCity,
      zip: billing_zip_code,
      country: selectedCountry,
      phone: billing_phone_name,
      length: dimantion.length,
      width: dimantion.width,
      height: dimantion.height,
      weight: dimantion.weight
    };
    if (!sameShipping) {
      data = {
        name: shipping_first_name + " " + shipping_last_name,
        street: shipping_address_name_01,
        city: shipping_address_town,
        state: selectedShippingCity,
        zip: shipping_zip_code,
        country: selectedShippingCountry,
        phone: shipping_phone_name,
        length: dimantion.length,
        width: dimantion.width,
        height: dimantion.height,
        weight: dimantion.weight
      };
    }
    this.setState({
      isShippingLoading: true,
      methodReviewYourOrderDisable: true,
      mehtodPaymentMethodDisable: true
    });
    if (this.cancelableShipAdd) {
      this.cancelableShipAdd();
    }
    this.cancelableShipAdd = makeCancelable(
      getShipByAddress(data).then(res => {
        console.log({
          res
        })
        return res.json()
      }),
      resJson => {
        console.log({
          resJson
        })
        this.setState({
          isShippingLoading: false
        });
        if (resJson.status) {
          const breakData = basicFunction.getSingleElementByMultipleObject(
            resJson.data.rates,
            c => c.carrier
          );
          const isUspsRates = resJson.data.rates.some(el => el.carrier === "USPS")
          const uspsRates = isUspsRates ? resJson.data.rates.filter(
            el => el.carrier === "USPS"
          ) : resJson.data.rates;
          const shippingOptions = basicFunction
            .getShippingRates(uspsRates)
            .sort((a, b) => a.rate - b.rate);
          const shippingOptionsNew = shippingOptions.map(el => {
            console.log({
              shippingFreeAfter,
              subTotal: cart.subTotal,
              el
            });
            if (shippingFreeAfter < cart.subTotal) {
              if (el.customName === "Standard") {
                console.log("aaa");
                return {
                  ...el,
                  customRate: 0
                };
              }
            }
            return el;
          });
          console.log({
            uspsRates,
            shippingOptions,
            shippingOptionsNew
          });
          const objectOffkeys = Object.keys(breakData);
          const shippingWrongZip = resJson.data.messages && resJson.data.messages.find(el => el.message === "to postal code: zipcode format must be zzzzz[pppp]")
          console.log({
            shippingWrongZip
          })
          if (resJson.data.messages &&
            shippingWrongZip && shippingWrongZip.message === "to postal code: zipcode format must be zzzzz[pppp]"
          ) {
            let msg = "";
            switch (shippingWrongZip.message) {
              case "to postal code: zipcode format must be zzzzz[pppp]":
                msg = zipCodeInvalidShippingError;
                break;
              default:
                msg = resJson.data.messages[0].message;
            }
            this.setState({
              shippingErrMsg: msg
            });
          } else if (resJson.data.rates && resJson.data.rates.length) {
            this.setState(
              {
                shippingErrMsg: null,
                shipinngBreakData: breakData,
                shippingCarrier: objectOffkeys,
                shippingAllData: resJson.data.rates,
                shippingAllResponse: resJson.data,
                shippingRates: shippingOptionsNew // breakData[firstKey]
              },
              () => {
                if (shippingOptionsNew.length > 0)
                  this.handleShippingTypeChange(shippingOptionsNew[0]);
                else {
                  this.setState({
                    shippingErrMsg:
                      "We couldn't find a carrier. Please try again later"
                  });
                }
              }
            );
          }
        }
      },
      err => {
        this.setState({
          isShippingLoading: false
        });
        console.log("err is", err);
      }
    );

    if (this.cancelableTax) {
      this.cancelableTax();
    }
    const countryForTax = sameShipping ? selectedCountry : selectedShippingCountry
    const countryCodeForTax = getCountryCode(countryForTax)
    console.log({
      countryCodeForTax
    })
    if (countryCodeForTax) {
      console.log({
        countryCodeForTax___: countryCodeForTax
      })
      this.cancelableTax = makeCancelable(
        getTaxValueApi(countryCodeForTax).then(res => res.json()),
        resJson => {
          console.log({
            resJson
          })
          const { cart } = this.props;
          this.setState(
            {
              taxPersent: resJson.rate,
              taxValue: resJson.rate * cart.subTotal
            },
            () => {
              this.props.setTax(
                {
                  taxPersent: resJson.rate,
                  taxCountry: this.state.selectedShipping
                },
                this.props.cart,
                this.props.user && this.props.user.userMetaId
              );
            }
          );
        },
        err => {
          console.log({
            err
          })
        }
      )
    }
  }
  onChangeCarrier(e) {
    const { value } = e.target;
    const { setShippingCharge, setShippingType } = this.props;
    setShippingType("", this.props.cart, this.props.user.userMetaId);
    setShippingCharge("", this.props.cart, this.props.user.userMetaId);
    this.stripCardValidate();
    this.setState({
      mehtodPaymentMethodDisable: true,
      methodReviewYourOrderDisable: true,
      shippingRates: this.state.shipinngBreakData[value],
      rateId: null
    });

    // console.log(this.state.shipinngBreakData[value]);
  }

  validateAddressFieldsDisable(field, type) {
    const { isError, errorMsg } = fieldValidation(this.state[field], type);
    console.log({
      isError, errorMsg,
      field, state: this.state[field]
    })
    // this.setState({
    //   [`${field}Err`]: isError,
    //   [`${field}ErrMsg`]: errorMsg
    // });
    return isError;
  }
  validateAddressFields(field, type) {
    const { isError, errorMsg } = fieldValidation(this.state[field], type);
    this.setState({
      [`${field}Err`]: isError,
      [`${field}ErrMsg`]: errorMsg
    });
  }

  SubscriptionCheckout(e) {
    this.setState({
      SubscriptionCheckout: e.target.checked
    });
  }
  expressCheckOutFormFillPaypal(_id) {
    this.props.setOrderFlag(true);
    if (this.cancelableSingleUser) {
      this.cancelableSingleUser();
    }
    this.cancelableSingleUser = makeCancelable(
      getSingleUserApi(_id).then(res => {
        return res.json();
      }),
      rep => {
        if (rep.user) {
          const { shippingdetails } = rep.user;
          this.setState({
            userDetailsRes: rep.user
          });

          if (
            shippingdetails &&
            shippingdetails.address &&
            shippingdetails.address.length > 0
          ) {
            var isDefaultAddress = false;
            shippingdetails.address.map(key => {
              if (key.isDefault) {
                isDefaultAddress = key;
              }
              return null;
            });
            this.setState({
              sameShipping: true,
              billing_first_name: isDefaultAddress.firstname,
              billing_last_name: isDefaultAddress.lastname,
              billing_email_name: isDefaultAddress.email,
              billing_phone_name: isDefaultAddress.phone,
              billing_address_name_01: isDefaultAddress.address1,
              billing_address_town: isDefaultAddress.city,
              billing_zip_code: isDefaultAddress.zip,
              selectedCountry: isDefaultAddress.country,
              selectedCity: isDefaultAddress.state,
              addressData: {
                country:
                  isDefaultAddress.country.value || isDefaultAddress.country,
                state: isDefaultAddress.state.value || isDefaultAddress.state,
                city: isDefaultAddress.city,
                address: isDefaultAddress.address,
                zip: isDefaultAddress.zip
              },
              mehtodShippingMethodDisable: false,
              methodReviewYourOrderDisable: false
            });
            this.setState({
              SpinnerToggle: true
            });
            const order = this.generateOrder();
            this.props.setExpressCheckout(false);
            this.props.setPaypalOrderDetails(order);
            this.paypalPayment();
          }
          if (rep.user.carddetails) {
            const carddetails = rep.user.carddetails.cards;
            var isDefaultCard = false;
            carddetails.map(key => {
              if (key.isDefault) {
                isDefaultCard = key;
              }
              return null;
            });
            const backDataToOrder = {
              cardNumber: isDefaultCard.cardnumber,
              cvNumber: isDefaultCard.cvc,
              expDate: isDefaultCard.expmonth + "/" + isDefaultCard.expyear
            };
            const saveDataToOrder = {
              cardnumber: isDefaultCard.cardnumber,
              cvc: isDefaultCard.cvc,
              expirydate: isDefaultCard.expmonth + "/" + isDefaultCard.expyear
            };
            this.setState({
              expressCarddetails: saveDataToOrder,
              stripePaymentData: backDataToOrder
            });

            this.setState({
              expressCarddetailsFill: true
            });
          }
        } else {
        }
      },
      error => {
        console.log({
          error
        });
      }
    )
      .then()
      .catch();
  }
  shippingaddressautoFill(e) {
    const { other, country, state, city, zip } = e;
    console.log({ e });
    console.log("bbbbb")
    this.setState(
      prevState => ({
        shipping_address_name_01: other ? other : (prevState.shipping_address_name_01 || ""),
        selectedShippingCountry: country ? country : (prevState.selectedShippingCountry || ""),
        selectedShippingCity: state ? state : (prevState.selectedShippingCity || ""),
        shipping_address_town: city ? city : (prevState.shipping_address_town || ""),
        shipping_zip_code: zip ? zip : (prevState.shipping_zip_code || "")
      }),
      () => {
        console.log({
          AAAAAAAAAAAA: this.state
        })
        if (other && other.length > 0) {
          this.setState({
            shipping_address_name_01Err: false
          });
        }
        if (country && country.length > 0) {
          this.setState({
            selectedShippingCountryErr: false
          });
        }
        if (state && state.length > 0) {
          this.setState({
            selectedShippingCityErr: false
          });
        }
        if (city && city.length > 0) {
          this.setState({
            shipping_address_townErr: false
          });
        }

        if (zip && zip.length > 0) {
          this.setState({
            shipping_zip_codeErr: false
          });
        } else {
          this.setState({
            shipping_zip_codeErr: true
          });
        }
        setTimeout(() => {
          if (!this.validateOnDisable()) {
            this.shippingPriceGetMethod();
            this.setState({
              mehtodShippingMethodDisable: false
            });
          } else {
            const { setShippingCharge } = this.props;
            setShippingCharge("", this.props.cart, this.props.user.userMetaId);
            this.setState({
              mehtodShippingMethodDisable: true,
              mehtodPaymentMethodDisable: true
            });
          }
        }, 100);
      }
    );
  }
  billingaddressautoFill(e) {
    const { other, country, state, city, zip } = e;
    console.log({ e });
    this.setState(
      prevState => {
        return {
          billing_address_name_01: other ? other : (prevState.billing_address_name_01 || ""),
          selectedCountry: country ? country : (prevState.selectedCountry || ""),
          selectedCity: state ? state : (prevState.selectedCity || ""),
          billing_address_town: city ? city : (prevState.billing_address_town || ""),
          billing_zip_code: zip ? zip : (prevState.billing_zip_code || "")
        }
      },
      () => {
        if (other && other.length > 0) {
          this.setState({
            billing_address_name_01Err: false
          });
        } else {
          this.setState({
            billing_address_name_01Err: true
          });
        }
        if (country && country.length > 0) {
          if (enableCountry.includes(country.trim()) || true) {
            this.setState({
              selectedCountryErr: false,
              countryUSAError: false
            });
          } else {
            this.setState({
              selectedCountryErr: false,
              countryUSAError: true
            });
          }
        } else {
          this.setState({
            selectedCountryErr: false,
            countryUSAError: true
          });
        }
        if (state && state.length > 0) {
          this.setState({
            selectedCityErr: false
          });
        } else {
          this.setState({
            selectedCityErr: false
          });
        }
        if (city && city.length > 0) {
          this.setState({
            billing_address_townErr: false
          });
        } else {
          this.setState({
            billing_address_townErr: false
          });
        }
        if (zip && zip.length > 0) {
          this.setState({
            billing_zip_codeErr: false
          });
        } else {
          this.setState({
            billing_zip_codeErr: true
          });
        }

        setTimeout(() => {
          if (!this.validateOnDisable()) {
            this.shippingPriceGetMethod();
            this.setState({
              mehtodShippingMethodDisable: false
            });
          } else {
            setShippingCharge("", this.props.cart, this.props.user.userMetaId);
            this.setState({
              mehtodShippingMethodDisable: true,
              mehtodPaymentMethodDisable: true
            });
          }
        }, 100);
      }
    );
  }
  expressCheckOutFormFill(_id) {
    console.log("test express");
    if (this.cancelableSingleUser1) {
      this.cancelableSingleUser1();
    }
    this.cancelableSingleUser1 = makeCancelable(
      getSingleUserApi(_id).then(res => {
        return res.json();
      }),
      rep => {
        console.log({ rep });
        if (rep.user) {
          this.setState({
            userDetailsRes: rep.user
          });
          if (
            rep.user.shippingdetails &&
            rep.user.shippingdetails.address &&
            rep.user.shippingdetails.address.length > 0
          ) {
            // var isDefaultAddress = false;
            const isDefaultAddress = rep.user.shippingdetails.address.find(
              key => key.isDefault
            );
            console.log({ isDefaultAddress });
            if (isDefaultAddress) {
              if (isDefaultAddress.country.trim() === "USA" || true) {
                this.setState({
                  countryUSAError: false
                });
                // return null;
              }
              this.setState(
                {
                  sameShipping: true,
                  billing_first_name: isDefaultAddress.firstname,
                  billing_last_name: isDefaultAddress.lastname,
                  billing_email_name: isDefaultAddress.email,
                  billing_phone_name: isDefaultAddress.phone,
                  billing_address_name_01: isDefaultAddress.address,
                  billing_address_town: isDefaultAddress.city,
                  billing_zip_code: isDefaultAddress.zip,
                  selectedCountry: isDefaultAddress.country.trim(),
                  selectedCity: isDefaultAddress.state,
                  addressData: {
                    country:
                      isDefaultAddress.country.value ||
                      isDefaultAddress.country.trim(),
                    state:
                      isDefaultAddress.state.value || isDefaultAddress.state,
                    city: isDefaultAddress.city,
                    address: isDefaultAddress.address,
                    zip: isDefaultAddress.zip
                  },
                  mehtodShippingMethodDisable: false,
                  methodReviewYourOrderDisable: false
                },
                () => {
                  // console.log("in", this.state);
                  this.shippingPriceGetMethod();
                  setTimeout(() => {
                    this.validateOnSubmit();
                  }, 200);
                }
              );
            }
          }

          // this.shippingPriceGetMethod();
          // console.log({
          //   rep
          // });
          if (rep.user.carddetails) {
            const carddetails = rep.user.carddetails.cards;
            if (rep.user.carddetails.cards) {
              const foundedMethod = rep.user.carddetails.cards.find(
                el => el.isDefault
              );
              if (foundedMethod) {
                console.log({
                  foundedMethod
                });
                const {
                  customerPaymentProfileId,
                  customerProfileId,
                  ...rest
                } = foundedMethod;
                this.setState(
                  {
                    paymentMethod: customerPaymentProfileId,
                    isDefaultPayment: true,
                    defaultPaymentProfile: {
                      profileid: customerProfileId,
                      paymentid: customerPaymentProfileId,
                      ...rest
                    },
                    openPaymentAccordion: foundedMethod.bankAccount
                      ? "savedAccount"
                      : foundedMethod.creditCard && "savedCard"
                  }
                  // () => {
                  //   if (foundedMethod.bankAccount) {
                  //     const {
                  //       accountNumber,
                  //       accountType,
                  //       nameOnAccount,
                  //       routingNumber
                  //     } = foundedMethod.bankAccount

                  //     const getAccountType = accountType => {
                  //       const foundAccount = accountTypeOpt.find(el => el.value === accountType);
                  //       if (foundAccount) {
                  //         return foundAccount.label;
                  //       }
                  //       return accountType;
                  //     };
                  //     this.setState({
                  //       paymentMethod: "cheque",
                  //       accName: nameOnAccount,
                  //       routingType: routingNumber,
                  //       accountNumber: accountNumber,
                  //       accountType: {
                  //         label: getAccountType(accountType),
                  //         value: accountType
                  //       },
                  //     });
                  //   } else if (foundedMethod.creditCard) {

                  //     const {
                  //       cardNumber,
                  //       cardType,
                  //       expirationDate,
                  //       issuerNumber
                  //     } = foundedMethod.creditCard
                  //     console.log({
                  //       expirationDate
                  //     })
                  //     this.setState({
                  //       paymentMethod: "stripe",
                  //       expressCarddetailsFill: true,
                  //       expressCarddetails: {
                  //         cardnumber: cardNumber,
                  //         expirydate: expirationDate,
                  //         cvc: 123
                  //       }
                  //     });
                  //   }
                  // }
                );
              } else {
                this.setState({
                  isDefaultPayment: false,
                  defaultPaymentProfile: {
                    profileid: null,
                    paymentid: null
                  }
                });
              }
            }
            var isDefaultCard = false;
            carddetails.cards.map(key => {
              if (key.isDefault) {
                isDefaultCard = key;
              }
              return null;
            });
            const backDataToOrder = {
              cardNumber: isDefaultCard.cardnumber,
              cvNumber: isDefaultCard.cvc,
              expDate: isDefaultCard.expmonth + "/" + isDefaultCard.expyear
            };
            const saveDataToOrder = {
              cardnumber: isDefaultCard.cardnumber,
              cvc: isDefaultCard.cvc,
              expirydate: isDefaultCard.expmonth + "/" + isDefaultCard.expyear
            };
            this.setState({
              expressCarddetails: saveDataToOrder,
              stripePaymentData: backDataToOrder
            });

            this.setState({
              expressCarddetailsFill: true
            });
          }
        } else {
        }
      },
      error => {
        console.log({
          error
        });
      }
    );
  }
  toggleAcc() {
    this.setState(state => ({ collapse: !state.collapse }));
    this.setState({ collapse2: false });
  }
  toggleAcc2() {
    this.setState(state => ({ collapse2: !state.collapse2 }));
    this.setState({ collapse: false });
  }
  paymentMethod(e, paymentProfile) {
    const { value } = e.currentTarget;
    this.setState(
      {
        paymentMethod: value
      },
      () => {
        if (paymentProfile) {
          this.setState({
            isDefaultPayment: true,
            defaultPaymentProfile: {
              ...paymentProfile,
              paymentid: paymentProfile.customerPaymentProfileId,
              profileid: paymentProfile.customerProfileId
            },
            methodReviewYourOrderDisable: false
          });
        } else {
          this.setState({
            isDefaultPayment: false,
            defaultPaymentProfile: {
              profileid: null,
              paymentid: null
            }
          });
        }
        if (value === "Check") {
          if (!this.validateOnSubmit()) {
            this.setState({
              paypalButtonShow: false,
              methodReviewYourOrderDisable: false
            });
          } else {
            this.setState({
              paypalButtonShow: false,
              methodReviewYourOrderDisable: false
            });
          }
        } else if (!paymentProfile) {
          this.setState({
            paypalButtonShow: false,
            methodReviewYourOrderDisable: true
          });
        }
      }
    );
  }

  handleShippingTypeChange(e) {
    const { customRate, id, service } = e;
    const { setShippingCharge, setShippingType } = this.props;
    const shippingCharge = parseFloat(customRate);
    const shippingType = service;
    const { id: shpId } = this.state.shippingAllResponse;
    this.setState(
      {
        shippingType,
        shippingCharge,
        rateId: id,
        shippingSendData: {
          shipmentid: shpId,
          rate: id
        },
        mehtodPaymentMethodDisable: false
      },
      () => {
        const { isDefaultPayment, isShippingLoading } = this.state;
        if (isDefaultPayment && !isShippingLoading) {
          this.setState({
            methodReviewYourOrderDisable: false
          });
        }
      }
    );
    setShippingCharge(
      shippingCharge,
      this.props.cart,
      this.props.user.userMetaId
    );
    setShippingType(shippingType, this.props.cart, this.props.user.userMetaId);
  }

  validateOnDisable(setStates = false) {
    console.log({
      setStates
    })
    const shippingFields = [
      {
        name: "shipping_first_name",
        type: "name,required"
      },
      {
        name: "shipping_last_name",
        type: "name,required"
      },
      {
        name: "shipping_email_name",
        type: "email,required"
      },
      {
        name: "shipping_phone_name",
        type: "phone,required"
      },
      {
        name: "shipping_address_name_01",
        type: "required"
      },
      {
        name: "shipping_address_town",
        type: "required"
      },
      {
        name: "shipping_zip_code",
        type: "required, zipcode"
      },
      {
        name: "selectedShippingCountry",
        type: "required"
      },
      {
        name: "selectedShippingCity",
        type: "required"
      }
    ];
    const billingFields = [
      {
        name: "billing_first_name",
        type: "name,required"
      },
      {
        name: "billing_last_name",
        type: "name,required"
      },
      {
        name: "billing_email_name",
        type: "email,required"
      },
      {
        name: "billing_phone_name",
        type: "phone,required"
      },
      {
        name: "billing_address_name_01",
        type: "required"
      },
      {
        name: "billing_address_town",
        type: "required"
      },
      {
        name: "billing_zip_code",
        type: "required, zipcode"
      },
      {
        name: "selectedCountry",
        type: "required"
      },
      {
        name: "selectedCity",
        type: "required"
      }
    ];
    const { sameShipping } = this.state;

    let validate = [];
    validate = [...billingFields, ...validate];
    if (!sameShipping) {
      validate = [...validate, ...shippingFields];
    }

    const newFlag =
      validate &&
      validate.map(el => {
        return this.validateAddressFieldsDisable(el.name, el.type);
      });

    if (setStates) {
      validate && validate.forEach(el => {
        this.validateAddressFields(el.name, el.type);
      });
    }
    const checkAll = validate.map(el => {
      return this.state[el.name + "Err"];
    });
    const flag = newFlag.some(a => {
      return a !== false;
    });

    console.log({
      flag
    });

    return flag;
  }

  validateOnSubmit() {
    const shippingFields = [
      {
        name: "shipping_first_name",
        type: "name,required"
      },
      {
        name: "shipping_last_name",
        type: "name,required"
      },
      {
        name: "shipping_email_name",
        type: "email,required"
      },
      {
        name: "shipping_phone_name",
        type: "phone,required"
      },
      {
        name: "shipping_address_name_01",
        type: "required"
      },
      {
        name: "shipping_address_town",
        type: "required"
      },
      {
        name: "shipping_zip_code",
        type: "required, zipcode"
      },
      {
        name: "selectedShippingCountry",
        type: "required"
      },
      {
        name: "selectedShippingCity",
        type: "required"
      }
    ];
    const billingFields = [
      {
        name: "billing_first_name",
        type: "name,required"
      },
      {
        name: "billing_last_name",
        type: "name,required"
      },
      {
        name: "billing_email_name",
        type: "email,required"
      },
      {
        name: "billing_phone_name",
        type: "phone,required"
      },
      {
        name: "billing_address_name_01",
        type: "required"
      },
      {
        name: "billing_address_town",
        type: "required"
      },
      {
        name: "billing_zip_code",
        type: "required, zipcode"
      },
      {
        name: "selectedCountry",
        type: "required"
      },
      {
        name: "selectedCity",
        type: "required"
      }
    ];
    const { sameShipping, isDefaultPayment, paymentMethod } = this.state;

    let validate = [];
    validate = [...billingFields, ...validate];
    if (!sameShipping) {
      validate = [...validate, ...shippingFields];
    }
    if (!isDefaultPayment && paymentMethod === "cheque") {
      const bankValidation = [
        {
          name: "accName",
          type: "required"
        },
        {
          name: "routingType",
          type: "number, required, routingNumber"
        },
        {
          name: "accountNumber",
          type: "number, required"
        }
      ];
      validate = [...validate, ...bankValidation];
    }
    validate &&
      validate.map(el => {
        this.validateAddressFields(el.name, el.type);
        return null;
      });

    const checkAll = validate.map(el => {
      // return this.state[el.name + "_err"];
      return this.state[el.name + "Err"];
    });
    const flag = checkAll.some(a => {
      return a !== false;
    });

    if (this.state.paymentmethod === "paypal") {
      this.setState({
        paypalButtonShow: true
      });
    }

    return flag;
  }

  async generateOrder(paymentResponse = "", isFirst = false) {
    this.validateOnSubmit();

    let confirmShipRes = this.state.confirmShipRes;
    const { shippingSendData } = this.state;
    if (isFirst) {
      await confirmShipmentApi({
        ...shippingSendData
      })
        .then(res => res.json())
        .then(resJson => {
          console.log({ resJson });
          if (resJson.data && resJson.status) {
            confirmShipRes = resJson.data;
            this.setState({
              confirmShipRes
            });
          }
        })
        .catch(err => console.log({ err }));
    }
    const { cart, user, referrer } = this.props;
    const refId = referrer.referralUrlId;
    console.log({
      confirmShipRes
    })
    const {
      id: shipmentid,
      selected_rate,
      postage_label,
      tracking_code: trackingcode,
      tracker,
      fees
    } = confirmShipRes || {

    };
    const shippingDetails = {
      shipmentid,
      rateid: selected_rate && selected_rate.id,
      rate: selected_rate && selected_rate.rate,
      label: postage_label && postage_label.label_url,
      trackingcode,
      trackerid: tracker && tracker.id,
      fees,
      service: selected_rate && selected_rate.service,
      carrier: (selected_rate && selected_rate.carrier) || "shipment_failed"
    };
    const newOrder = basicFunction.generateOrder(
      this.state,
      paymentResponse,
      refId,
      cart,
      user,
      shippingDetails
    );
    const newOrder2 = basicFunction.generateOrderNew(
      this.state,
      paymentResponse,
      refId,
      cart,
      user,
      shippingDetails
    );
    console.log({ newOrder, newOrder2 });
    return newOrder2;
  }
  //------
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  modalDismiss() {
    const {
      clearCart,
      location: { countryCode },
      history,
      isGuest,
      setGuest,
      user: { userMetaId }
    } = this.props;
    this.setState({
      modal: false
    });

    if (this.state.clearCart) {
      if (isGuest) {
        // history.push(`/${countryCode}/`);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        clearCart(userMetaId);
        setGuest(false);
      } else {
        // history.push(`/${countryCode}/my-account`);
        clearCart(userMetaId);
      }
    }
  }
  stripePaymentCheck(order) {
    const { user } = this.props;
    if (user._id) {
      this.paymentTokanThenPayment(user._id);
    } else {
      const test = {
        name: "test"
      };
      this.directPaymentWithoutSubscription(test);
    }
  }
  authorizePayment = orderPromise => {
    orderPromise
      .then(order => {
        console.log({ order });
        const {
          stripePaymentData,

          billing_first_name,
          billing_last_name,
          billing_address_name_01,
          billing_zip_code,
          billing_address_town, //city
          selectedCity, //state
          selectedCountry, //country

          shipping_first_name,
          shipping_last_name,
          shipping_address_name_01,
          selectedShippingCity,
          selectedShippingCountry,
          shipping_address_town,
          shipping_zip_code,
          isSaveCard
        } = this.state;
        const { cardNumber, expDate, cvNumber } = stripePaymentData;

        const cardnumber = cardNumber.replace(/-/g, "");
        const expiry =
          "20" +
          expDate
            .split("/")
            .reverse()
            .join("-");

        const {
          grandTotal: amount,
          countryTax,
          userDetails,
          shippingCharge,
          products
        } = order;
        const customAmount = amount; // + Math.random() * 100
        const data = {
          cardnumber,
          expiry,
          cardcode: cvNumber,
          amount: parseFloat(customAmount.toFixed(2)),
          tax: {
            amount: countryTax,
            name: `Country Tax - ${userDetails.country}`
          },
          shipping: {
            amount: shippingCharge,
            name: `Ship to - ${userDetails.state}`
          },
          lineItems: products.map(el => ({
            itemId: el.itemId,
            name: el.title,
            description: "-",
            quantity: el.qty,
            unitPrice: el.unitPrice
          })),
          billto: {
            firstName: billing_first_name,
            lastName: billing_last_name,
            company: "",
            address: billing_address_name_01,
            city: billing_address_town,
            state: selectedCity,
            zip: billing_zip_code,
            country: selectedCountry
          },
          shipTo: {
            firstName: basicFunction.getOneValid(
              shipping_first_name,
              billing_first_name
            ),
            lastName: basicFunction.getOneValid(
              shipping_last_name,
              billing_last_name
            ),
            company: "",
            address: basicFunction.getOneValid(
              shipping_address_name_01,
              billing_address_name_01
            ),
            city: basicFunction.getOneValid(
              shipping_address_town,
              billing_address_town
            ),
            state: basicFunction.getOneValid(
              selectedShippingCity,
              selectedCity
            ),
            zip: basicFunction.getOneValid(shipping_zip_code, billing_zip_code),
            country: basicFunction.getOneValid(
              selectedShippingCountry,
              selectedCountry
            )
          }
        };
        console.log({ data });
        authorizeChargeApi(data)
          .then(res => res.json())
          .then(res => {
            console.log({ res });
            console.log({
              cardnumber,
              expDate,
              cvNumber,
              isSaveCard
            });
            if (res.status) {
              if (isSaveCard) {
                const bodyData = {
                  cardnumber: cardNumber,
                  expmonth: expDate.split("/")[0],
                  expyear: expDate.split("/")[1],
                  cvc: cvNumber,
                  userid: this.props.userId
                };
                this.props.addCardAuthorize({
                  card: bodyData,
                  user: this.props.user,
                  oldCards: this.props.cards
                });
              }
              const transactionId = res.transactionid;

              Promise.all(this.makeSubsPromise(order, data)).then(res => {
                console.log({ res });
                const sendAbleOrder = {
                  ...order,
                  products: res,
                  transactionId
                };
                // basicFunction.exportToJson(sendAbleOrder)
                this.finalOrderSubmit(placeOrderApiNew(sendAbleOrder));
              });
            } else {
              this.setState({
                SpinnerToggle: false,
                stripePaymentErrorResponse: wrongCardDetails
              });
            }
          })
          .catch(err => {
            console.log({ err });
            this.setState({
              SpinnerToggle: false,
              stripePaymentErrorResponse: wrongCardDetails
            });
          });
      })
      .catch(e => console.log({ e }));
  };
  authorizeProfilePayment = orderPromise => {
    this.setState(
      {
        SpinnerToggle: true
      },
      () => {
        orderPromise.then(order => {
          const { defaultPaymentProfile } = this.state;

          const { grandTotal: amount } = order;
          const customAmount = amount;
          const data = {
            paymentid: defaultPaymentProfile.paymentid,
            profileid: defaultPaymentProfile.profileid,
            amount: parseFloat(customAmount.toFixed(2))
          };

          authorizeProfileChargeApi(data)
            .then(res => res.json())
            .then(res => {
              console.log({ res });
              const { status, data } = res;
              if (status) {
                if (
                  data &&
                  data.transactionResponse &&
                  data.transactionResponse.transId
                ) {
                  const transactionId = data.transactionResponse.transId;
                  const {
                    billing_first_name,
                    billing_last_name,
                    billing_address_name_01,
                    billing_address_town,
                    selectedCity,
                    billing_zip_code,
                    selectedCountry
                  } = this.state;
                  Promise.all(
                    this.makeSubsPromise(order, {
                      data,
                      profileid: defaultPaymentProfile.profileid,
                      paymentid: defaultPaymentProfile.paymentid,
                      billto: {
                        firstName: billing_first_name,
                        lastName: billing_last_name,
                        company: "",
                        address: billing_address_name_01,
                        city: billing_address_town,
                        state: selectedCity,
                        zip: billing_zip_code,
                        country: selectedCountry
                      }
                    })
                  ).then(res => {
                    console.log({ res });
                    const sendAbleOrder = {
                      ...order,
                      products: res,
                      transactionId
                    };
                    // basicFunction.exportToJson(sendAbleOrder)
                    this.finalOrderSubmit(placeOrderApiNew(sendAbleOrder));
                  });
                }
              } else {
                this.setState({
                  SpinnerToggle: false,
                  stripePaymentErrorResponse: wrongCardDetails,
                  modalData: someThingWrong,
                  modalTitle: wrongModalTitle,
                  modal: true
                });
              }
            })
            .catch(e => {
              console.log(e);
              this.setState({
                SpinnerToggle: false,
                stripePaymentErrorResponse: wrongCardDetails
              });
            });
        });
      }
    );
  };
  authorizeBankPayment = orderPromise => {
    this.setState({
      SpinnerToggle: true
    });
    orderPromise
      .then(order => {
        console.log({ order });
        const {
          billing_first_name,
          billing_last_name,
          billing_address_name_01,
          billing_zip_code,
          billing_address_town, //city
          selectedCity, //state
          selectedCountry, //country

          shipping_first_name,
          shipping_last_name,
          shipping_address_name_01,
          selectedShippingCity,
          selectedShippingCountry,
          shipping_address_town,
          shipping_zip_code,
          routingType,
          accountNumber,
          accName,
          accountType,
          isSaveCard
        } = this.state;

        const {
          grandTotal: amount,
          countryTax,
          userDetails,
          shippingCharge
          // products
        } = order;
        const customAmount = amount; // + Math.random() * 100
        const data = {
          amount: parseFloat(customAmount.toFixed(2)),
          accountType: accountType.value,
          routingNumber: routingType,
          accountNumber: accountNumber,
          nameOnAccount: accName,
          tax: {
            amount: countryTax,
            name: `Country Tax - ${userDetails.country}`
          },
          shipping: {
            amount: shippingCharge,
            name: `Ship to - ${userDetails.state}`
          },
          shipTo: {
            firstName: basicFunction.getOneValid(
              shipping_first_name,
              billing_first_name
            ),
            lastName: basicFunction.getOneValid(
              shipping_last_name,
              billing_last_name
            ),
            company: "",
            address: basicFunction.getOneValid(
              shipping_address_name_01,
              billing_address_name_01
            ),
            city: basicFunction.getOneValid(
              shipping_address_town,
              billing_address_town
            ),
            state: basicFunction.getOneValid(
              selectedShippingCity,
              selectedCity
            ),
            zip: basicFunction.getOneValid(shipping_zip_code, billing_zip_code),
            country: basicFunction.getOneValid(
              selectedShippingCountry,
              selectedCountry
            )
          },
          billto: {
            firstName: billing_first_name,
            lastName: billing_last_name,
            company: "",
            address: billing_address_name_01,
            city: billing_address_town,
            state: selectedCity,
            zip: billing_zip_code,
            country: selectedCountry
          }
        };
        // console.log({ data });
        authorizeBankChargeApi(data)
          .then(res => res.json())
          .then(res => {
            console.log({ res });
            if (res.status) {
              if (isSaveCard) {
                const bodyData = {
                  accountType: accountType.value,
                  routingNumber: routingType,
                  accountNumber,
                  nameOnAccount: accName
                };
                this.props.addCardAuthorize({
                  bank: bodyData,
                  user: this.props.user,
                  oldCards: this.props.cards
                });
              }
              const transactionId = res.transactionid;

              Promise.all(this.makeSubsPromise(order, data)).then(res => {
                console.log({ res });
                const sendAbleOrder = {
                  ...order,
                  products: res,
                  transactionId
                };
                // basicFunction.exportToJson(sendAbleOrder)
                this.finalOrderSubmit(placeOrderApiNew(sendAbleOrder));
              });
            } else {
              const errShow =
                res.data.transactionResponse &&
                res.data.transactionResponse.errors &&
                res.data.transactionResponse.errors[0].errorText;
              this.setState({
                SpinnerToggle: false,
                checkingResponseError: errShow
              });
            }
          })
          .catch(err => {
            console.log({ err });
            this.setState({
              SpinnerToggle: false,
              checkingResponseError: "Something Wrong"
            });
          });
      })
      .catch(e => console.log({ e }));
  };
  finalOrderSubmit = orderApi => {
    orderApi
      .then(res => res.json())
      .then(resJson => {
        if (resJson.status) {
          this.setState(
            {
              modalData: orderPlacedSuccessfully,
              modalTitle: orderPlacedModalTitle,
              modal: true,
              clearCart: true,
              SpinnerToggle: false
            },
            () => {
              this.modalDismiss();
              const {
                history,
                location,
                user: {
                  userMetaId
                }
              } = this.props
              clearCart(userMetaId);
              history.push({
                pathname: "/" + location.countryCode + "/order-success",
                state: {
                  order: resJson.data
                }
              })
            }
          );
        } else {
          console.log(resJson);
          this.setState({
            modalData: someThingWrong,
            modalTitle: wrongModalTitle,
            modal: true,
            SpinnerToggle: false
          });
        }
      })
      .catch(err => {
        console.log({
          err
        });
        this.setState({
          modalData: someThingWrong,
          modalTitle: wrongModalTitle,
          modal: true,
          SpinnerToggle: false
        });
      });
  };

  makeSubsPromise = (order, details) => {
    return order.products.map(el => {
      if (el.isSubscribed) {
        const subsData = this.generateSubsData(el, details);
        if (subsData.routingNumber) {
          return this.combinePromiseProduct(
            authorizeSubscriptionBankApi(subsData).then(res => res.json()),
            el
          );
        }
        if (subsData.profileid) {
          return this.combinePromiseProduct(
            authorizeSubscriptionProfileApi(subsData).then(res => res.json()),
            el
          );
        }
        return this.combinePromiseProduct(
          authorizeSubscriptionApi(subsData).then(res => res.json()),
          el
        );
      } else {
        return new Promise(res => {
          res(el);
        });
      }
    });
  };

  combinePromiseProduct = (promise, el) =>
    new Promise(res => {
      promise
        .then(resX => {
          if (resX.status) {
            res({
              ...el,
              subscriptionFailed: false,
              subscriptionId: resX.subscriptionid
            });
          } else {
            res({
              ...el,
              subscriptionFailed: true
            });
          }
        })
        .catch(resX => {
          res({
            ...el,
            subscriptionFailed: true
          });
        });
    });

  generateSubsData = (el, details) => {
    const customAmount = parseFloat(el.subTotal); // + (Math.random() * 100)
    const {
      billto,
      profileid,
      paymentid,
      cardnumber,
      cardcode,
      expiry
    } = details;
    console.log({
      details
    });
    const subsData = {
      amount: parseFloat(customAmount.toFixed(2)),
      name: billto.firstName + billto.lastName,
      schedule: {
        interval: {
          length: "1",
          unit: "months"
        },
        startDate: moment().format("YYYY-MM-DD"),
        totalOccurrences: el.subscriptionMeta.duration || "1"
      },
      billto: {
        firstName: billto.firstName,
        lastName: billto.lastName
      }
    };
    if (profileid && paymentid) {
      return {
        ...subsData,
        profileid,
        paymentid
      };
    }
    if (cardnumber && cardcode && expiry)
      return {
        ...subsData,
        cardnumber,
        cardcode,
        expiry
      };
  };
  createAuthorizeSubscription = async (order, details, cb) => {
    const filterItem = order.products.filter(el => el.isSubscribed);
    let flagCount = 0;
    const totalCount = filterItem.length;
    console.log({
      filterItem
    });
    if (totalCount > 0) {
      const newItems = await order.products.map(async el => {
        console.log({
          el
        });
        if (el.isSubscribed) {
          const { cardnumber, cardcode, expiry, billto } = details;
          const subsData = {
            cardnumber,
            cardcode,
            expiry,
            amount: el.subTotal,
            name: billto.firstName + billto.lastName,
            schedule: {
              interval: {
                length: "1",
                unit: "months"
              },
              startDate: moment().format("YYYY-MM-DD"),
              totalOccurrences: el.subscriptionMeta.duration || "1"
            },
            billto: {
              firstName: billto.firstName,
              lastName: billto.lastName
            }
          };
          authorizeSubscriptionApi(subsData)
            .then(res => res.json())
            .then(res => {
              console.log({
                resSubscription: res
              });
              flagCount = flagCount + 1;
              if (flagCount === totalCount) {
                // complete

                if (typeof cb === "function") cb();
              }
              return {
                ...el,
                res
              };
            })
            .catch(err => {
              console.log({ err });
              flagCount = flagCount + 1;
              if (flagCount === totalCount) {
                // complete
                if (typeof cb === "function") cb();
              }

              return {
                ...el,
                err
              };
            });
        } else {
          return el;
        }
      });
      return newItems;
    } else {
      if (flagCount === totalCount) {
        // complete
        if (typeof cb === "function") cb();
      }
      return order.products;
    }
  };
  paymentTokanThenPayment(userid) {
    const { stripePaymentData } = this.state;
    const cardno = stripePaymentData.cardNumber.replace(/-/g, "");
    const expMonth = stripePaymentData.expDate.split("/");
    const bodyData = {
      cardnumber: cardno,
      expmonth: expMonth[0],
      expyear: expMonth[1],
      cvc: stripePaymentData.cvNumber,
      userid
    };
    var d = new Date();
    var n = d.getFullYear();
    var final = n.toString().substring(2);
    if (expMonth[0] <= 12 && expMonth[1] >= final) {
      stripeTokanCreate(bodyData)
        .then(res => res.json())
        .then(resJson => {
          if (resJson.status) {
            this.setState({
              stripePaymentErrorResponse: ""
            });
            if (resJson.token.id) {
              const tokanId = resJson.token.id;
              // *-********************** code for payment process using code
              const TaxgrandTotalWithTax =
                this.props.cart.subTotal +
                this.props.cart.taxPersent * this.props.cart.subTotal +
                this.props.cart.shippingCharge;
              const discount =
                (this.props.cart.taxCouponDiscount * this.props.cart.subTotal) /
                100;
              const totalAmout =
                parseFloat(TaxgrandTotalWithTax || 0) -
                parseFloat(discount || 0);

              console.log({
                TaxgrandTotalWithTax,
                totalAmout,
                subTotal: this.props.cart.subTotal,
                taxPersent: this.props.cart.taxPersent,
                shippingCharge: this.props.cart.shippingCharge
              });
              const paymentData = {
                stripetoken: tokanId,
                stripeemail: "",
                amount: Math.ceil(totalAmout * 100),
                description: "121212121",
                üserid: userid || 1
              };

              stripePaymentApi(paymentData)
                .then(res => res.json())
                .then(resJson => {
                  if (resJson.status) {
                    const stripeReturncusId = resJson.details.customer;
                    // *************if payment is success then run this section **************
                    const filterCardItem = this.props.cart.items.filter(el => {
                      return el.subscribed;
                    });
                    if (filterCardItem.length > 0) {
                      this.addSubscriptionThenAddPlan(
                        filterCardItem,
                        userid,
                        stripeReturncusId
                      );
                    } else {
                      this.orderGenerateCode("", stripeReturncusId);
                    }
                  } else {
                    const errorMessage = basicFunction.convertCardErrors(
                      resJson.error.message
                    );
                    this.setState({
                      stripePaymentErrorResponse: errorMessage,
                      SpinnerToggle: false
                    });
                  }
                })
                .catch(err => {
                  this.setState({
                    stripePaymentErrorResponse: someThingWrongTryAgain,
                    SpinnerToggle: false
                  });
                });
            } else {
              this.setState({
                stripePaymentErrorResponse: someThingWrongTryAgain,
                SpinnerToggle: false
              });
            }
          } else {
            // ********************* card details wrong message ganrate
            const errorMessage = basicFunction.convertCardErrors(
              resJson.error.message
            );
            this.setState({
              stripePaymentErrorResponse: errorMessage,
              SpinnerToggle: false
            });
            // return false;
          }
        })
        .catch(err => { });
    } else {
      this.setState({
        stripePaymentErrorResponse: invalidExpiryDate,
        SpinnerToggle: false
      });
    }
  }

  addSubscriptionThenAddPlan(subscriptionItem, userid, stripeReturncusId) {
    const mapSize = subscriptionItem.length;
    let responses = [];
    subscriptionItem.map((item, mainIndex) => {
      var amount = basicFunction.calculatePrice(item);
      const intervalcount = item.subscribedTime;
      const name = item._id;
      amount = Math.ceil(amount * 100);
      const data = {
        name,
        amount,
        interval: "month",
        currency: "usd",
        intervalcount,
        userid
      };
      addStripePlan(data)
        .then(res => res.json())
        .then(resJson => {
          //     ************** check plan is create or not
          if (resJson.status) {
            if (resJson.plan) {
              const plan = resJson.plan.id;
              const data = {
                customer: stripeReturncusId,
                plan,
                userid: userid
              };

              addPlanTocutomer(data)
                .then(res => res.json())
                .then(resJson => {
                  if (resJson.status) {
                    responses.push(resJson);
                    if (mapSize - 1 === mainIndex) {
                      this.orderGenerateCode(
                        subscriptionItem,
                        stripeReturncusId
                      );
                    }
                  } else {
                    this.setState({
                      stripePaymentErrorResponse: subscribeFailMsg
                    });
                  }
                });
            }
          } else {
            this.setState({
              SpinnerToggle: false
            });
          }
        });
      return null;
    });
  }

  addPlantoSubscription(plan, userid, stripeReturncusId) {
    const data = {
      customer: stripeReturncusId,
      plan,
      userid: userid
    };
    addPlanTocutomer(data)
      .then(res => res.json())
      .then(resJson => {
        if (resJson.status) {
        } else {
          this.setState({
            stripePaymentErrorResponse: subscribeFailMsg
          });
        }
      });
  }

  directPaymentWithoutSubscription(userdetails) {
    const { stripePaymentData } = this.state;
    const cardno = stripePaymentData.cardNumber.replace(/-/g, "");
    const expMonth = stripePaymentData.expDate.split("/");
    const bodyData = {
      cardnumber: cardno,
      expmonth: expMonth[0],
      expyear: expMonth[1],
      cvc: stripePaymentData.cvNumber,
      userdetails
    };

    stripeTokanCreate(bodyData)
      .then(res => res.json())
      .then(resJson => {
        if (resJson.status) {
          if (resJson.token.id) {
            const tokanId = resJson.token.id;
            // *-********************** code for payment process using code
            const TaxgrandTotalWithTax =
              this.props.cart.subTotal +
              this.props.cart.taxPersent * this.props.cart.subTotal +
              this.props.cart.shippingCharge;
            const discount =
              (this.props.cart.taxCouponDiscount * this.props.cart.subTotal) /
              100;
            const totalAmout =
              parseFloat(TaxgrandTotalWithTax || 0) - parseFloat(discount || 0);
            const paymentData = {
              stripetoken: tokanId,
              stripeemail: "",
              amount: Math.ceil(totalAmout * 100),
              description: "---- no description ----",
              userdetails
            };

            stripePaymentApi(paymentData)
              .then(res => res.json())
              .then(resJson => {
                if (resJson.status) {
                  //return true;
                  this.setState({
                    stripeReturncusId: resJson.details.customer
                  });
                  this.orderGenerateCode();
                }
              })
              .catch(err => {
                this.setState({
                  stripePaymentErrorResponse: someThingWrongTryAgain,
                  SpinnerToggle: false
                });
              });
          } else {
            this.setState({
              stripePaymentErrorResponse: someThingWrongTryAgain,
              SpinnerToggle: false
            });
          }
        } else {
          const errorMessage = basicFunction.convertCardErrors(
            resJson.error.message
          );
          this.setState({
            stripePaymentErrorResponse: errorMessage,
            SpinnerToggle: false
          });
        }
      })
      .catch(err => {
        this.setState({
          stripePaymentErrorResponse:
            "Somthing was wrong in card detail check please try again",
          SpinnerToggle: false
        });
      });
  }
  paypalPayment() {
    const { cart } = this.props;
    const TaxgrandTotalWithTax =
      cart.subTotal + cart.taxPersent * cart.subTotal + cart.shippingCharge;
    const discount = (cart.taxCouponDiscount * cart.subTotal) / 100;
    const totalAmout =
      parseFloat(TaxgrandTotalWithTax || 0) - parseFloat(discount || 0);

    const data = {
      amount: Math.ceil(totalAmout),
      currency: "USD",
      description: "2021"
    };
    paypalApi(data)
      .then(res => {
        return res.json();
      })
      .then(resJson => {
        if (resJson.success) {
          window.location.href = resJson.url;
        } else {
          this.setState({
            SpinnerToggle: false
          });
        }
      })

      .catch(err => {
        this.setState({
          SpinnerToggle: false
        });
      });
  }

  orderGenerateCode(subscribedItems = [], paymentData = []) {
    const { user } = this.props;
    const order = this.generateOrder(paymentData).then(res =>
      placeOrderInner(res)
    );
    console.log({
      order
    });
    const placeOrderInner = order => {
      let userid = null;
      if (user._id) {
        userid = user._id;
      }
      placeOrderApiNew(order)
        .then(res => res.json())
        .then(resJson => {
          if (resJson.success) {
            if (userid) {
              if (subscribedItems.length === 0) {
                this.setState(
                  {
                    modalData: orderPlacedSuccessfully,
                    modalTitle: orderPlacedModalTitle,
                    // modal: true,
                    clearCart: true,
                    SpinnerToggle: false
                  },
                  () => {
                    this.modalDismiss();
                  }
                );
                // setTimeout(() => {
                //   this.modalDismiss();
                // }, 5000);
              } else {
                subscribedItems.map((item, index) => {
                  const subsData = {
                    userid,
                    productid: item.combo ? item._id : item.productid._id,
                    productmeta: item._id,
                    duration: item.subscribedTime + " months",
                    quantity: parseInt(item.qty.value),
                    deliverydate: Date.now(),
                    orderid: resJson.order._id
                  };

                  addSubscribeToBackendApi(subsData)
                    .then(res => res.json())
                    .then(resJson => {
                      if (resJson.status) {
                        if (subscribedItems.length - 1 <= index) {
                          this.setState({
                            modalData: orderPlacedSuccessfully,
                            modalTitle: orderPlacedModalTitle,
                            modal: true,
                            clearCart: true,
                            SpinnerToggle: false
                          });
                          setTimeout(() => {
                            this.modalDismiss();
                          }, 5000);
                        }
                      }
                    });
                  return null;
                });
              }
            } else {
              this.setState({
                modalData: orderPlacedSuccessfully,
                modalTitle: orderPlacedModalTitle,
                modal: true,
                clearCart: true,
                SpinnerToggle: false
              });
              setTimeout(() => {
                this.modalDismiss();
              }, 5000);
            }
          }
        })
        .catch(err => {
          console.log({
            err
          });
          this.setState({
            modalData: someThingWrong,
            modalTitle: wrongModalTitle,
            modal: true,
            SpinnerToggle: false
          });
        });
    };
  }
  saveAddressA = () => {
    console.log("a start");
    const {
      billing_first_name: firstname,
      billing_last_name: lastname,
      billing_email_name: email,
      billing_zip_code: zip,
      billing_phone_name: phone,
      billing_address_name_01: address,
      selectedCountry: country,
      selectedCity: state,
      billing_address_town: city
    } = this.state;
    const { user } = this.props;
    const newAddress = {
      firstname,
      lastname,
      email,
      zip,
      phone,
      country,
      state,
      city,
      address
    };
    if (user && user.userMetaObj) {
      if (user.userMetaObj.shippingdetails) {
        const { address } = user.userMetaObj.shippingdetails;
        if (address) {
          const flag = address.find(el => {
            const {
              id,
              addressType,
              // firstname,
              // lastname,
              isDefault,
              ...rest
            } = el;
            console.log({
              newAddress,
              el
            });
            return Object.keys({ ...rest }).every(elx => {
              console.log({
                el1: el[elx],
                el2: newAddress[elx],
                elx
              });
              return el[elx].trim() === newAddress[elx].trim();
            });
          });
          if (!flag) {
            console.log("asdfasdf");
            const oldAddresses = this.props.address.address || [];
            this.props.addAddress(
              user._id,
              {
                ...newAddress,
                id: new Date().getTime()
              },
              this.props.address,
              oldAddresses
            );
          }
          console.log({
            flag
          });
        } else {
          console.log("else else else");
          const oldAddresses = this.props.address.address || [];
          this.props.addAddress(
            user._id,
            {
              ...newAddress,
              id: new Date().getTime()
            },
            this.props.address,
            oldAddresses
          );
        }
      } else {
        const oldAddresses = this.props.address.address || [];
        this.props.addAddress(
          user._id,
          {
            ...newAddress,
            id: new Date().getTime()
          },
          this.props.address,
          oldAddresses
        );
      }
    }
  };
  saveAddressB = () => {
    const {
      shipping_first_name: firstname,
      shipping_last_name: lastname,
      shipping_email_name: email,
      shipping_zip_code: zip,
      shipping_phone_name: phone,
      shipping_address_name_01: address,
      selectedShippingCountry: country,
      selectedShippingCity: state,
      shipping_address_town: city
    } = this.state;
    const { user } = this.props;
    const newAddress = {
      firstname,
      lastname,
      email,
      zip,
      phone,
      country,
      state,
      city,
      address
    };
    if (user && user.userMetaObj) {
      if (user.userMetaObj.shippingdetails) {
        const { address } = user.userMetaObj.shippingdetails;
        if (address) {
          const flag = address.find(el => {
            const {
              id,
              addressType,
              // firstname,
              // lastname,
              isDefault,
              ...rest
            } = el;
            console.log({
              newAddress,
              el
            });
            return Object.keys({ ...rest }).every(elx => {
              console.log({
                el1: el[elx],
                el2: newAddress[elx],
                elx
              });
              return el[elx].trim() === newAddress[elx].trim();
            });
          });
          if (!flag) {
            console.log("asdfasdf");
            const oldAddresses = this.props.address.address || [];
            this.props.addAddress(
              user._id,
              {
                ...newAddress,
                id: new Date().getTime()
              },
              this.props.address,
              oldAddresses
            );
          }
          console.log({
            flag
          });
        } else {
          const oldAddresses = this.props.address.address || [];
          this.props.addAddress(
            user._id,
            {
              ...newAddress,
              id: new Date().getTime()
            },
            this.props.address,
            oldAddresses
          );
        }
      } else {
        const oldAddresses = this.props.address.address || [];
        this.props.addAddress(
          user._id,
          {
            ...newAddress,
            id: new Date().getTime()
          },
          this.props.address,
          oldAddresses
        );
      }
    }
  };
  saveAddressC = () => {
    const {
      billing_first_name: firstname1,
      billing_last_name: lastname1,
      billing_email_name: email1,
      billing_zip_code: zip1,
      billing_phone_name: phone1,
      billing_address_name_01: address1,
      selectedCountry: country1,
      selectedCity: state1,
      billing_address_town: city1,

      shipping_first_name: firstname,
      shipping_last_name: lastname,
      shipping_email_name: email,
      shipping_zip_code: zip,
      shipping_phone_name: phone,
      shipping_address_name_01: address,
      selectedShippingCountry: country,
      selectedShippingCity: state,
      shipping_address_town: city
    } = this.state;
    const { user } = this.props;
    const newAddress1 = {
      firstname: firstname1,
      lastname: lastname1,
      email: email1,
      zip: zip1,
      phone: phone1,
      country: country1,
      state: state1,
      city: city1,
      address: address1
    };
    const newAddress = {
      firstname,
      lastname,
      email,
      zip,
      phone,
      country,
      state,
      city,
      address
    };
    if (user && user.userMetaObj) {
      if (user.userMetaObj.shippingdetails) {
        const { address } = user.userMetaObj.shippingdetails;
        if (address) {
          const flag1 = address.find(el => {
            const {
              id,
              addressType,
              // firstname,
              // lastname,
              isDefault,
              ...rest
            } = el;
            console.log({
              newAddress1,
              el
            });
            return Object.keys({ ...rest }).every(elx => {
              console.log({
                el1: el[elx],
                el2: newAddress1[elx],
                elx
              });
              return el[elx].trim() === newAddress1[elx].trim();
            });
          });
          const flag = address.find(el => {
            const {
              id,
              addressType,
              // firstname,
              // lastname,
              isDefault,
              ...rest
            } = el;
            console.log({
              newAddress,
              el
            });
            return Object.keys({ ...rest }).every(elx => {
              console.log({
                el1: el[elx],
                el2: newAddress[elx],
                elx
              });
              return el[elx].trim() === newAddress[elx].trim();
            });
          });

          if (!flag || !flag1) {
            const newAddressArr = [
              flag
                ? null
                : {
                  ...newAddress,
                  id: new Date().getTime()
                },
              flag1
                ? null
                : {
                  ...newAddress1,
                  id: new Date().getTime() + 1
                }
            ];
            const oldAddresses = this.props.address.address || [];
            this.props.addAddress(
              user._id,
              newAddressArr,
              this.props.address,
              oldAddresses
            );
          }
          console.log({
            flag
          });
        } else {
          const newAddressArr = [
            {
              ...newAddress,
              id: new Date().getTime()
            },
            {
              ...newAddress1,
              id: new Date().getTime() + 1
            }
          ];
          const oldAddresses = this.props.address.address || [];
          this.props.addAddress(
            user._id,
            newAddressArr,
            this.props.address,
            oldAddresses
          );
        }
      } else {
        const newAddressArr = [
          {
            ...newAddress,
            id: new Date().getTime()
          },
          {
            ...newAddress1,
            id: new Date().getTime() + 1
          }
        ];
        const oldAddresses = this.props.address.address || [];
        this.props.addAddress(
          user._id,
          newAddressArr,
          this.props.address,
          oldAddresses
        );
      }
    }
  };
  placeOrder() {
    // if (!this.validateOnSubmit()) {
    const cardDetails = this.state.stripePaymentData;

    setTimeout(() => {
      console.log({
        flag: this.validateOnSubmit()
      });
      if (!this.validateOnSubmit()) {
        // old payment methods
        // ************** code for check paymetn method start ****************************..
        const order = this.generateOrder("", true);
        const {
          isDefaultPayment,
          saveAddress1,
          saveAddress2,
          sameShipping
        } = this.state;

        if (sameShipping) {
          if (saveAddress1) console.log("A");
          this.saveAddressA();
        } else {
          if (saveAddress1 && saveAddress2) {
            this.saveAddressC();
            console.log("C");
          } else {
            if (saveAddress2) {
              console.log("B");
              this.saveAddressB();
            } else if (saveAddress1) {
              console.log("A");
              this.saveAddressA();
            }
          }
        }

        if (isDefaultPayment) {
          this.authorizeProfilePayment(order);
        } else {
          switch (this.state.paymentMethod) {
            case "stripe":
              if (
                cardDetails &&
                cardDetails.cardNumber.length > 0 &&
                cardDetails.cvNumber.length > 0 &&
                cardDetails.expDate.length > 0
              ) {
                this.setState({
                  stripePaymentErrorResponse: ""
                });
                this.setState({
                  SpinnerToggle: true
                });
                this.authorizePayment(order);
              } else {
                this.setState({
                  stripePaymentErrorResponse: allFieldReq
                });
              }

              break;
            case "cheque":
              this.authorizeBankPayment(order);
              break;
            default:
              placeOrderApiNew(order)
                .then(res => res.json())
                .then(resJson => {
                  if (resJson.success) {
                    this.setState(
                      {
                        modalData: orderPlacedSuccessfully,
                        modalTitle: orderPlacedModalTitle,
                        // modal: true,
                        clearCart: true
                      },
                      () => {
                        this.modalDismiss();
                      }
                    );
                  }
                })
                .catch(err => {
                  this.setState({
                    modalData: someThingWrong,
                    modalTitle: wrongModalTitle,
                    modal: true
                  });
                });
              break;
          }
        }
      }
    }, 500);
    // }
  }
  handleSameShipping(e) {
    this.setState({
      sameShipping: e.target.checked
    });
    setTimeout(() => {
      if (!this.validateOnDisable()) {
        this.shippingPriceGetMethod();
        this.setState({
          mehtodShippingMethodDisable: false
        });
      } else {
        const { setShippingCharge } = this.props;
        setShippingCharge("", this.props.cart, this.props.user.userMetaId);
        this.setState({
          mehtodShippingMethodDisable: true,
          mehtodPaymentMethodDisable: true
        });
      }
    }, 300);
  }
  toggleSaveAddress1 = () => {
    this.setState(prevState => ({
      saveAddress1: !prevState.saveAddress1
    }));
  };
  toggleSaveAddress2 = () => {
    this.setState(prevState => ({
      saveAddress2: !prevState.saveAddress2
    }));
  };
  stripeReturnData(res) {
    this.setState(
      {
        stripePaymentData: res,
        stripePaymentError: false,
        stripePaymentErrorResponse: ""
      },
      () => {
        this.stripCardValidate();
      }
    );
  }
  onTextChange = e => {
    const { value, name } = e.target;
    if (this.checkValidateTime) clearTimeout(this.checkValidateTime);
    let type = "";
    if (e.target.attributes["data-validate"])
      type = e.target.attributes["data-validate"].value;

    let pattern = null;
    if (e.target.attributes["data-pattern"])
      pattern = e.target.attributes["data-pattern"].value;

    let match = null;
    if (e.target.attributes["data-match"])
      match = e.target.attributes["data-match"].value;

    let newValue = value;

    if (pattern) {
      newValue = value.replace(regExReplace[pattern], "");
    }

    this.setState(
      {
        [name]: newValue
      },
      () => {
        const { isError, errorMsg } = fieldValidation(value, type, match);
        this.setState(
          {
            [name + "_err"]: isError,
            [name + "_errMsg"]: errorMsg
          },
          () => {
            if (
              name === "accName" ||
              name === "routingType" ||
              name === "accountNumber"
            ) {
              this.checkValidateTime = setTimeout(() => {
                const validateArr = [
                  {
                    name: "accName",
                    check: "required"
                  },
                  {
                    name: "routingType",
                    check: "required, number, routingNumber"
                  },
                  {
                    name: "accountNumber",
                    check: "required, number"
                  }
                ];
                validateArr.map(el =>
                  this.fieldValidationBankWioutError(
                    el.name,
                    el.check,
                    el.match && this.state[el.match]
                  )
                );
                if (
                  validateArr.every(el => {
                    if (this.state[el.name + "_err2"] === false) return true;
                    return false;
                  })
                ) {
                  this.setState({
                    methodReviewYourOrderDisable: false
                  });
                } else {
                  this.setState({
                    methodReviewYourOrderDisable: true
                  });
                }
              }, 200);
            }
          }
        );
      }
    );
  };

  onSubmit = async order => {
    const validateArr = [
      {
        name: "accName",
        check: "required"
      },
      {
        name: "routingType",
        check: "required, number, routingNumber"
      },
      {
        name: "accountNumber",
        check: "required, number"
      },
      {
        name: "drivingLicense",
        check: "required"
      }
    ];
    await validateArr.map(el =>
      this.fieldValidationBank(
        el.name,
        el.check,
        el.match && this.state[el.match]
      )
    );

    if (
      validateArr.every(el => {
        if (this.state[el.name + "_err"] === false) return true;

        return false;
      })
    ) {
      const bank = {
        minPayAmt: this.state.minPayAmt,
        currency: this.state.currency,
        accName: this.state.accName,
        routingType: this.state.routingType,
        accountNumber: this.state.accountNumber,
        accountNumberConfirm: this.state.accountNumberConfirm,
        drivingLicense: this.state.drivingLicense,
        dlState: this.state.dlState
      };
      this.setState({
        SpinnerToggle: true
      });
      console.log("testingggg", this.state.SpinnerToggle);

      order.then(res => {
        const sendAbleOrder = {
          ...res,
          bank
        };
        this.finalOrderSubmit(placeOrderApiNew(sendAbleOrder));
      });
    }
    await console.log("Working");
  };
  fieldValidationBankWioutError(field, type, match) {
    const {
      isError
      // errorMsg
    } = fieldValidation(this.state[field], type, match);
    this.setState({
      [field + "_err2"]: isError
    });
  }
  fieldValidationBank(field, type, match) {
    const { isError, errorMsg } = fieldValidation(
      this.state[field],
      type,
      match
    );

    this.setState({
      [field + "_err"]: isError,
      [field + "_errMsg"]: errorMsg
    });
  }

  stripCardValidate = () => {
    const cardDetails = this.state.stripePaymentData;
    const isValidCard = card => {
      const valid = validator.isCreditCard(card);
      console.log({
        valid,
        card
      });
    };

    if (
      cardDetails &&
      cardDetails.cardNumber &&
      cardDetails.cardNumber.length > 10 &&
      cardDetails.cvNumber &&
      cardDetails.cvNumber.length > 2 &&
      cardDetails.expDate &&
      cardDetails.expDate.length > 4
    ) {
      isValidCard(cardDetails.cardNumber);

      const valueArr = cardDetails.expDate.split("/");
      const month = parseInt(valueArr[0]);
      const year = parseInt(`20${valueArr[1]}`);
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      if (
        month > 12 ||
        year < currentYear ||
        (month < currentMonth && year <= currentYear)
      ) {
        this.setState({
          methodReviewYourOrderDisable: true
        });
      } else {
        this.setState({
          methodReviewYourOrderDisable: false
        });
      }
    } else {
      this.setState({
        methodReviewYourOrderDisable: true
      });
    }
  };
  stripeCheckValidation() {
    const { stripePaymentData } = this.state;

    const stripePaymentError = basicFunction.stripeCheckValidation(
      stripePaymentData
    );

    this.setState({
      stripePaymentError: !stripePaymentError
    });
    return stripePaymentError;
  }
  changeCollapse = (value, paymentMethod) => {
    const { openPaymentAccordion } = this.state;
    if (openPaymentAccordion === value) {
      this.setState(
        {
          openPaymentAccordion: null
          // paymentMethod: null,
        },
        () => {
          const { paymentMethod } = this.state;
          if (paymentMethod === "stripe" || paymentMethod === "cheque") {
            this.setState({
              methodReviewYourOrderDisable: true
            });
          }
        }
      );
    } else {
      this.setState({
        openPaymentAccordion: value,
        paymentMethod,
        isDefaultPayment: false,
        methodReviewYourOrderDisable: true
      });
    }
  };
  render() {
    const {
      sameShipping,
      modal,
      modalTitle,
      modalData,
      selectedCountry,
      selectedShippingCountry,

      billing_first_name,
      billing_first_nameErr,
      billing_first_nameErrMsg,
      billing_last_name,
      billing_last_nameErr,
      billing_last_nameErrMsg,
      billing_email_name,
      billing_email_nameErr,
      billing_email_nameErrMsg,
      billing_phone_name,
      billing_phone_nameErr,
      billing_phone_nameErrMsg,
      billing_address_name_01Err,
      billing_address_townErr,
      selectedCountryErr,

      billing_zip_code,
      billing_zip_codeErr,
      billing_zip_codeErrMsg,

      shipping_first_name,
      shipping_first_nameErr,
      shipping_first_nameErrMsg,
      shipping_last_name,
      shipping_last_nameErr,
      shipping_last_nameErrMsg,
      shipping_email_name,
      shipping_email_nameErr,
      shipping_email_nameErrMsg,
      shipping_phone_name,
      shipping_phone_nameErr,
      shipping_phone_nameErrMsg,
      shipping_zip_code,
      shipping_zip_codeErr,
      shipping_zip_codeErrMsg,
      addressData,
      addressData2,
      shipping_address_name_01Err,
      shipping_address_townErr,
      selectedShippingCountryErr,
      selectedShippingCityErr,
      selectedCityErr,
      shippingType,
      SpinnerToggle,
      SubscriptionCheckout,
      mehtodShippingMethodDisable,
      methodReviewYourOrderDisable,
      mehtodPaymentMethodDisable,
      countryUSAError,

      accName,
      routingType,
      accountNumber,
      accountNumber_err,
      accountNumber_errMsg,
      accName_err,
      accName_errMsg,
      routingType_err,
      routingType_errMsg,
      // drivingLicense,
      // drivingLicense_err,
      // drivingLicense_errMsg,
      // dlState,
      accountType,
      // isDefaultPayment,
      saveAddress1,
      saveAddress2
    } = this.state;
    const { cards, user } = this.props;
    const savedAddresses = this.props.address &&
      this.props.address.address &&
      this.props.address.address.length > 0 &&
      [...this.props.address.address.filter(el => el.isDefault),
      ...this.props.address.address.filter(el => !el.isDefault)]
    return (
      <div className="fullLoader secondbg pt-5">
        {SpinnerToggle && <Lodar />}
        <div className="container ">
          <div className="checkout-conatiner ">
            <div className="row">
              <div className="col-md-6">
                <div className="express-checkout">
                  <h1 className="product-title">{checkoutPageTitle}</h1>
                  <p>{checkoutPageSubTitle}</p>
                </div>
              </div>
              <div className="col-md-6 text-md-right text-left">
                <div className="chckout-contact-no">
                  <Icon icon={phone} />
                  <span>{contactNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container ">
          <div className="checkout-conatiner ">
            <div className="row purchase-details secondbg">
              <div className="col-lg-4 billing ">
                <div className="billing-address-text p-md-4 p-3 shadow checkout-shadow-color-padding">
                  <h2 class="product-title">{billingAddressMsg}</h2>
                  {
                    this.props.address && this.props.address.address &&
                    this.props.address.address.length > 0 &&
                    <div className="mb-2">
                      <h5 className="mb-n2 mt-4">
                        <b>Your saved Addresses</b>
                      </h5>
                      <hr class="mb-4" />
                      {savedAddresses.map((address, index) => {
                        const {
                          id,
                          firstname,
                          lastname,
                        } = address
                        const labelId = `billing_address_select${id}`
                        if (index > 2) {
                          return null
                        }
                        return (
                          <AddressRadio
                            checked={
                              this.state.billing_address_select === labelId
                            }
                            onChange={(e) => {
                              this.changeBillingAddressRadio(e, id)
                            }}
                            name="billing_address_select"
                            key={id}
                            id={labelId}
                            title={firstname + " " + lastname}
                            address={address}
                          />
                        )
                      })}
                      <Collapse
                        isOpen={!this.state.billAddShowLess}
                      >
                        {savedAddresses.map((address, index) => {
                          const {
                            id,
                            firstname,
                            lastname
                          } = address
                          const labelId = `billing_address_select${id}`
                          if (index > 2) {
                            return (
                              <AddressRadio
                                checked={
                                  this.state.billing_address_select === labelId
                                }
                                onChange={(e) => {
                                  this.changeBillingAddressRadio(e, id)
                                }}
                                name="billing_address_select"
                                key={id}
                                id={labelId}
                                title={firstname + " " + lastname}
                                address={address}
                              />
                            )
                          }
                          return null
                        })}
                      </Collapse>
                      {
                        this.props.address.address.length > 2 && <div>
                          <p
                            className="d-inline-block cursor-pointer hover-text-line"
                            onClick={() => {
                              this.setState(prevState => ({
                                billAddShowLess: !prevState.billAddShowLess
                              }))
                            }}
                          >{this.state.billAddShowLess ? <span>View More <Icon icon={ic_add} /></span> : <span>View Less <Icon icon={ic_clear} /></span>}

                          </p>
                        </div>
                      }
                    </div>
                  }
                  <p
                    onClick={this.changeBillAddCollapse}
                    className="cursor-pointer mb-2"
                  >
                    <span className="pr-2">
                      {this.state.openAddFrmBill ? (
                        <Icon icon={ic_keyboard_arrow_up} />
                      ) : (
                          <Icon icon={ic_keyboard_arrow_down} />
                        )}
                    </span>{" "}
                    Add a Address
                    </p>
                  <Collapse
                    isOpen={this.state.openAddFrmBill}
                  >
                    <AddressForm
                      // title={billingAddressMsg}
                      name={billing_first_name}
                      nameId="billing_first_name"
                      nameErr={billing_first_nameErr}
                      nameErrMsg={
                        billing_first_nameErrMsg === "can't be empty"
                          ? firstNameMissingErrMsg
                          : billing_first_nameErrMsg
                      }
                      lastName={billing_last_name}
                      lastNameId="billing_last_name"
                      lastNameErr={billing_last_nameErr}
                      lastNameErrMsg={
                        billing_last_nameErrMsg === "can't be empty"
                          ? lastNameMissingErrMsg
                          : billing_last_nameErrMsg
                      }
                      email={billing_email_name}
                      emailId="billing_email_name"
                      emailErr={billing_email_nameErr}
                      emailErrMsg={
                        billing_email_nameErrMsg === "can't be empty"
                          ? emailMissingErrMsg
                          : emailNotValidErrMsg
                      }
                      zip={billing_zip_code}
                      zipId="billing_zip_code"
                      zipErr={billing_zip_codeErr}
                      zipErrMsg={
                        billing_zip_codeErrMsg === "can't be empty"
                          ? zipMissingErrMsg
                          : zipValidErrMsg
                      }
                      phone={billing_phone_name}
                      phoneId="billing_phone_name"
                      phoneErr={billing_phone_nameErr}
                      phoneErrMsg={
                        billing_phone_nameErrMsg === "can't be empty"
                          ? phoneMissingErrMsg
                          : phoneNotValidErrMsg
                      }
                      onPhoneChange={e => {
                        this.onPhoneChange(e, "billing_phone_name");
                      }}
                      onChange={this.onAddressChange}
                      onAddressChange={this.billingaddressautoFill}
                      addressData={addressData}
                      addressErr={[
                        billing_address_name_01Err,
                        billing_address_townErr,
                        selectedCountryErr,
                        selectedCityErr,
                        countryUSAError
                      ]}
                    />
                    {user._id && (
                      <CheckBox
                        label={"Save this address"}
                        id="saveAddress1"
                        onChange={this.toggleSaveAddress1}
                        value={saveAddress1}
                        checked={saveAddress1}
                      />
                    )}
                  </Collapse>
                  <hr />
                  <br />
                  {/* <span onClick={this.saveAddressA}>test</span> */}
                  <CheckBox
                    label={sameShippingMsg}
                    id="subscribeCheckBox"
                    onChange={this.handleSameShipping}
                    value={sameShipping}
                    checked={sameShipping}
                  />
                  {!sameShipping && (
                    <div>
                      <h2 class="product-title mt-5">{shippingAddressMsg}</h2>
                      {
                        this.props.address && this.props.address.address &&
                        this.props.address.address.length > 0 &&
                        <div className="mb-3">
                          <h5 className="mb-n2 mt-4">
                            <b>Your saved Addresses</b>
                          </h5>
                          <hr class="mb-4" />
                          {
                            savedAddresses.map((address, index) => {
                              const {
                                id,
                                firstname,
                                lastname,
                              } = address
                              const labelId = `shipping_address_select${id}`
                              if (index > 2) {
                                return null
                              }
                              return (
                                <AddressRadio
                                  checked={
                                    this.state.shipping_address_select === labelId
                                  }
                                  onChange={(e) => {
                                    this.changeShippingAddressRadio(e, id)
                                  }}
                                  name="shipping_address_select"
                                  key={id}
                                  id={labelId}
                                  title={firstname + " " + lastname}
                                  address={address}
                                />
                              )
                            })
                          }
                          <Collapse
                            isOpen={!this.state.shipAddShowLess}
                          >
                            {savedAddresses.map((address, index) => {
                              const {
                                id,
                                firstname,
                                lastname
                              } = address
                              const labelId = `shipping_address_select${id}`
                              if (index > 2) {
                                return (
                                  <AddressRadio
                                    checked={
                                      this.state.shipping_address_select === labelId
                                    }
                                    onChange={(e) => {
                                      this.changeShippingAddressRadio(e, id)
                                    }}
                                    name="shipping_address_select"
                                    key={id}
                                    id={labelId}
                                    title={firstname + " " + lastname}
                                    address={address}
                                  />
                                )
                              }
                              return null
                            })}
                          </Collapse>
                          {
                            this.props.address.address.length > 2 && <div>
                              <p
                                className="d-inline-block cursor-pointer hover-text-line"
                                onClick={() => {
                                  this.setState(prevState => ({
                                    shipAddShowLess: !prevState.shipAddShowLess
                                  }))
                                }}
                              >{this.state.shipAddShowLess ? <span>View More <Icon icon={ic_add} /></span> : <span>View Less <Icon icon={ic_clear} /></span>}

                              </p>
                            </div>
                          }
                        </div>
                      }
                      <p
                        onClick={this.changeShipAddCollapse}
                        className="cursor-pointer mb-2"
                      >
                        <span className="pr-2">
                          {this.state.openAddFrmShip ? (
                            <Icon icon={ic_keyboard_arrow_up} />
                          ) : (
                              <Icon icon={ic_keyboard_arrow_down} />
                            )}
                        </span>{" "}
                        Add a Address
                       </p>
                      <Collapse
                        isOpen={this.state.openAddFrmShip}
                      >
                        <AddressForm
                          // title={shippingAddressMsg}
                          name={shipping_first_name}
                          nameId="shipping_first_name"
                          nameErr={shipping_first_nameErr}
                          nameErrMsg={
                            shipping_first_nameErrMsg === "can't be empty"
                              ? firstNameMissingErrMsg
                              : shipping_first_nameErrMsg
                          }
                          lastName={shipping_last_name}
                          lastNameId="shipping_last_name"
                          lastNameErr={shipping_last_nameErr}
                          lastNameErrMsg={
                            shipping_last_nameErrMsg === "can't be empty"
                              ? lastNameMissingErrMsg
                              : shipping_last_nameErrMsg
                          }
                          email={shipping_email_name}
                          emailId="shipping_email_name"
                          emailErr={shipping_email_nameErr}
                          emailErrMsg={
                            shipping_email_nameErrMsg === "can't be empty"
                              ? emailMissingErrMsg
                              : emailNotValidErrMsg
                          }
                          zip={shipping_zip_code}
                          zipId="shipping_zip_code"
                          zipErr={shipping_zip_codeErr}
                          zipErrMsg={
                            shipping_zip_codeErrMsg === "can't be empty"
                              ? zipMissingErrMsg
                              : zipValidErrMsg
                          }
                          phone={shipping_phone_name}
                          phoneId="shipping_phone_name"
                          phoneErr={shipping_phone_nameErr}
                          phoneErrMsg={
                            shipping_phone_nameErrMsg === "can't be empty"
                              ? phoneMissingErrMsg
                              : phoneNotValidErrMsg
                          }
                          onPhoneChange={e => {
                            this.onPhoneChange(e, "shipping_phone_name");
                          }}
                          onChange={this.onAddressChange}
                          onAddressChange={this.shippingaddressautoFill}
                          addressData={addressData2}
                          addressErr={[
                            shipping_address_name_01Err,
                            shipping_address_townErr,
                            selectedShippingCountryErr,
                            selectedShippingCityErr
                          ]}
                        />
                      </Collapse>
                      <hr />
                      {user._id && (
                        <CheckBox
                          label={"Save this address"}
                          id="saveAddress2"
                          onChange={this.toggleSaveAddress2}
                          value={saveAddress2}
                          checked={saveAddress2}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-4 col-md-6 sipping ">
                <div
                  className={classNames(
                    "shipping-address-text p-md-4 p-3 shadow checkout-shadow-color-padding",
                    {
                      disableFormField:
                        mehtodShippingMethodDisable || countryUSAError
                    }
                  )}
                >
                  <h2 className="product-title mb-4">{selectCarrierMsg}</h2>
                  {this.state.isShippingLoading && (
                    <div className="box-loader" />
                  )}
                  {this.state.shippingErrMsg !== null &&
                    !this.state.isShippingLoading && (
                      <div className="has-input has-error pt-4">
                        <p className="error">{this.state.shippingErrMsg}</p>
                      </div>
                    )}
                  {this.state.shippingErrMsg === null &&
                    !this.state.isShippingLoading && (
                      <div className="order-summary-row flex-column nbr lr">
                        <div className="option-selector w-100">
                          <div className="has-input has-checkbox-input">
                            <div className="order-summary-row nbr lr">
                              <div className="option-selector">
                                <div className="has-input has-checkbox-input">
                                  {this.state.shippingRates &&
                                    this.state.shippingRates.length > 0
                                    ? this.state.shippingRates
                                      .sort((a, b) => a.rate - b.rate)
                                      .map((key, index) => {
                                        return (
                                          <CheckBox
                                            key={index}
                                            type="checkbox"
                                            checked={
                                              this.state.rateId === key.id
                                            }
                                            id={"standardShipping" + index}
                                            data-value={key.rate}
                                            name={"shippingType"}
                                            value={key.id}
                                            onChange={() => {
                                              // console.log({value, id, key})
                                              this.handleShippingTypeChange(
                                                key
                                              );
                                            }}
                                            labelClass="d-flex"
                                            // checked= { index === 0 ? true : false}
                                            label={
                                              <span
                                                style={{
                                                  wordBreak: "break-word"
                                                }}
                                              >
                                                {basicFunction.currancyAddWithNumber(
                                                  parseFloat(key.customRate)
                                                )}{" "}
                                                ({key.customName})
                                                  <br />
                                                {key &&
                                                  key.est_delivery_days && (
                                                    <span
                                                      style={{
                                                        fontWeight: "500"
                                                      }}
                                                    >
                                                      Estimated Delivery{" "}
                                                      {basicFunction.shippingStringRate(
                                                        key
                                                      )}
                                                    </span>
                                                  )}
                                              </span>
                                            }
                                          />
                                        );
                                      })
                                    : ""}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {this.state.shippingRates &&
                          this.state.shippingRates.length > 0 && (
                            <div>
                              <label
                                style={{
                                  color: "#F44336",
                                  fontWeight: "500"
                                }}
                                className="f-12 pb-2"
                              >
                                {parseFloat(this.props.cart.subTotal) <
                                  shippingFreeAfter &&
                                  `Shop for $${(
                                    shippingFreeAfter - this.props.cart.subTotal
                                  ).toFixed(
                                    2
                                  )} more to qualify for free shipping`}
                              </label>
                            </div>
                          )}
                      </div>
                    )}

                  {shippingType === "express" &&
                    basicFunction.showExportMsg(
                      shippingType,
                      sameShipping,
                      selectedCountry,
                      selectedShippingCountry
                    ) && (
                      <div className="has-input has-error">
                        <br />
                        <p className="error">
                          {" "}
                          <Icon icon={infoCircle} /> We've noticed that
                          customers in your country have been asked by customs
                          to pay import duties or taxes when ordering from
                          {" " + projectName + " "} and selecting Express
                          shipping options.
                        </p>
                      </div>
                    )}
                </div>

                <div
                  className={classNames(
                    "p-md-4 p-3 shadow checkout-shadow-color-padding",
                    {
                      disableFormField: mehtodPaymentMethodDisable // || isDefaultPayment
                    }
                  )}
                >
                  <h2 className="product-title mb-5">{paymentMethodMsg}</h2>
                  {/* <StripePayment
                    stripepaymenterror={this.state.stripePaymentError || ""}
                    stripereturndata={this.stripeReturnData}
                    stripepaymenterrorresponse={
                      this.state.stripePaymentErrorResponse
                    }
                    stripeexpresssavedata={this.state.expressCarddetails}
                  /> */}

                  {/* old payment options */}
                  {cards && cards.filter(el => el.creditCard).length > 0 && (
                    <div className="mb-5">
                      <div
                        // className="checkout-collapse-heading cursor-pointer d-flex justify-content-between"
                        className="cursor-pointer d-flex justify-content-between"
                      // onClick={() => {
                      //   this.changeCollapse("savedCard", null);
                      // }}
                      >
                        <h5 className="mb-n2">
                          <b>Your saved cards</b>
                        </h5>
                        {/* {this.state.openPaymentAccordion === "savedCard" ? (
                          <Icon icon={ic_close} />
                        ) : (
                          <Icon icon={ic_add} />
                        )} */}
                      </div>
                      <hr />
                      <Collapse
                        // isOpen={this.state.openPaymentAccordion === "savedCard"}
                        isOpen={true}
                      >
                        {cards &&
                          cards
                            .filter(el => el.creditCard)
                            .map((el, index) => {
                              const {
                                customerPaymentProfileId,
                                creditCard: { cardType, cardNumber }
                              } = el;
                              const lastFour = cardNumber.split("X").join("");
                              return (
                                <div className="mt-2" key={index}>
                                  <input
                                    type="radio"
                                    id={customerPaymentProfileId}
                                    name="paymentMethod"
                                    value={customerPaymentProfileId}
                                    checked={
                                      this.state.paymentMethod ===
                                        `${customerPaymentProfileId}`
                                        ? true
                                        : false
                                    }
                                    onChange={e => {
                                      this.paymentMethod(e, el);
                                    }}
                                  />
                                  <label
                                    htmlFor={customerPaymentProfileId}
                                    className="checkout-payment-select"
                                  >
                                    {`${
                                      cardType ? cardType : "Card"
                                      } ending in ${lastFour}`}
                                  </label>
                                  <br />
                                </div>
                              );
                            })}
                        <p
                          onClick={() => {
                            this.changeCollapse("stripe", "stripe");
                          }}
                          className="cursor-pointer mb-2 mt-2"
                        >
                          <span className="pr-2">
                            {this.state.openPaymentAccordion === "stripe" ? (
                              <Icon icon={ic_keyboard_arrow_up} />
                            ) : (
                                <Icon icon={ic_keyboard_arrow_down} />
                              )}
                          </span>{" "}
                          Add a card
                        </p>
                        <Collapse
                          isOpen={this.state.openPaymentAccordion === "stripe"}
                        >
                          {(this.state.paymentMethod === "stripe" || true) && (
                            <div className="mt-2">
                              <StripePayment
                                // isDummy={isDefaultPayment}
                                noTitle={true}
                                stripepaymenterror={
                                  this.state.stripePaymentError || ""
                                }
                                stripereturndata={this.stripeReturnData}
                                stripepaymenterrorresponse={
                                  this.state.stripePaymentErrorResponse
                                }
                                stripeexpresssavedata={
                                  this.state.expressCarddetails
                                }
                              />
                              {user._id && (
                                <CheckBox
                                  id="saveCard"
                                  label="Save this Card"
                                  name="saveCard"
                                  checked={this.state.isSaveCard}
                                  onChange={() => {
                                    this.setState(prevState => ({
                                      isSaveCard: !prevState.isSaveCard
                                    }));
                                  }}
                                />
                              )}
                            </div>
                          )}
                        </Collapse>
                      </Collapse>
                    </div>
                  )}
                  {cards && cards.filter(el => el.bankAccount).length > 0 && (
                    <div className="mb-5">
                      <div
                        // className="checkout-collapse-heading cursor-pointer d-flex justify-content-between"
                        className="cursor-pointer d-flex justify-content-between"
                      // onClick={() => {
                      //   this.changeCollapse("savedAccount", null);
                      // }}
                      >
                        <h5 className="mb-n2">
                          <b>Your saved accounts</b>
                        </h5>
                        {/* {this.state.openPaymentAccordion === "savedAccount" ? (
                          <Icon icon={ic_close} />
                        ) : (
                          <Icon icon={ic_add} />
                        )} */}
                      </div>
                      <hr />
                      <Collapse
                        // isOpen={
                        //   this.state.openPaymentAccordion === "savedAccount"
                        // }
                        isOpen={true}
                      >
                        {cards &&
                          cards.filter(el => el.bankAccount).length > 0 && (
                            <div className="mt-2">
                              {/* <p className="mb-1">Your saved accounts</p> */}
                              {cards &&
                                cards
                                  .filter(el => el.bankAccount)
                                  .map((el, index) => {
                                    const {
                                      customerPaymentProfileId,
                                      bankAccount: {
                                        accountNumber
                                        // routingNumber
                                      }
                                    } = el;
                                    // const routingFour = routingNumber
                                    //   .split("X")
                                    //   .join("");
                                    const accountFour = accountNumber
                                      .split("X")
                                      .join("");
                                    return (
                                      <div
                                        className="d-flex align-items-baseline"
                                        key={index}
                                      >
                                        <input
                                          type="radio"
                                          id={customerPaymentProfileId}
                                          name="paymentMethod"
                                          value={customerPaymentProfileId}
                                          checked={
                                            this.state.paymentMethod ===
                                              `${customerPaymentProfileId}`
                                              ? true
                                              : false
                                          }
                                          onChange={e => {
                                            this.paymentMethod(e, el);
                                          }}
                                        />
                                        <label
                                          htmlFor={customerPaymentProfileId}
                                          className="checkout-payment-select"
                                        >
                                          {`Account ending in ${accountFour}`}
                                        </label>
                                        <br />
                                      </div>
                                    );
                                  })}
                            </div>
                          )}

                        <p
                          onClick={() => {
                            this.changeCollapse("cheque", "cheque");
                          }}
                          className="cursor-pointer mb-2 mt-2"
                        >
                          <span className="pr-2">
                            {this.state.openPaymentAccordion === "cheque" ? (
                              <Icon icon={ic_keyboard_arrow_up} />
                            ) : (
                                <Icon icon={ic_keyboard_arrow_down} />
                              )}
                          </span>{" "}
                          Add a account
                        </p>
                        <Collapse
                          isOpen={this.state.openPaymentAccordion === "cheque"}
                        >
                          {(this.state.paymentMethod === "cheque" || true) && (
                            <div className="col-lg-12 col-md-12 mt-2">
                              <div className="inside-form Larger ">
                                {/* <h3 className="product-title">Payment Details</h3> */}
                                {this.state.checkingResponseError && (
                                  <p class="alert alert-danger">
                                    {this.state.checkingResponseError}
                                  </p>
                                )}
                                <br />
                                <div className="w100 d-block pt-3 pb-3">
                                  <img
                                    src={imagePack.checkHelp}
                                    alt="routing number help"
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="row frm-details">
                                  <div className="col-md-12">
                                    <Input
                                      label="Name on Account*"
                                      name="accName"
                                      value={accName}
                                      onChange={this.onTextChange}
                                      dataValidate={["required"]}
                                      dataPattern=""
                                      maxLength="40"
                                      isError={accName_err}
                                      errorMsg={
                                        accName_errMsg &&
                                          accName_errMsg === "can't be empty"
                                          ? accountHolderMissingMsg
                                          : accountHolderNameValidMsg
                                      }
                                    />
                                  </div>
                                  <div className="col-md-12">
                                    <Input
                                      label="Bank Routing Number*"
                                      name="routingType"
                                      value={routingType}
                                      dataPattern="onlyNumber"
                                      placeholder="9 digits"
                                      dataValidate={[
                                        "number",
                                        "required",
                                        "routingNumber"
                                      ]}
                                      isError={routingType_err}
                                      onChange={this.onTextChange}
                                      maxLength={9}
                                      errorMsg={
                                        routingType_errMsg &&
                                          routingType_errMsg === "can't be empty"
                                          ? routingTypeMissingMsg
                                          : routingTypeValidMsg
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="row frm-details">
                                  <div className="col-md-12">
                                    <Input
                                      label="Checking Account Number*"
                                      name="accountNumber"
                                      value={accountNumber}
                                      dataPattern="onlyNumber"
                                      placeholder="Up to 17 digits"
                                      dataValidate={["number", "required"]}
                                      isError={accountNumber_err}
                                      maxLength={17}
                                      onChange={this.onTextChange}
                                      errorMsg={
                                        accountNumber_errMsg &&
                                          accountNumber_errMsg ===
                                          "can't be empty"
                                          ? accountNumberMissingMsg
                                          : accountNumberValidMsg
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="row frm-details">
                                  <div className="col-md-12">
                                    <div className="has-input">
                                      <label>Account Type*</label>
                                    </div>
                                    <SelectMulti
                                      id="accountType"
                                      styles={selectStyleSmall}
                                      value={accountType}
                                      isMulti={false}
                                      placeholder="Account Type"
                                      onChange={this.changeAccountType}
                                      options={accountTypeOpt}
                                    />
                                  </div>
                                </div>
                              </div>
                              <br />
                              {user._id && (
                                <CheckBox
                                  id="saveCard"
                                  label="Save this Account"
                                  name="saveCard"
                                  checked={this.state.isSaveCard}
                                  onChange={() => {
                                    this.setState(prevState => ({
                                      isSaveCard: !prevState.isSaveCard
                                    }));
                                  }}
                                />
                              )}
                            </div>
                          )}
                        </Collapse>
                      </Collapse>
                    </div>
                  )}
                  {((cards && cards.filter(el => el.creditCard).length < 1) ||
                    !cards) && (
                      <div className="mb-2">
                        <div
                          // className="checkout-collapse-heading cursor-pointer d-flex justify-content-between"
                          className=" mt-3 cursor-pointer d-flex justify-content-between"
                        // onClick={() => {
                        //  this.changeCollapse("stripe", "stripe");
                        // }}
                        >
                          <p
                            onClick={() => {
                              this.changeCollapse("stripe", "stripe");
                            }}
                            className="mb-2"
                          >
                            <span className="pr-2">
                              {this.state.openPaymentAccordion === "stripe" ? (
                                <Icon icon={ic_keyboard_arrow_up} />
                              ) : (
                                  <Icon icon={ic_keyboard_arrow_down} />
                                )}
                            </span>
                            <b> Pay with card</b>
                          </p>
                          {/* {this.state.openPaymentAccordion === "stripe" ? (
                        <Icon icon={ic_close} />
                      ) : (
                        <Icon icon={ic_add} />
                      )} */}
                        </div>
                        <Collapse
                          isOpen={this.state.openPaymentAccordion === "stripe"}
                        >
                          {this.state.paymentMethod === "stripe" && (
                            <div className="mt-2">
                              <StripePayment
                                // isDummy={isDefaultPayment}
                                noTitle={true}
                                stripepaymenterror={
                                  this.state.stripePaymentError || ""
                                }
                                stripereturndata={this.stripeReturnData}
                                stripepaymenterrorresponse={
                                  this.state.stripePaymentErrorResponse
                                }
                                stripeexpresssavedata={
                                  this.state.expressCarddetails
                                }
                              />
                              {user._id && (
                                <CheckBox
                                  id="saveCard"
                                  label="Save this Card"
                                  name="saveCard"
                                  checked={this.state.isSaveCard}
                                  onChange={() => {
                                    this.setState(prevState => ({
                                      isSaveCard: !prevState.isSaveCard
                                    }));
                                  }}
                                />
                              )}
                            </div>
                          )}
                        </Collapse>
                        <hr />
                      </div>
                    )}
                  {((cards && cards.filter(el => el.bankAccount).length < 1) ||
                    !cards) && (
                      <div className="mb-2 mt-5">
                        <div
                          // className="checkout-collapse-heading cursor-pointer d-flex justify-content-between"
                          className="cursor-pointer d-flex justify-content-between"
                        // onClick={() => {
                        //   this.changeCollapse("cheque", "cheque");
                        // }}
                        >
                          <p
                            onClick={() => {
                              this.changeCollapse("cheque", "cheque");
                            }}
                            className="mb-2"
                          >
                            <span className="pr-2">
                              {this.state.openPaymentAccordion === "cheque" ? (
                                <Icon icon={ic_keyboard_arrow_up} />
                              ) : (
                                  <Icon icon={ic_keyboard_arrow_down} />
                                )}
                            </span>
                            <b> Pay with account</b>
                          </p>
                          {/* {this.state.openPaymentAccordion === "cheque" ? (
                        <Icon icon={ic_close} />
                      ) : (
                        <Icon icon={ic_add} />
                      )} */}
                        </div>
                        <Collapse
                          isOpen={this.state.openPaymentAccordion === "cheque"}
                        >
                          {(this.state.paymentMethod === "cheque" || true) && (
                            <div className="col-lg-12 col-md-12 mt-2">
                              <div className="inside-form Larger ">
                                {/* <h3 className="product-title">Payment Details</h3> */}
                                {this.state.checkingResponseError && (
                                  <p class="alert alert-danger">
                                    {this.state.checkingResponseError}
                                  </p>
                                )}
                                <br />
                                <div className="w100 d-block pt-3 pb-3">
                                  <img
                                    src={imagePack.checkHelp}
                                    alt="routing number help"
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="row frm-details">
                                  <div className="col-md-12">
                                    <Input
                                      label="Name on Account*"
                                      name="accName"
                                      value={accName}
                                      onChange={this.onTextChange}
                                      dataValidate={["required"]}
                                      dataPattern=""
                                      maxLength="40"
                                      isError={accName_err}
                                      errorMsg={
                                        accName_errMsg &&
                                          accName_errMsg === "can't be empty"
                                          ? accountHolderMissingMsg
                                          : accountHolderNameValidMsg
                                      }
                                    />
                                  </div>
                                  <div className="col-md-12">
                                    <Input
                                      label="Bank Routing Number*"
                                      name="routingType"
                                      value={routingType}
                                      dataPattern="onlyNumber"
                                      placeholder="9 digits"
                                      dataValidate={[
                                        "number",
                                        "required",
                                        "routingNumber"
                                      ]}
                                      isError={routingType_err}
                                      onChange={this.onTextChange}
                                      maxLength={9}
                                      errorMsg={
                                        routingType_errMsg &&
                                          routingType_errMsg === "can't be empty"
                                          ? routingTypeMissingMsg
                                          : routingTypeValidMsg
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="row frm-details">
                                  <div className="col-md-12">
                                    <Input
                                      label="Checking Account Number*"
                                      name="accountNumber"
                                      value={accountNumber}
                                      dataPattern="onlyNumber"
                                      placeholder="Up to 17 digits"
                                      dataValidate={["number", "required"]}
                                      isError={accountNumber_err}
                                      maxLength={17}
                                      onChange={this.onTextChange}
                                      errorMsg={
                                        accountNumber_errMsg &&
                                          accountNumber_errMsg === "can't be empty"
                                          ? accountNumberMissingMsg
                                          : accountNumberValidMsg
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="row frm-details">
                                  <div className="col-md-12">
                                    <div className="has-input">
                                      <label>Account Type*</label>
                                    </div>
                                    <SelectMulti
                                      id="accountType"
                                      styles={selectStyleSmall}
                                      value={accountType}
                                      isMulti={false}
                                      placeholder="Account Type"
                                      onChange={this.changeAccountType}
                                      options={accountTypeOpt}
                                    />
                                  </div>
                                </div>
                              </div>
                              <br />
                              {user._id && (
                                <CheckBox
                                  id="saveCard"
                                  label="Save this Account"
                                  name="saveCard"
                                  checked={this.state.isSaveCard}
                                  onChange={() => {
                                    this.setState(prevState => ({
                                      isSaveCard: !prevState.isSaveCard
                                    }));
                                  }}
                                />
                              )}
                            </div>
                          )}
                        </Collapse>
                      </div>
                    )}
                  {/* <input
                    type="radio"
                    id="stripe"
                    name="paymentMethod"
                    value="stripe"
                    // defaultChecked={
                    //   this.state.paymentMethod === "stripe" ? true : false
                    // }
                    checked={
                      this.state.paymentMethod === "stripe" ? true : false
                    }
                    onChange={this.paymentMethod}
                  />
                  <label htmlFor="stripe" className="checkout-payment-select">
                    Pay with card
                  </label>
                  <br />
                  <input
                    type="radio"
                    id="Check"
                    value="cheque"
                    name="paymentMethod"
                    onChange={this.paymentMethod}
                  />
                  <label className="checkout-payment-select" htmlFor="Check">
                    Checking Account
                  </label>
                  <br /> */}
                  {this.state.paymentMethod && (
                    <div>
                      {/* {this.state.paymentMethod === "stripe" && (
                        <div>
                          <StripePayment
                            // isDummy={isDefaultPayment}
                            stripepaymenterror={
                              this.state.stripePaymentError || ""
                            }
                            stripereturndata={this.stripeReturnData}
                            stripepaymenterrorresponse={
                              this.state.stripePaymentErrorResponse
                            }
                            stripeexpresssavedata={
                              this.state.expressCarddetails
                            }
                          />
                          <CheckBox
                            id="saveCard"
                            label="Save this Card"
                            name="saveCard"
                            checked={this.state.isSaveCard}
                            onChange={() => {
                              this.setState(prevState => ({
                                isSaveCard: !prevState.isSaveCard
                              }));
                            }}
                          />
                        </div>
                      )} */}
                      {/* {this.state.paymentMethod === "cheque" && (
                        <div className="col-lg-12 col-md-12">
                          <div className="inside-form Larger ">
                            <h3 className="product-title">Payment Details</h3>
                            {this.state.checkingResponseError && (
                              <p class="alert alert-danger">
                                {this.state.checkingResponseError}
                              </p>
                            )}
                            <br />
                            <div className="w100 d-block pt-3 pb-3">
                              <img
                                src={imagePack.checkHelp}
                                alt="routing number help"
                                className="img-fluid"
                              />
                            </div>
                            <div className="row frm-details">
                              <div className="col-md-12">
                                <Input
                                  label="Name on Account*"
                                  name="accName"
                                  value={accName}
                                  onChange={this.onTextChange}
                                  dataValidate={["required"]}
                                  dataPattern=""
                                  maxLength="40"
                                  isError={accName_err}
                                  errorMsg={
                                    accName_errMsg &&
                                    accName_errMsg === "can't be empty"
                                      ? accountHolderMissingMsg
                                      : accountHolderNameValidMsg
                                  }
                                />
                              </div>
                              <div className="col-md-12">
                                <Input
                                  label="Bank Routing Number*"
                                  name="routingType"
                                  value={routingType}
                                  dataPattern="onlyNumber"
                                  placeholder="9 digits"
                                  dataValidate={[
                                    "number",
                                    "required",
                                    "routingNumber"
                                  ]}
                                  isError={routingType_err}
                                  onChange={this.onTextChange}
                                  maxLength={9}
                                  errorMsg={
                                    routingType_errMsg &&
                                    routingType_errMsg === "can't be empty"
                                      ? routingTypeMissingMsg
                                      : routingTypeValidMsg
                                  }
                                />
                              </div>
                            </div>
                            <div className="row frm-details">
                              <div className="col-md-12">
                                <Input
                                  label="Checking Account Number*"
                                  name="accountNumber"
                                  value={accountNumber}
                                  dataPattern="onlyNumber"
                                  placeholder="Up to 17 digits"
                                  dataValidate={["number", "required"]}
                                  isError={accountNumber_err}
                                  maxLength={17}
                                  onChange={this.onTextChange}
                                  errorMsg={
                                    accountNumber_errMsg &&
                                    accountNumber_errMsg === "can't be empty"
                                      ? accountNumberMissingMsg
                                      : accountNumberValidMsg
                                  }
                                />
                              </div>
                            </div>
                            <div className="row frm-details">
                              <div className="col-md-12">
                                <div className="has-input">
                                  <label>Account Type*</label>
                                </div>
                                <SelectMulti
                                  id="accountType"
                                  styles={selectStyleSmall}
                                  value={accountType}
                                  isMulti={false}
                                  placeholder="Account Type"
                                  onChange={this.changeAccountType}
                                  options={accountTypeOpt}
                                />
                              </div>
                            </div> */}

                      {/* <div className="row frm-details">
                              <div className="col-md-12">
                                <Input
                                  label="Driver's License Number*"
                                  name="drivingLicense"
                                  value={drivingLicense}
                                  dataPattern="onlyNumber"
                                  dataValidate={["required"]}
                                  isError={drivingLicense_err}
                                  onChange={this.onTextChange}
                                  errorMsg={
                                    drivingLicense_errMsg &&
                                    drivingLicense_errMsg === "can't be empty"
                                      ? drivingLicenseMissingErr
                                      : drivingLicenseValidMsg
                                  }
                                />
                              </div>
                              <div className="col-md-12">
                                <div
                                  className={classNames("has-input", {
                                    "has-error": false
                                  })}
                                >
                                  <label> State*</label>
                                  <select
                                    value={dlState}
                                    name="dlState"
                                    onChange={this.onSelectChange}
                                    className="form-control"
                                  >
                                    {stateArr.map((el, index) => (
                                      <option key={index} value={el}>
                                        {el}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div> */}
                      {/* </div>
                          <br />
                          <CheckBox
                            id="saveCard"
                            label="Save this Account"
                            name="saveCard"
                            checked={this.state.isSaveCard}
                            onChange={() => {
                              this.setState(prevState => ({
                                isSaveCard: !prevState.isSaveCard
                              }));
                            }}
                          />
                        </div>
                      )} */}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-4 col-md-6 review p4">
                <div
                  className={classNames(
                    "review-address-text shadow checkout-shadow-color-padding",
                    {
                      disableFormField:
                        mehtodShippingMethodDisable ||
                        methodReviewYourOrderDisable ||
                        countryUSAError
                    }
                  )}
                // className={
                //   methodReviewYourOrderDisable
                //     ? "review-address-text p4 checkout-shadow-color-padding disableFormField"
                //     : "review-address-text shadow  p4 checkout-shadow-color-padding"
                // }
                >
                  <div className=" p-md-4 p-3">
                    <h2 className="product-title">{reviewOrderMsg}</h2>

                    <div style={{ marginTop: "15px" }}>
                      <CartItemsSmall />
                    </div>
                    <div className="has-input has-checkbox-input ">
                      <input
                        type="checkbox"
                        checked={SubscriptionCheckout}
                        id="Subscription"
                        onChange={this.SubscriptionCheckout}
                      />
                      <label htmlFor="Subscription" className="d-flex f-12">
                        <span
                          className={classNames("CheckIcon", {
                            checked: SubscriptionCheckout === true
                          })}
                        />
                        <b>
                          I’m interested in product releases and news. Sign me
                          up!*
                        </b>
                      </label>
                    </div>
                    <div style={{ marginTop: "15px" }}>
                      {this.state.paymetnBtnDisable ? (
                        <div>
                          {this.state.paypalButtonShow ? (
                            <button
                              onClick={e => {
                                e.preventDefault();
                                this.placeOrder();
                              }}
                              className="btn-main p-3 w-100 "
                              type="submit"
                            >
                              Place Order {this.state.selectedOption}
                              {SpinnerToggle && <Spinner color="primary" />}
                            </button>
                          ) : (
                              <button
                                onClick={e => {
                                  e.preventDefault();
                                  this.placeOrder();
                                }}
                                className="btn-main p-3 w-100 btn10"
                                type="submit"
                              >
                                Place Order {this.state.selectedOption}
                                {SpinnerToggle && <Spinner color="primary" />}
                              </button>
                            )}
                        </div>
                      ) : (
                          <button
                            className="btn btn-info p-3 w-100"
                            type="submit"
                          >
                            Login first for subscription product{" "}
                            {this.state.selectedOption}
                          </button>
                        )}
                    </div>
                    <br />
                    <p className="f-12">
                      *By signing up or placing an order, you are consenting to
                      our privacy policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
        <Modal isOpen={modal} heading={modalTitle} toggle={this.modalDismiss}>
          <p className="text-center title-80 p-3">{modalData}</p>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart,
  location: state.location,
  isExpressCheckout: state.checkout.isExpressCheckout,
  isExpressPaypalCheckout: state.checkout.isExpressPaypalCheckout,
  referrer: state.referrer,
  isGuest: state.checkout.isGuest,
  cards: state.cards.cards,
  address: state.address
});
export default connect(
  mapStateToProps,
  {
    clearCart,
    clearCartA,
    setShippingCharge,
    setShippingType,
    setPaypalOrderDetails,
    setOrderFlag,
    setExpressPaypalCheckout,
    setExpressCheckout,
    setGuest,
    getCards,
    addCardAuthorize,
    getAddress,
    addAddress,
    setTax
  }
)(CheckOutForm);
