import React, { Component } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { isEmpty, isEmail } from "validator";
import { Icon } from "react-icons-kit";
import { connect } from "react-redux";
import { ic_close, ic_arrow_forward, ic_clear } from "react-icons-kit/md";
import classNames from "classnames";
import { regionsList, countryList } from "../components/Constants";
import { getCountryName } from "../services/extra";
// import { getSettingsApi } from "../services/api";
import { FooterMenu } from "./footerMenu";
import { FooterMenuMobile } from "./footerMenuMobile";
import { setLocation } from "../actions";
import {
  footerSubscriptioSuccessDetailsMessage,
  footerSubscriptioSuccessHeadingMessage,
  footerSubscriptionDetails,
  footerSubModalTitle
} from "../constantMessage";
class FooterClass extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.countryToggle = this.countryToggle.bind(this);
    this.countrySearchHandler = this.countrySearchHandler.bind(this);
    this.renderCountryFilterForm = this.renderCountryFilterForm.bind(this);
    this.filterCountryList = this.filterCountryList.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
    // this.getCopyRightText = this.getCopyRightText.bind(this);
    this.fieldValidation = this.fieldValidation.bind(this);
    this.handelTextChange = this.handelTextChange.bind(this);
    this.toggleSubsModal = this.toggleSubsModal.bind(this);
    this.submitSubs = this.submitSubs.bind(this);
    this.autoSubsModalOff = this.autoSubsModalOff.bind(this);
    this.state = {
      collapse: false,
      collapse1: false,
      collapse2: false,
      collapse3: false,
      countryModal: false,
      showFooterCollapse: window.innerWidth > 640 ? false : true,
      countrySearch: "",
      filteredCountrySearch: null,
      selectedRegion: null,
      copyRightText: "",
      subscribe_email: "",
      subscribe_email_err: null,
      subscribe_email_errMsg: "",
      showSubsModal: false
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    // this.getCopyRightText();
    const { user } = this.props;
    if (user._id) {
      this.setState({
        subscribe_email: user.email
      });
    }
  }
  componentWillMount() {
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize() {
    this.setState({
      showFooterCollapse: window.innerWidth > 640 ? false : true
    });
  }
  submitSubs(e) {
    e.preventDefault();
    if (this.state.subscribe_email.length > 0) {
      var type = "email";
      if (this.fieldValidation("subscribe_email", type)) {
        this.setState({
          showSubsModal: true,
          subscribe_email: ""
        });
        this.autoSubsModalOff();
      }
    } else {
      this.setState({
        subscribe_email_err: true,
        subscribe_email_errMsg: "Email Id is required"
      });
    }
  }
  toggleSubsModal() {
    if (this.subsModalInterval) {
      clearTimeout(this.subsModalInterval);
    }
    this.setState(prevState => ({
      showSubsModal: !prevState.showSubsModal
    }));
  }
  autoSubsModalOff() {
    if (this.subsModalInterval) {
      clearTimeout(this.subsModalInterval);
    }
    this.subsModalInterval = setTimeout(() => {
      this.setState({
        showSubsModal: false
      });
    }, 3000);
  }
  handelTextChange(e) {
    if (e.target.attributes["data-validate"])
      this.setState(
        {
          [e.target.id]: e.target.value
        },
        () => {
          this.setState({
            subscribe_email_err: false
          });
        }
      );
  }
  fieldValidation(field, type) {
    const typeArr = type.split(",");
    if (typeArr.includes("empty")) {
      if (isEmpty(this.state[field])) {
        this.setState({
          [field + "_err"]: null,
          [field + "_errMsg"]: ""
        });

        return;
      }
    }

    if (typeArr.includes("email")) {
      if (isEmail(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
        return true;
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "Email Not Valid"
        });
        return false;
      }
    }
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  toggle1() {
    this.setState({ collapse1: !this.state.collapse1 });
  }
  toggle2() {
    this.setState({ collapse2: !this.state.collapse2 });
  }
  toggle3() {
    this.setState({ collapse3: !this.state.collapse3 });
  }
  countryToggle() {
    this.setState(prevState => ({
      countryModal: !prevState.countryModal
    }));
  }
  // getCopyRightText() {
  //   // getSettingsApi
  //   getSettingsApi()
  //     .then(res => res.json())
  //     .then(resJson => {
  //       if (resJson.success) {
  //         // cons
  //         let settings = {};
  //         resJson.options.map(el => {
  //           settings = {
  //             ...settings,
  //             [el.optionname]: el.optionvalue
  //           };
  //           return null;
  //         });
  //         if (settings.copyrightstatus === "1") {
  //           this.setState({
  //             copyRightText: settings.copyrighttext
  //           });
  //         }
  //       }
  //     });
  // }
  countrySearchHandler(e) {
    this.setState(
      {
        countrySearch: e.target.value
      },
      () => {
        this.filterCountryList();
      }
    );
  }
  filterCountryList() {
    const { countrySearch: query } = this.state;
    if (query.length < 3 && window.innerWidth > 640) {
      this.setState({ filteredCountrySearch: null });
      return;
    }
    let users = [];
    users = countryList.filter(function(country) {
      return country.title.toLowerCase().indexOf(query) !== -1; // returns true or false
    });
    this.setState({ filteredCountrySearch: users });
  }
  isRegion(name, arr) {
    let flag = false;
    if (arr) {
      arr.map(el => {
        if (el.region === name) flag = true;
        return null;
      });
    }

    return flag;
  }
  renderFooterToggles() {
    return (
      <div className="footer-inside-content footer-inside-two">
        <div>
          <FooterMenuMobile />
        </div>
      </div>
    );
  }
  renderFooterLists() {
    return <FooterMenu />;
  }
  renderCountryFilterForm() {
    const { countrySearch } = this.state;
    return (
      <form action="." className="LanguageModal-searchForm" data-ref="form">
        <svg
          className="Icon LanguageModal-searchIcon"
          role="img"
          viewBox="0 0 21 20"
        >
          <g strokeWidth="1" fillRule="evenodd">
            <g transform="translate(-198.000000, -67.000000)">
              <g id="Group-4" transform="translate(198.000000, 67.000000)">
                <rect
                  id="Rectangle"
                  transform="translate(16.353553, 16.353553) rotate(-45.000000) translate(-16.353553, -16.353553) "
                  x="15.3535534"
                  y="12.6109127"
                  width="2"
                  height="7.48528137"
                />
                <path
                  d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z M8.5,15 C12.0898509,15 15,12.0898509 15,8.5 C15,4.91014913 12.0898509,2 8.5,2 C4.91014913,2 2,4.91014913 2,8.5 C2,12.0898509 4.91014913,15 8.5,15 Z"
                  id="Oval"
                  fillRule="nonzero"
                />
              </g>
            </g>
          </g>
        </svg>
        <div className="FormText LanguageModal-search">
          <label>
            <input
              type="text"
              value={countrySearch}
              onChange={this.countrySearchHandler}
              className="FormText-input"
              name="languageSearch"
              placeholder=""
            />
            <span className="FormText-label" />
          </label>
        </div>
      </form>
    );
  }

  selectRegion(region) {
    this.setState(
      {
        selectedRegion: region.data,
        countrySearch: ""
      },
      this.filterCountryList
    );
  }
  renderRegionList(arr) {
    const { filteredCountrySearch } = this.state;
    return arr.map((region, index) => {
      return (
        <a
          key={index}
          onClick={() => {
            this.selectRegion(region);
          }}
          className={classNames("LanguageModal-region", {
            "LanguageModal-selectedRegion":
              region.data === this.state.selectedRegion &&
              filteredCountrySearch === null,
            "LanguageModal-inactiveRegion":
              filteredCountrySearch !== null &&
              !this.isRegion(region.data, filteredCountrySearch)
          })}
          data-ref="region"
          data-region={region.data}
          href="#/"
        >
          {region.name}
        </a>
      );
    });
  }
  redirectToCountry(countryCode) {
    let pathArr = window.location.pathname.split("/");
    let newPath = pathArr.map((el, index) => {
      if (el === "") return "/";

      if (index === 1) return countryCode;

      return "/" + el;
    });
    return newPath.join("");
  }
  renderCountryList(arr) {
    const { filteredCountrySearch } = this.state;
    return arr.map((country, index) => {
      const { region, code, title } = country;
      return (
        <a
          key={index}
          className={classNames("LanguageModal-country", {
            matches:
              filteredCountrySearch !== null ||
              country.region === this.state.selectedRegion
          })}
          data-ref="country"
          data-country={title}
          data-region={region}
          data-href={`/${code}`}
          onClick={() => {
            this.props.setLocation({
              countryCode: code || "US",
              continent: region || "north-america"
            });
            setTimeout(() => {
              window.location.href = this.redirectToCountry(code);
            }, 200);
          }}
          href="#/"
        >
          <span className="LanguageModal-country-link">{country.title}</span>
        </a>
      );
    });
  }
  render() {
    const {
      showSubsModal,
      showFooterCollapse,
      subscribe_email,
      subscribe_email_err,
      subscribe_email_errMsg,
      filteredCountrySearch
      // copyRightText
    } = this.state;
    const { isCheckoutPage } = this.props;
    console.log({
      isCheckoutPage
    });

    const pathName = window.location.pathname.split("/");
    const isOnCheckoutPage = pathName[2] === "checkout";
    return (
      <div className="mt-auto">
        {!isOnCheckoutPage ? (
          <footer className="footer-sec border-top-footer">
            <div className="footer-inside">
              {showFooterCollapse && this.renderFooterToggles()}
              {!showFooterCollapse && this.renderFooterLists()}
              <div className="footer-inside-content-last">
                <div className="inside-content-last">
                  <h4>{footerSubscriptionDetails}</h4>
                  <form onSubmit={this.submitSubs}>
                    <div
                      style={{
                        overflow: "hidden"
                      }}
                      className={classNames(
                        "has-icon-submit has-input inputwrapper only-bottom-border",
                        {
                          "has-error": subscribe_email_err
                        }
                      )}
                    >
                      <input
                        type="text"
                        id="subscribe_email"
                        onChange={this.handelTextChange}
                        value={subscribe_email}
                        placeholder="Email Address"
                        data-validate={["email", "empty"]}
                      />
                      <button
                        type="submit"
                        className="submit-icon input-search-icon"
                      >
                        {subscribe_email_err === false ? (
                          <span>
                            <Icon icon={ic_arrow_forward} />
                          </span>
                        ) : (
                          <span>
                            <Icon icon={ic_arrow_forward} />
                          </span>
                        )}
                      </button>

                      {subscribe_email_err && (
                        <p className="error">{subscribe_email_errMsg}</p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </footer>
        ) : (
          ""
        )}
        <div />
        <div className="copy">
          <div className="copy-left">
            <p>
              &copy; Bené
              {/* {copyRightText} */}
            </p>
          </div>
          <div className="copy-right">
            <p onClick={this.countryToggle} className="footer-country-change">
              {getCountryName(this.props.location.countryCode)}
            </p>
          </div>
        </div>
        <Modal
          isOpen={this.state.countryModal}
          toggle={this.countryToggle}
          className={"country-popup LanguageModal cus-modal"}
        >
          <div className="country-popup-inner Modal-body">
            <div className="LanguageModal-titleRow">
              <h1 className="LanguageModal-title">
                Select your shipping destination
              </h1>
              <button
                className="LanguageModal-closeButton"
                onClick={this.countryToggle}
                type="button"
              >
                <Icon icon={ic_close} size={25} />
              </button>
            </div>
            <div className="LanguageModal-container">
              <div
                className={classNames("LanguageModal-regionsContainer", {
                  LanguageModal: true
                })}
              >
                <div className="LanguageModal-overflowContainer">
                  <div className="LanguageModal-scrollable">
                    {this.renderCountryFilterForm()}
                    {this.renderRegionList(regionsList)}
                  </div>
                </div>
              </div>
              <div className="LanguageModal-countriesContainer">
                <div className="LanguageModal-overflowContainer">
                  <div className="LanguageModal-scrollable">
                    <div className="LanguageModal-countries">
                      {this.renderCountryList(
                        filteredCountrySearch
                          ? filteredCountrySearch
                          : countryList
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={showSubsModal}
          toggle={this.toggleSubsModal}
          className={"full-modal"}
        >
          <ModalHeader toggle={this.toggleSubsModal}>
            {footerSubModalTitle}
          </ModalHeader>
          <div className="Modal-body center-modal">
            {/* <div className="modal-dismiss" onClick={this.toggleSubsModal}>
              <Icon icon={ic_clear} />
            </div> */}
            <div className="modal-inner">
              <div className="modal-content p-2">
                <p className="text-center MCItemCarouselIntro-title">
                  {footerSubscriptioSuccessHeadingMessage}
                </p>
                <p className="text-center ">
                  {footerSubscriptioSuccessDetailsMessage}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  location: state.location,
  isCheckoutPage: state.extras.isCheckoutPage
});
export const Footer = connect(
  mapStateToProps,
  {
    setLocation
  }
)(FooterClass);
