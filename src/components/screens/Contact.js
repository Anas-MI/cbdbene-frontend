import React, { Component } from "react";
import DarkBanner from "../DarkBanner";
import ShadowBox from "../ShadowBox";
import { Helmet } from "react-helmet";
import { Icon } from "react-icons-kit";
import { iosArrowThinRight } from "react-icons-kit/ionicons/iosArrowThinRight";
import { ic_location_on, ic_email, ic_call } from "react-icons-kit/md/";
import { Input, TextArea, fieldValidation } from "../form";
import { regExReplace } from "../Constants";
import { Modal } from "../modal";

import classNames from "classnames";
import { msgSent, msgSentTitle, projectName } from "../../constantMessage";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
      isModal: false,
      modalText: "",
      modalHeading: ""
    };
  }
  componentDidMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  onTextChange = e => {
    const { value, name, attributes } = e.target;
    const type = attributes["data-validate"]
      ? attributes["data-validate"].value
      : "";
    const pattern = attributes["data-pattern"]
      ? attributes["data-pattern"].value
      : null;
    const match = attributes["data-match"]
      ? attributes["data-match"].value
      : null;

    this.setState(
      {
        [name]: pattern ? value.replace(regExReplace[pattern], "") : value
      },
      () => {
        this.validateField(name, type, match);
      }
    );
  };
  validateField = (value, type, match) => {
    const { isError, errorMsg } = fieldValidation(
      this.state[value],
      type,
      match
    );
    console.log({
      type,
      value,
      match,
      isError,
      state: this.state[value]
    });
    this.setState({
      [`${value}Err`]: isError,
      [`${value}ErrMsg`]: errorMsg
    });
  };
  verifyAll = () => {
    const list = [
      {
        name: "name",
        validate: "required"
      },
      {
        name: "email",
        validate: "required,email"
      },
      {
        name: "message",
        validate: "required"
      }
    ];

    const flagArr = list.map(el => {
      this.validateField(el.name, el.validate);
      return fieldValidation(this.state[el.name], el.validate).isError;
    });

    return flagArr.every(el => el === false);
  };
  onSubmit = e => {
    e.preventDefault();
    console.log(this.verifyAll());
    if (this.verifyAll()) {
      this.setState(
        {
          isModal: true,
          modalText: msgSent,
          modalHeading: msgSentTitle
        },
        () => {
          setTimeout(() => {
            this.disableModal();
          }, 2000);
        }
      );
    }
  };
  disableModal = () => {
    if (this.modalTimeout) clearTimeout(this.modalTimeout);

    this.setState({
      isModal: false,
      name: "",
      email: "",
      message: ""
    });
  };

  setGender(event) {
    console.log(event.target.value);
  }
  render() {
    const {
      name,
      email,
      message,
      nameErr,
      emailErr,
      messageErr,
      nameErrMsg,
      emailErrMsg,
      messageErrMsg,
      isModal,
      modalText,
      modalHeading
    } = this.state;
    const { className } = this.props;
    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <Helmet>
          <title>{projectName} | Login</title>
          <meta
            name="keywords"
            content={`cbdbené,CBDBENÉ,
        kapljice,lip,lisboa,water,lube,market,melbourne,mints,molecule,movers,nasal,naturals,nugs,oleo,patches,plus,portoreceptors,regulations,relieve,restaurants,skin,care,spain,strainstea,bags,therapy,ultra,ultrasound,unlimited,stock,juice,canada,venda,weed,wellness,what,is,it,wiki,class,yummy,yums
        `}
          />
        </Helmet>
        <DarkBanner
          title="Get in touch with us!
"
        >
          <div className="row">
            <div className="col-md-8 col-lg-6">
              <p>
                If you’re looking for specific answers, we must tell you that
                we’re a really helpful bunch. Why don’t you drop us a mail?
              </p>
            </div>
          </div>
        </DarkBanner>
        <div className="container-extend">
          <div className="row">
            <div className="col-lg-6 mt-5">
              <h3>What can we help you with?</h3>
              <p className="text-justify mb-4">
                Please select a topic below related to your inquiry.
                <br />
                {/* If you don’t find what you need, fill out our contact form. */}
              </p>
              <div onChange={this.setGender.bind(this)}>
                <div style={{ display: "block" }} className="font-weight-bold">
                  <input type="radio" value="MALE" name="gender" /> Order
                  Enquiry
                </div>
                &#32;Questions about an order you have placed online.
                <br />
                <br />
                <div style={{ display: "block" }} className="font-weight-bold">
                  <input type="radio" value="MALE" name="gender" /> Product
                  Enquiry
                </div>
                &#32;Questions you may have about specific products and
                ingredients.
                <br />
                <br />
                <div style={{ display: "block" }} className="font-weight-bold">
                  <input type="radio" value="MALE" name="gender" /> Wholesale
                  Enquiry
                </div>
                &#32;Questions about distributing Bené CBD.
                <br />
                <br />
                <div style={{ display: "block" }} className="font-weight-bold">
                  <input type="radio" value="MALE" name="gender" /> Press and
                  Marketing Enquiry
                </div>
                &#32;Questions you may have about press and marketing
                opportunities
                <br />
                <br />
                <div style={{ display: "block" }} className="font-weight-bold">
                  <input type="radio" value="MALE" name="gender" /> General
                  Feedback or Questions
                </div>
                &#32;Please contact us with any general questions or thoughts.
                <br />
                <br />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-10">
                  <ShadowBox className="upto-dark-banner">
                    <form onSubmit={this.onSubmit}>
                      <Input
                        label="NAME"
                        name="name"
                        value={name}
                        dataValidate={["required"]}
                        isError={nameErr}
                        errorMsg={
                          nameErrMsg === "can't be empty"
                            ? "Name is Required"
                            : nameErrMsg
                        }
                        onChange={this.onTextChange}
                      />
                      <Input
                        label="EMAIL ADDRESS"
                        name="email"
                        value={email}
                        dataValidate={["email", "required"]}
                        isError={emailErr}
                        errorMsg={
                          emailErrMsg === "can't be empty"
                            ? "Email is Required"
                            : emailErrMsg
                        }
                        onChange={this.onTextChange}
                      />
                      <TextArea
                        label="MESSAGE"
                        name="message"
                        value={message}
                        dataValidate={["required"]}
                        isError={messageErr}
                        errorMsg={
                          messageErrMsg === "can't be empty"
                            ? "Message is Required"
                            : messageErrMsg
                        }
                        onChange={this.onTextChange}
                      />
                      <button
                        type="submit"
                        className="Link Link--isBtn alter justify-content-between"
                      >
                        Send E-mail <Icon size="28" icon={iosArrowThinRight} />
                      </button>
                    </form>
                    <hr />
                    <div>
                      <h4 className="mb-5">Contact Information</h4>
                      <div className="w-100 d-block">
                        <div className="row">
                          {/* <div className="col-2 col-lg-1">
                            <Icon icon={ic_location_on} size="25" />
                          </div> */}
                          {/* <div className="col-10 col-lg-11 mb-2">
                            <span>Bené, LLC</span>
                            <br />
                            <span>8 The Green, Suite B Dover, DE 19901</span>
                          </div> */}
                          <div className="col-2 col-lg-1">
                            <Icon icon={ic_call} size="25" />
                          </div>
                          <div className="col-10 col-lg-11 mb-2">
                            <span>+1 (646) 367-3725</span>
                          </div>
                          <div className="col-2 col-lg-1">
                            <Icon icon={ic_email} size="25" />
                          </div>
                          <div className="col-10 col-lg-11 mb-2">
                            <a href="mailto:mail@example.com">
                              support@cbdbene.com
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ShadowBox>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={isModal}
          heading={modalHeading}
          toggle={this.disableModal}
        >
          <div className="w-100 p-4 text-center">
            <h3>{modalText}</h3>
          </div>
        </Modal>
      </div>
    );
  }
}
