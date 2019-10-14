import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { imagePack } from "../Constants";
import SingleDrCart from "../consult/SingleDrCart";
import { CustomLink } from "..";

class OurDoctors extends Component {
  componentDidMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
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
              <div className=" col-lg-4 col-md-5 pt-5 pb-5">
                <div
                  className="d-none d-md-block"
                  style={{
                    paddingTop: "120px"
                  }}
                />
                <br />
                <br />
                <h2 className="banner-text-1">Our Doctors</h2>
                <br />
                <p>
                  {/* Get in touch with our doctors who have experience with CBD. */}
                </p>
                <br />
                <br />
                {/* <CustomLink to={`/${location.countryCode}/our-doctors`} className="Link Link--isBtn alter align-items-center justify-content-center">
                  Learn More
                </CustomLink> */}
                <div
                  className="d-none d-md-block"
                  style={{
                    paddingTop: "150px"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pb-5">
          <div className="container-extend">
            <div className="row justify-content-center">
              <div
                style={{
                  maxWidth: "100%",
                  width: "390px"
                }}
                className="pl-3 pr-3"
              >
                <SingleDrCart
                  doctor={{
                    name: "Dr. Eric Wood",
                    designation: "Naturopathic practitioner",
                    address: (
                      <span>
                        3077 E Commercial Blvd, Fort Lauderdale,
                        <br />
                        FL 33308, USA
                      </span>
                    ),
                    image: imagePack.drEric,
                    reviews: 10,
                    stars: 4.5
                  }}
                  history={this.props.history}
                  times={[
                    {
                      date: {
                        day: "Tue",
                        data: "Sep 03"
                      },
                      time: ["09:00 AM", "10:05 AM", "12:15 PM", "01:00 PM"]
                    },
                    {
                      date: {
                        day: "Wed",
                        data: "Sep 04"
                      },
                      time: ["10:15 AM", "12:25 PM", "02:00 PM", "04:00 PM"]
                    },
                    {
                      date: {
                        day: "Thu",
                        data: "Sep 05"
                      },
                      time: ["10:15 AM", "12:25 PM", "02:00 PM", "04:00 PM"]
                    },
                    {
                      date: {
                        day: "Fri",
                        data: "Sep 06"
                      },
                      time: ["09:00 AM", "10:05 AM", "12:15 PM", "01:00 PM"]
                    },
                    {
                      date: {
                        day: "Sat",
                        data: "Sep 07"
                      },
                      time: ["10:15 AM", "12:25 PM", "02:00 PM", "04:00 PM"]
                    }
                  ]}
                  full={true}
                  location={location}
                />
              </div>
              <div
                style={{
                  maxWidth: "100%",
                  width: "390px"
                }}
                className="pl-3 pr-3"
              >
                <SingleDrCart
                  history={this.props.history}
                  doctor={{
                    name: "Dr. Jamie Corroon",
                    designation: "ND, MPH",
                    address: (
                      <span>
                        740 Garden View Court, Suite 207,
                        <br />
                        Encinitas, CA 92024
                      </span>
                    ),
                    image: imagePack.drJamie,
                    reviews: 16,
                    stars: 4
                  }}
                  times={[
                    {
                      date: {
                        day: "Tue",
                        data: "Sep 03"
                      },
                      time: ["09:00 AM", "10:05 AM", "12:15 PM", "01:00 PM"]
                    },
                    {
                      date: {
                        day: "Wed",
                        data: "Sep 04"
                      },
                      time: ["10:15 AM", "12:25 PM", "02:00 PM", "04:00 PM"]
                    },
                    {
                      date: {
                        day: "Thu",
                        data: "Sep 05"
                      },
                      time: ["10:15 AM", "12:25 PM", "02:00 PM", "04:00 PM"]
                    },
                    {
                      date: {
                        day: "Fri",
                        data: "Sep 06"
                      },
                      time: ["09:00 AM", "10:05 AM", "12:15 PM", "01:00 PM"]
                    },
                    {
                      date: {
                        day: "Sat",
                        data: "Sep 07"
                      },
                      time: ["10:15 AM", "12:25 PM", "02:00 PM", "04:00 PM"]
                    }
                  ]}
                  full={true}
                  location={location}
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="pt-5 pb-5 w-100 d-none">
          <div className="container-extend text-center pt-5 pb-5">
            <div className="row pb-4 mb-4">
              <div className="col-12 pb-5">
                <h2>What do you get with Bené</h2>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="w-100">
                  <div className="p-4">
                    <img
                      src={imagePack.consultIcon1}
                      width="100px"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <p>
                    Our highly qualified doctors are US Board Certified and
                    provide the most objective CBD advise.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="w-100">
                  <div className="p-4">
                    <img
                      src={imagePack.consultIcon2}
                      width="100px"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <p>Our doctors have an average of 15 years of experience.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="w-100">
                  <div className="p-4">
                    <img
                      src={imagePack.consultIcon3}
                      width="100px"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <p>
                    Speak to a medical professional easily via the web or phone.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="w-100">
                  <div className="p-4">
                    <img
                      src={imagePack.consultIcon4}
                      width="100px"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <p>Our consult costs only $49.00.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-md-5 pb-md-5 w-100">
          <div className="container-extend text-center pt-5 pb-5">
            <div className="row pb-4 mb-4">
              <div className="col-12 pb-5">
                <h2>Doctors you can trust</h2>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="w-100">
                  <div className="p-4">
                    <img
                      src={imagePack.consultIcon1}
                      width="100px"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <h5>Professional</h5>
                  <p>
                    Visit a doctor, counselor, psychiatrist or dermatologist by
                    mobile app, video or phone.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="w-100">
                  <div className="p-4">
                    <img
                      src={imagePack.consultIcon2}
                      width="100px"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <h5>Experienced</h5>
                  <p>Our doctors have an average of 15 years of experience.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="w-100">
                  <div className="p-4">
                    <img
                      src={imagePack.consultIcon3}
                      width="100px"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <h5>Accessible</h5>
                  <p>
                    Speak to a medical professional easily via the web or phone.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="w-100">
                  <div className="p-4">
                    <img
                      src={imagePack.consultIcon4}
                      width="100px"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <h5>Affordable </h5>
                  <p>Our consult costs only $49.00.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#eee9e3"
          }}
        >
          <div
            style={{
              paddingTop: "130px"
            }}
          />
          <div className="container-extend pt-md-5 pb-md-5">
            <div className="col-12">
              <div className="text-center pt-3 banner-text-1">
                All of our providers are verified for medical licensure, work
                history and education.
              </div>
            </div>
          </div>

          <div
            style={{
              paddingTop: "130px"
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location
});
export default connect(mapStateToProps)(OurDoctors);
