import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.scss";
import GoogleFontLoader from "react-google-font-loader";
import ReactGA from "react-ga";

import classNames from "classnames";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Footer } from "./components";
import Header from "./components/Header";
import Home from "./components/screens/Home";
import ProductDetail from "./components/screens/ProductDetail";
import Cart from "./components/screens/Cart";
import Category from "./components/screens/Category";
import Checkout from "./components/screens/Checkout";
import RegistrationPage from "./components/screens/RegistrationPage";
import TemplatePage from "./components/screens/TemplatePage";
import Products from "./components/screens/Products";
import {
  CountryCodes,
  getCountryName,
  getContinentName
} from "./services/extra";
import {
  getClientInfo,
  getWishListApi,
  addAmbassador,
  getSiteSettings,
  getAllComboApi,
  getAllProductApi
} from "./services/api";
import LoginPage from "./components/screens/LoginPage";
import MyAccount from "./components/screens/MyAcccount";
import MyProfile from "./components/screens/MyProfile";
import Favourites from "./components/screens/Favourites";
import Pages from "./components/screens/Pages";
import StripePayment from "./components/StripePayment";
import ForgotPassword from "./components/ForgotPassword";
import NewPassword from "./components/screens/NewPassword";
import MySubscription from "./components/screens/MySubscription";
// import MyPaymentMethod from "./components/screens/MyPaymentMethod";
import MyNotification from "./components/screens/MyNotification";
import Comingsoon from "./components/templates/Comingsoon";
import PaypalSuccess from "./components/paypalSuccess";
import PaypalFail from "./components/PaypalFail";
import Processagreement from "./components/processagreement";
import WithoutLoginFavourites from "./components/screens/WithoutLoginFavourites";
import OrderSuccess from "./components/screens/OrderSuccess";
import Terms from "./components/screens/terms";
import {
  localFontList,
  googleFontsInUse,
  imagePack
} from "./components/Constants";
import { projectName, enterMsg } from "./constantMessage";
import Affiliate from "./components/Affiliate";
import { Lodar } from "./components";
import Login from "./components/Afilliated/login";
import Registration from "./components/Afilliated/registration";
import Popup from "./components/Popup";
import BasicFunction from "./services/extra/basicFunction";
import AffForgotPass from "./components/Afilliated/affForgotPass";
import { makeCancelable } from "./services/makeCancelable";
import NewUpdatePassword from "./components/Afilliated/NewUpdatePassword";
import ListAddress from "./components/my-address/listAddrss";
import AddAddressForm from "./components/my-address/addressForm";
import EditAddress from "./components/my-address/EditAddress";
import Consult from "./components/consult/Consult";
import Appointment from "./components/consult/Appointment";
import ConfirmAppointment from "./components/consult/ConfirmAppointment";
import BookAppointment from "./components/consult/BookAppointment";
import ListCard from "./components/cardDetails/ListCard";
import {
  setLocation,
  setProducts,
  setWishList,
  setReferrer,
  fetchCart,
  setEntryMsg,
  getUserMetaNoCart
} from "./actions";
import { Modal } from "./components/modal";
import OrderTracking from "./components/screens/OrderTracking";
import Contact from "./components/screens/Contact";
import ChatBot from "./components/chatBot/ChatBot";
import CartSideBar from "./components/cart/CartSideBar";
import ShippingAndReturns from "./components/screens/ShippingAndReturns";
import FaqPage from "./components/screens/FaqPage";
import Accessibility from "./components/screens/Accessibility";
import PrivacyAndCookies from "./components/screens/PrivacyAndCookies";
import ChangePassword from "./components/screens/ChangePassword";
import Learn from "./components/screens/Learn";
import OurDoctors from "./components/screens/OurDoctors";

const basicFunction = new BasicFunction();

class App extends Component {
  constructor(props) {
    super(props);
    this.referrerSetting = this.referrerSetting.bind(this);
    this.wishListGet = this.wishListGet.bind(this);
    this.state = {
      id: 1,
      pathname: window.location.pathname,
      searchPath: window.location.search,
      url: window.location.href,
      origin: window.location.origin,
      gotCountry: false,
      fonts: [],
      modal: false,
      affMsg: "",
      isProduct: false,
      isCombos: false
    };
  }
  componentDidMount() {
    var Title = this.state.pathname.split("/")[2];
    if (Title) {
      document.title = Title;
    } else {
      document.title = projectName;
    }
    this.referrerSetting();
    this.returnToCountry();
    this.getProducts();
    if (this.props.user._id) {
      const { _id } = this.props.user;
      getUserMetaNoCart(_id);
      this.wishListGet(_id);
      this.fetchCart(_id);
    }
    ReactGA.initialize("UA-143443639-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  componentWillReceiveProps(nextProps) {
    // if (nextProps.history.location.pathname !== this.oldPath) {
    //   alert("asds")
    //   // this.setState({ prevPath: this.props.location })
    //   this.oldPath = this.props.history.location.pathname
    // }
  }
  shouldComponentUpdate(nextProps, nextState) {
    // if(this.state !== nextState){
    //   return true
    // }
    // const ne = this.props.history.reverse
    // console.log({
    //   this: this.oldPath,
    //   new: nextProps.history.location.pathname,
    //   path: window.location,
    //   // ne: ne[0]
    // })
    // if(this.oldPath === nextProps.history.location.pathname){
    //   return false
    // }
    return true;
  }

  componentWillUnmount() {
    if (typeof this.cancelableRef === "function") this.cancelableRef();
    if (typeof this.cancelableWishList === "function")
      this.cancelableWishList();
    if (typeof this.cancelableClientInfo === "function")
      this.cancelableClientInfo();
    if (typeof this.cancelableGetSettings === "function")
      this.cancelableGetSettings();
    if (typeof this.cancelableProduct === "function") this.cancelableProduct();
    if (typeof this.cancelableCombo === "function") this.cancelableCombo();
    if (this.timeCartFetch) clearTimeout(this.timeCartFetch);
  }
  setSite() {}
  fetchCart = id => {
    this.timeCartFetch = setTimeout(() => {
      this.props.fetchCart(id);
    }, 200);
  };
  referrerSetting() {
    const { href, pathname } = window.location;
    const { setReferrer, referrer } = this.props;
    // var url_string = href;
    console.log("aa", window.location.href);
    var url = new URL(window.location.href);
    const ambassador_id = url.searchParams.get("ref");
    var referralUrl = referrer.referralUrl
      ? referrer.referralUrl
      : document.referrer;
    const cUrl = href;
    const originalUrl = basicFunction.removeParams(cUrl, "ref");
    if (referralUrl) {
      if (referralUrl.includes(window.origin)) {
        referralUrl = "";
      }
    }
    // alert(ambassador_id)
    console.log({
      ambassador_id,
      url,
      location: window.location
    });
    if (ambassador_id) {
      console.log({
        ambassador_id1: ambassador_id
      });
      setReferrer({
        ambassadorId: ambassador_id,
        ambassadorUrl: referralUrl,
        referralUrl: referralUrl
      });
      const countryCode = pathname.split("/")[1];
      console.log({
        countryCode
      });
      if (CountryCodes.includes(countryCode.toUpperCase()) || true) {
        console.log("referral start here");
        this.cancelableRef = makeCancelable(
          addAmbassador({
            ambass_id: ambassador_id,
            url: originalUrl,
            refer_url: referralUrl
          }).then(res => res.json()),
          resJson => {
            if (resJson.status) {
              setReferrer({
                referralUrl: null
              });
              if (resJson.referral) {
                setReferrer({
                  referralUrlId: resJson.referral._id
                });
              }
            } else {
              this.setState({
                modal: true,
                affMsg: "Invalid Referral Url ."
              });
              setTimeout(() => {
                this.props.history.push(url);
              }, 2000);
            }
          },
          err => {
            this.setState({
              modal: true,
              affMsg: "Invalid Referral Url ."
            });
            setTimeout(() => {
              this.props.history.push(url);
            }, 2000);
          }
        );
      }
    }
  }
  getProducts() {
    const { setProducts, location } = this.props;
    const { isCombos, isProduct } = this.state;

    this.cancelableProduct = makeCancelable(
      getAllProductApi().then(res => res.json()),
      resJson => {
        if (!isProduct)
          this.setState({
            isProduct: true
          });

        if (resJson.products) {
          const products = [
            ...this.props.products.products,
            ...resJson.products
          ];
          setProducts({
            products,
            countryCode: location.countryCode
          });
        }
      },
      err => {
        if (!isProduct)
          this.setState({
            isProduct: true
          });
      }
    );
    this.cancelableCombo = makeCancelable(
      getAllComboApi().then(res => res.json()),
      resJson => {
        if (!isCombos)
          this.setState({
            isCombos: true
          });

        if (resJson.combos) {
          const products = [...this.props.products.products, ...resJson.combos];
          setProducts({
            products,
            countryCode: location.countryCode
          });
        }
      },
      err => {
        if (!isCombos)
          this.setState({
            isCombos: true
          });
      }
    );
  }
  wishListGet(userId) {
    this.cancelableWishList = makeCancelable(
      getWishListApi(userId).then(res => res.json()),
      resJson => {
        const { success, wishlist, combo } = resJson;
        if (success) {
          const wishList = wishlist.filter(item => {
            if (item.productid && item.productmeta._id) return true;
            return false;
          });
          const wishListCombo = combo.filter(item => {
            if (item.comboid._id) return true;
            return false;
          });
          const wishListBoth = [...wishList, ...wishListCombo];

          const data = wishListBoth
            .map(item => {
              if (item.combo) {
                const { comboid, _id } = item;
                return {
                  productid: comboid._id,
                  productmeta: comboid._id,
                  userid: userId,
                  wishListId: _id,
                  combo: true,
                  productDetails: item
                };
              }
              if (item.productid) {
                const { productid, productmeta, _id } = item;
                return {
                  productid: productid._id,
                  productmeta: productmeta._id,
                  userid: userId,
                  wishListId: _id,
                  combo: false,
                  productDetails: item
                };
              }

              return null;
            })
            .filter(el => el);

          setTimeout(this.props.setWishList(data), 500);
        }
      },
      err => {}
    );
  }
  getUserInfo() {
    const { location } = this.props;
    const countryCode = location.countryCode;
    const continent = location.continent;
    if (countryCode && continent) {
      this.setState(
        {
          gotCountry: true
        },
        () => {
          this.returnToCountry();
        }
      );
      return;
    }
    this.cancelableClientInfo = makeCancelable(
      getClientInfo().then(res => res.json()),
      resJson => {
        const {
          info: { country_code, continent_name },
          success
        } = resJson;
        if (success) {
          this.props.setLocation({
            countryCode: country_code || "US",
            continent: continent_name || "north-america"
          });
          this.setState(
            {
              gotCountry: true
            },
            () => {
              this.returnToCountry();
            }
          );
        } else {
          this.returnToCountry();
        }
      },
      err => {
        this.returnToCountry();
      }
    );
  }
  returnToCountry() {
    const { pathname, searchPath } = this.state;
    const { location, history } = this.props;
    let countryCode = pathname.split("/")[1];

    if (CountryCodes.includes(countryCode.toUpperCase())) {
      // console.log("asdfasdfasdfasdf",this.props.location.countryCode)
      if (!location.countryCode) {
        const countryCodeUpper = countryCode.toUpperCase();
        const countryName = getCountryName(countryCodeUpper);
        const continentName = getContinentName(countryName);
        this.props.setLocation({
          countryCode: countryCodeUpper,
          continent: continentName || "north-america"
        });
      }
      // this.setState({ headerPath: countryCode });
    } else {
      if (location.countryCode)
        history.push(`/${location.countryCode}${pathname}${searchPath}`);
      else {
        history.push(`/US${pathname}${searchPath}`);
        this.props.setLocation({
          countryCode: "US",
          continent: "north-america"
        });
      }
    }
  }
  updateFavicon = url => {
    let link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = url || "%PUBLIC_URL%/favicon.ico";
    document.getElementsByTagName("head")[0].appendChild(link);
  };
  setThemeVar() {
    //getSiteSettings
    this.cancelableGetSettings = makeCancelable(
      getSiteSettings().then(rs => rs.json()),
      res => {
        const fonts = res.options
          .map(el => {
            if (el.optionname === "favicon") {
              this.updateFavicon(el.optionvalue);
            } else if (
              el.optionname === "subfontfamily" ||
              el.optionname === "mainfontfamily" ||
              el.optionname === "bodyfontfamily"
            ) {
              document.body.style.setProperty(
                `--${el.optionname}`,
                `${el.optionvalue}, sans-serif`
              );
              if (!localFontList.includes(el.optionvalue)) {
                return {
                  font: el.optionvalue,
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
                };
              }
            } else {
              document.body.style.setProperty(
                `--${el.optionname}`,
                el.optionvalue
              );
            }
            return null;
          })
          .filter(el => el);
        this.setState({
          fonts
        });
      },
      err => {}
    );
  }
  render() {
    const {
      history
      // location
    } = this.props;
    const { modal, affMsg, isProduct, isCombos } = this.state;
    const pathName = window.location.pathname;
    // console.log("app render", {
    //   state: this.state,
    //   props: this.props
    // });
    return (
      <div
        className={classNames("App", {
          // "cart-open" : this.props.cartOpen
        })}
      >
        <div className="main-app">
          <Helmet>
            <title>{projectName}</title>
            <meta
              name="keywords"
              content={`cbdbené,CBDBENÉ,
          cbd,oil,thc,100,pure,10000,mg,1000mg,vape,100mg,15mg,2000mg,2019,250mg,25mg,capsules,3,30,300,3000mg,300mg,30ml,350,3500mg,3rd,party,tested,4,to,1,40,4000mg,400mg,45,4500mg,450mg,5,50,5000mg,500mg,50mg/ml,510,cartridge,thread,550,6,60,minutes,6000mg,600mg,for,dogs,600ml,60ml,75,750,ml,75mg,8,oz,80,800mg,,90,900mg,94513,98,99,99.9,
          `}
            />
          </Helmet>

          {!isProduct && !isCombos && pathName.length > 5 && <Lodar />}
          <GoogleFontLoader fonts={googleFontsInUse} />
          {modal && <Popup msg={affMsg} />}
          <Header history={history} />
          <Switch>
            <Route
              path="/"
              exact
              component={props => <Home {...props} />}
              // component={() => (
              //   <Redirect to="/US" style={{ minHeight: "100vh" }} />
              // )}
            />
            <Route
              path="/:lang"
              exact
              component={props => <Home {...props} />}
            />
            {isProduct && isCombos ? (
              <Route
                path="/:lang/shop/:id"
                exact
                component={props => (
                  <ProductDetail
                    className="main-section"
                    productid={props.match.params.id}
                    {...props}
                  />
                )}
              />
            ) : (
              <Lodar />
            )}
            <Route
              path="/:lang/pages/:pagetitle"
              exact
              component={props => (
                <Pages
                  className="main-section"
                  pathname={window.location.pathname}
                  pagetitle={props.match.params.pagetitle}
                  {...props}
                />
              )}
            />
            <Route
              path="/:lang/shop"
              exact
              component={props => (
                <Products className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/cart"
              exact
              component={props => <Cart className="main-section" {...props} />}
            />

            <Route
              path="/:lang/category/:categoryTitle"
              exact
              component={props => (
                <Category className="main-section" {...props} />
              )}
            />

            <Route
              path="/:lang/stripe"
              exact
              component={props => (
                <StripePayment className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/checkout"
              exact
              component={props => <Checkout className="pt-4" {...props} />}
            />
            <Route
              path="/:lang/registration"
              exact
              component={props => (
                <RegistrationPage className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/login"
              exact
              component={props => (
                <LoginPage className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/forgot-password"
              exact
              component={props => (
                <ForgotPassword className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/users/forgetpassword/"
              exact
              component={props => (
                <NewPassword className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/my-account"
              exact
              component={props => (
                <MyAccount className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/my-subscription"
              exact
              component={props => (
                <MySubscription className="main-section" {...props} />
              )}
            />

            <Route
              path="/:lang/my-payment-method"
              exact
              ListAddress
              component={props => (
                <ListAddress className="main-section" {...props} />
              )}
              // component={props => <MyPaymentMethod {...props} />}
            />
            <Route
              path="/:lang/my-address"
              exact
              ListAddress
              // component={props => <MyPaymentMethod {...props} />}
              component={props => (
                <ListAddress className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/my-address-add"
              exact
              ListAddress
              component={props => (
                <AddAddressForm className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/edit-address/:addressId"
              exact
              ListAddress
              component={props => (
                <EditAddress className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/my-card"
              exact
              ListAddress
              component={props => (
                <ListCard className="main-section" {...props} />
              )}
            />

            <Route
              path="/:lang/my-notification"
              exact
              component={props => (
                <MyNotification className="main-section" {...props} />
              )}
            />

            <Route
              path="/:lang/my-profile"
              exact
              component={props => (
                <MyProfile className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/my-account"
              exact
              component={props => (
                <MyAccount className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/success-paypal"
              exact
              component={props => (
                <PaypalSuccess className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/cancel-paypal"
              exact
              component={props => (
                <PaypalFail className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/Processagreement"
              exact
              component={props => (
                <Processagreement className="main-section" {...props} />
              )}
            />

            <Route
              path="/:lang/my-favourites"
              exact
              component={props => (
                <Favourites className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/favourites"
              exact
              component={props => (
                <WithoutLoginFavourites className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/terms"
              exact
              component={props => <Terms className="main-section" {...props} />}
            />
            <Route
              path="/:lang/learn"
              exact
              component={props => <Learn className="main-section" {...props} />}
            />
            <Route
              path="/:lang/contact-us"
              exact
              component={props => (
                <Contact className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/about-us"
              exact
              component={props => <Terms className="main-section" {...props} />}
            />
            <Route
              path="/:lang/shipping-returns"
              exact
              component={props => (
                <ShippingAndReturns className="main-section" {...props} />
              )}
            />

            <Route
              path="/:lang/faq"
              exact
              component={props => (
                <FaqPage className="main-section" {...props} />
              )}
            />

            <Route
              path="/:lang/track-my-order"
              exact
              component={props => (
                <OrderTracking className="main-section" {...props} />
              )}
            />

            <Route
              path="/:lang/press"
              exact
              component={props => <Terms className="main-section" {...props} />}
            />

            <Route
              path="/:lang/policies"
              exact
              component={props => <Terms className="main-section" {...props} />}
            />

            <Route
              path="/:lang/quality-guarantee"
              exact
              component={props => <Terms className="main-section" {...props} />}
            />
            <Route
              path="/:lang/ambassador-portal/"
              exact
              component={props => (
                <Affiliate className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/ambassador-portal/login"
              exact
              component={props => <Login className="main-section" {...props} />}
            />

            <Route
              path="/:lang/ambassador-portal/forgot-password"
              exact
              component={props => (
                <AffForgotPass className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/ambassador-portal/update-password"
              exact
              component={props => (
                <NewUpdatePassword className="main-section" {...props} />
              )}
            />

            <Route
              path="/:lang/ambassador-portal/registration"
              exact
              component={props => (
                <Registration className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/cookies"
              exact
              component={props => (
                <PrivacyAndCookies className="main-section" {...props} />
              )}
            />

            <Route
              path="/:lang/accessibility"
              exact
              component={props => (
                <Accessibility className="main-section" {...props} />
              )}
            />

            <Route
              path="/:lang/FDA"
              exact
              component={props => <Terms className="main-section" {...props} />}
            />

            <Route
              path="/:lang/privacy"
              exact
              component={props => <Terms className="main-section" {...props} />}
            />
            <Route
              path="/:lang/consult"
              exact
              component={props => (
                <Consult className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/book-appointment"
              exact
              component={props => (
                <Appointment className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/confirm-appointment"
              exact
              component={props => (
                <ConfirmAppointment className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/appointment-details"
              exact
              component={props => (
                <BookAppointment className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/change-password"
              exact
              component={props => (
                <ChangePassword className="main-section" {...props} />
              )}
            />
            <Route
              path="/:lang/our-doctors"
              exact
              component={props => (
                <OurDoctors className="main-section" {...props} />
              )}
            />

            <Route
              path="/:lang/order-success"
              exact
              component={props => (
                <OrderSuccess className="main-section" {...props} />
              )}
            />

            <Route
              path="/:lang/404"
              exact
              component={props => (
                <Comingsoon
                  className="main-section"
                  title={"404"}
                  description="Page not found"
                />
              )}
            />
          </Switch>
          <Modal
            noCross={true}
            large={true}
            heading="Warning"
            toggle={() => {
              this.props.setEntryMsg(false);
            }}
            isOpen={this.props.entryMsg}
          >
            <div className="col-12 p-3 text-center">
              <img
                src={imagePack.logo}
                className="centered-logo mb-5"
                alt="Bené"
              />
              <h4 className="mb-5">{enterMsg}</h4>
              <span
                onClick={() => {
                  this.props.setEntryMsg(false);
                }}
                className="Link Link--isBtn cursor-pointer justify-content-center"
              >
                Enter
              </span>
            </div>
          </Modal>
          <ChatBot history={this.props.history} />
          <Footer />
        </div>
        <CartSideBar />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  location: state.location,
  products: state.products,
  referrer: state.referrer,
  entryMsg: state.firstSetting.entryMsg
  // cartOpen: state.cartSideBar.isOpen
});
export default withRouter(
  connect(
    mapStateToProps,
    {
      setLocation,
      setWishList,
      setProducts,
      setReferrer,
      fetchCart,
      setEntryMsg,
      getUserMetaNoCart
    }
  )(App)
);
