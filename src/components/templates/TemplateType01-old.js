import React, { Component } from "react";
import { Icon } from "react-icons-kit";
import { bottom, redo } from "react-icons-kit/iconic/";
import { ic_keyboard_arrow_right } from "react-icons-kit/md/";
import { plus, chevronDown } from "react-icons-kit/fa/";
import { filePath } from "../Constants";
export default class TemplateType01 extends Component {
  render() {
    return (
      <div className="body">
        <div className="container-fluid no-padding">
          <div className="banner-image" />
        </div>
        <div className="container white-bg-p-80 margin-top-negative mobile-diifer">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <h3 className="heading-large">Urgent Care</h3>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <p>
                When you’re sick and need to see a doctor, our team is standing
                by around the clock. Available 24/7, our providers can help get
                you on track as well as order prescriptions, if needed. We’ll
                take the hassle and guesswork out of feeling better.
              </p>
              <p>
                For select health plans and employers, we can offer treatment
                programs and plans to help manage specific issues and
                conditions.
              </p>
              <a href="#" className="arrow-btn mobile-hide">
                See a Doctor
                <Icon icon={ic_keyboard_arrow_right} />
              </a>
            </div>
          </div>
        </div>
        <div className="container white-bg-p-80 mobile-diifer">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mobile-hide">
              <div className="tab">
                <div className="left">
                  <div className="tablist">
                    <ul>
                      <li className="active">
                        <a href="#">Cold & Flu</a>
                      </li>
                      <li>
                        <a href="#">Skin Conditions</a>
                      </li>
                      <li>
                        <a href="#">Women’s Health</a>
                      </li>
                      <li>
                        <a href="#">Men’s Health</a>
                      </li>
                      <li>
                        <a href="#">Allergies</a>
                      </li>
                      <li>
                        <a href="#">Headaches</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="right">
                  <div className="tabcontent">
                    <h4 className="main-sec-heading">Cold & Flu</h4>
                    <p className="big-font">
                      {" "}
                      Below are some of the ways we can help:
                      <ul className="icon-list">
                        <div className="left-sec">
                          <li>
                            <Icon icon={plus} />
                            Flu
                          </li>
                          <li>
                            <Icon icon={plus} />
                            Fever
                          </li>
                          <li>
                            <Icon icon={plus} />
                            Cough & cold
                          </li>
                          <li>
                            <Icon icon={plus} />
                            Sinus infections
                          </li>
                        </div>
                        <div className="right-sec">
                          <li>
                            <Icon icon={plus} />
                            Nausea & vomiting
                          </li>
                          <li>
                            <Icon icon={plus} />
                            Headaches
                          </li>
                          <li>
                            <Icon icon={plus} />
                            Asthma
                          </li>
                        </div>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* mobile hide sec */}
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mobile-show">
              <div className="tab">
                <div className="accordian">
                  <div className="accordian-content">
                    <p className="big-font">
                      {" "}
                      Below are some of the ways we can help:
                    </p>
                    <h4 className="accordian-heading">
                      Cold & Flu
                      <span className="right">
                        <Icon icon={chevronDown} />
                      </span>
                    </h4>
                    <ul className="icon-list">
                      <div className="left-sec">
                        <li>
                          <Icon icon={plus} />
                          Flu
                        </li>
                        <li>
                          <Icon icon={plus} />
                          Fever
                        </li>
                        <li>
                          <Icon icon={plus} />
                          Cough & cold
                        </li>
                        <li>
                          <Icon icon={plus} />
                          Sinus infections
                        </li>
                      </div>
                      <div className="right-sec">
                        <li>
                          <Icon icon={plus} />
                          Nausea & vomiting
                        </li>
                        <li>
                          <Icon icon={plus} />
                          Headaches
                        </li>
                        <li>
                          <Icon icon={plus} />
                          Asthma
                        </li>
                      </div>
                    </ul>
                    <h4 className="accordian-heading">
                      Skin Conditions
                      <span className="right">
                        <Icon icon={chevronDown} />
                      </span>
                    </h4>
                    <h4 className="accordian-heading">
                      Women’s Health
                      <span className="right">
                        <Icon icon={chevronDown} />
                      </span>
                    </h4>
                    <h4 className="accordian-heading">
                      Men's Health{" "}
                      <span className="right">
                        <Icon icon={chevronDown} />
                      </span>
                    </h4>
                    <h4 className="accordian-heading">
                      Allergies
                      <span className="right">
                        <Icon icon={chevronDown} />
                      </span>
                    </h4>
                    <h4 className="accordian-heading">
                      Headaches
                      <span className="right">
                        <Icon icon={chevronDown} />
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container white-bg-p-80 border-top">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h4 className="main-sec-heading">What We Don’t Treat</h4>
              <p className="big-font">
                {" "}
                While our doctors are able to treat the top issues you would go
                see a doctor about, there are conditions that we don’t treat.
                Please see an in-person doctor or hospital if you experience any
                of the following:
              </p>
              <ul className="icon-list">
                <div className="left-sec">
                  <li>
                    <Icon icon={plus} />
                    Traumatic brain or spinal cord injury
                  </li>
                  <li>
                    <Icon icon={plus} />
                    Chest pain and/or numbness
                  </li>
                  <li>
                    <Icon icon={plus} />
                    Vomiting or coughing blood
                  </li>
                  <li>
                    <Icon icon={plus} />
                    Lacerations
                  </li>
                </div>
                <div className="right-sec">
                  <li>
                    <Icon icon={plus} />
                    Loss of consciousness
                  </li>
                  <li>
                    <Icon icon={plus} />
                    Broken bones
                  </li>
                  <li>
                    <Icon icon={plus} />
                    Severe burns
                  </li>
                  <li>
                    <Icon icon={plus} />
                    Pediatric ear infections
                  </li>
                </div>
              </ul>
              <p className="big-font">
                Our doctors are unable to write prescriptions for controlled
                substances such as codeine or oxycodone. Please see a doctor in
                person if you require medication classified as a controlled
                substance.
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mobile-hide">
            <span>
              <a href="#" className="arrow-btn blue-bg-btn">
                See a Doctor Now
                <Icon icon={ic_keyboard_arrow_right} />
              </a>
            </span>
            <span>
              <a href="#" className="arrow-btn btn">
                Schedule Appointment
              </a>
            </span>
          </div>
          <div className="row mobile-show">
            <span>
              <a href="#" className="arrow-btn blue-bg-btn">
                download our app
              </a>
            </span>
          </div>
        </div>
        <div className="container no-padding">
          <div className="row padding-equal">
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="img-wrapper">
                <img srcSet="//www.doctorondemand.com/img/bh-img@2x.png" />
                <h3>Behavioural Health</h3>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="img-wrapper">
                <img srcSet="//www.doctorondemand.com/img/preventivehealth-img@2x.jpg" />
                <h3>Preventive Health</h3>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="img-wrapper">
                <img srcSet="//www.doctorondemand.com/img/chronic-care-img@2x.jpg" />
                <h3>Chronic Care</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
