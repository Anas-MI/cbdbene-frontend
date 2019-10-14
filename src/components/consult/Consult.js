import React, { Component } from "react";
// import Consultations from "./Consultations";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";
// import HowDoesWork from "./HowDoesWork";
import DrList from "./DrList";
import { CustomLink } from "../";
import { imagePack } from "../Constants";
import classNames from "classnames";
import { TopNumberCard } from "../cards";
class Consult extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { className, location } = this.props;
    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <div className="position-relative">
          <img
            className="md-bg-image img-fluid"
            src={imagePack.consult1bgAlter}
            alt="banner"
            style={{ opacity: "0.8" }}
          />
          <div className="container-extend">
            <div className="row ">
              <div className="col-lg-5 col-md-5 pt-5 pb-5">
                <div
                  className="d-none d-md-block"
                  style={{
                    paddingTop: "120px"
                  }}
                />
                <br />
                <br />
                <h2>Consult a certified doctor about CBD.</h2>
                <br />
                <p
                  style={{
                    fontSize: "16px"
                  }}
                >
                  Get in touch with our doctors who have experience with CBD.
                </p>
                <br />
                <br />
                <br />
                <CustomLink
                  to={`/${location.countryCode}/our-doctors`}
                  className="Link Link--isBtn alter align-items-center justify-content-center"
                >
                  Get Started
                </CustomLink>
                <div
                  className="d-none d-md-block"
                  style={{
                    paddingTop: "120px"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-md-5 pb-md-5 w-100">
          <div className="container-extend text-center pt-5 pb-5">
            <div className="row pb-4 mb-4">
              <div className="col-12">
                <div className="row align-items-center">
                  <div className="col-md-5">
                    <div className="d-block">
                      <img
                        src={imagePack.doctorPng}
                        alt="doctor"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="col-12 pb-5">
                      <h2>How does CBD consult work?</h2>
                    </div>
                    <div className="col-12">
                      <TopNumberCard
                        number="1"
                        direction="left"
                        title="Select a doctor and request an appointment"
                      >
                        Select a doctor licensed to practice in your state.
                        Schedule your appointment and pay for your visit.
                      </TopNumberCard>
                    </div>
                    <div className="col-12">
                      <TopNumberCard
                        number="2"
                        direction="left"
                        title="Prepare for the appointment"
                      >
                        Enter your medical history privately and securely.
                      </TopNumberCard>
                    </div>
                    <div className="col-12">
                      <TopNumberCard
                        number="3"
                        direction="left"
                        title="Consult online or by phone"
                      >
                        Visit your doctor online or on the phone to discuss your
                        individual needs and how they can be met.
                      </TopNumberCard>
                    </div>
                    <br />
                    <br />
                    <div className="col-12">
                      <CustomLink
                        to={`/${location.countryCode}/our-doctors`}
                        className="Link Link--isBtn alter align-items-center justify-content-center"
                      >
                        Get Started
                      </CustomLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="position-relative">
          <img
            className="md-bg-image img-fluid"
            src={imagePack.consult2bg}
            alt="banner"
            style={{ opacity: "0.6" }}
          />
          <div className="container-extend">
            <div className="row ">
              <div className="col-lg-6 pt-5 pb-5">
                <div
                  className="d-none d-lg-block"
                  style={{
                    paddingTop: "120px"
                  }}
                />
                {
                  /* <h2>Trust our doctors for quality advise</h2>
                <br />
                <p>
                  Our doctors are experts in Medical Cannabis and CBD. They are
                  well-versed in the medical use of CBD and provide detailed
                  guidance regarding their dosing and potential drug
                  interactions. We’re committed to offering you the best in
                  online doctor visits. Let our doctors help answer all your
                  questions on CBD.
                </p>
                <br />
                <br /> */
                  <div className="pt-5 pb-5">
                    <div className="pt-5 pb-5">
                      <div className="row ">
                        <div className="col-12">
                          <div className="w-100 bg-white pb-3">
                            <div className="p-3 bg-dark">
                              <h3 className="text-white m-0">CBD Visits</h3>
                            </div>
                            <div className="pt-4 pl-3 pr-3">
                              <div className="pl-lg-3 pr-lg-3">
                                <div className="floating-price-lg">
                                  <p className="floating-price-inner">
                                    <span className="h1">$49</span> per session.
                                  </p>
                                </div>
                                <h5>Topics you can discuss with the doctor:</h5>
                                <div className="pt-3">
                                  <ul className="lg-column-2">
                                    <li className="mb-2">
                                      Can CBD help my specific condition?
                                    </li>
                                    <li className="mb-2">
                                      Topicals vs. Edibles vs. Oil drops: which
                                      CBD products should I buy?
                                    </li>
                                    <li className="mb-2">
                                      What is my recommended CBD dosage?
                                    </li>
                                    <li className="mb-2">
                                      Have you prescribed CBD before and what
                                      were the results?
                                    </li>
                                    <li className="mb-2">
                                      What are the potential interactions with
                                      supplements or prescription medications?
                                    </li>
                                    <li className="mb-2">
                                      What are the Side Effects?
                                    </li>
                                    <li className="mb-2">
                                      What are the different options available
                                      for taking CBD?
                                    </li>
                                  </ul>

                                  <div className="w-100 p-3">
                                    <CustomLink
                                      to={`/${
                                        location.countryCode
                                      }/our-doctors`}
                                      className="Link Link--isBtn alter align-items-center justify-content-center"
                                    >
                                      Get Started
                                    </CustomLink>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                <div
                  className="d-none d-md-block"
                  style={{
                    paddingTop: "120px"
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
          <div className="container-fluid ">
            <DrList />
          </div>
        </ScrollAnimation> */}
        {/* <ScrollAnimation animateIn='fadeIn'  animateOnce={true} delay={300}  >
          <div className="container mt-xl-5">
            <Consultations />
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn='fadeIn'  animateOnce={true}  delay={300}>
          <div className="container-fluid mt-xl-5 shadowBoxBackground">
            <HowDoesWork />
          </div>
          </ScrollAnimation>
        <ScrollAnimation animateIn='fadeIn'   animateOnce={true} delay={300}>
        <div className="container mt-xl-5">
          <div className=" align-items-center d-flex justify-content-center height100vh">
            <div className="">
              <div className="content_section_3 ">
                <button className="">Next Step</button>
              </div>
              <div className=" content_section_3">
                <Link to={`/${location.countryCode}/book-appointment`}>
                  Book an Appointment
                </Link>
                <Link
                  className="ml-5"
                  to={`/${location.countryCode}/book-appointment`}
                >
                  I'm here for my appointment
                </Link>
              </div>
            
            </div>
          </div>
          <br />
          <br />
        </div>
        </ScrollAnimation> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location
});

export default connect(mapStateToProps)(Consult);
