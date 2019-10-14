import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import classNames from "classnames";
import ConsultLogin from "./ConsultLogin";
import PersonalDetails from "./PersonalDetails";
import Scheduling from "./Scheduling";
import IntakeDetails from "./IntakeDetails";
import ReviewPay from "./ReviewPay";
import { Timeline, Bookmark } from "react-vertical-timeline";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import { ic_trending_flat } from "react-icons-kit/md/";
import Icon from "react-icons-kit";
class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageName: "Login",
      progress: 0
    };
    this.pageChange = this.pageChange.bind(this);
    this.increment = this.increment.bind(this);
    this.progressClick = this.progressClick.bind(this);
  }
  componentDidMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const { user, history, location } = this.props;
    if (user._id) {
      this.setState({ progress: 25 });
    }
    if (
      history &&
      history.location &&
      history.location.state &&
      history.location.state.appointmentDetail
    ) {
      console.log({
        appointmentDetail: history.location.state.appointmentDetail
      });
    } else {
      this.props.history.push(`/${location.countryCode}/our-doctors`);
    }
  }
  increment() {
    const progress = this.state.progress > 100 ? 0 : this.state.progress + 1;
    this.setState({
      progress
    });
  }

  progressClick(progress) {
    this.setState({
      progress
    });
  }

  nextPage = () => {
    const { progress } = this.state;
    const { location, history } = this.props;
    switch (progress) {
      case 0:
        this.setState({
          progress: 25
        });
        break;
      case 25:
        this.setState({
          progress: 50
        });
        break;
      case 50:
        this.setState({
          progress: 75
        });
        break;
      case 75:
        this.setState({
          progress: 100
        });
        break;
      case 100:
        history.push("/" + location.countryCode + "/confirm-appointment/");

        break;
      default:
        console.log("hello", progress);
    }
  };
  pageChange(link) {
    this.setState({
      pageName: link
    });
  }
  render() {
    const { progress } = this.state;
    const { className, user, history } = this.props;
    return (
      <div
        className={classNames("container-fluid", {
          [className]: className
        })}
      >
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-4 newBackground ">
            <div className="arrowInMultipart">
              <Timeline
                height={300}
                onSelect={
                  () => {}
                  // this.progressClick
                }
                progress={this.state.progress}
              >
                <Bookmark
                  onSelect={!user._id && this.progressClick}
                  progress={0}
                >
                  Login
                </Bookmark>
                <Bookmark
                  onSelect={this.state.progress > 25 && this.progressClick}
                  progress={25}
                >
                  Personal Details
                </Bookmark>
                <Bookmark
                  onSelect={this.state.progress > 50 && this.progressClick}
                  progress={50}
                >
                  Scheduling
                </Bookmark>
                <Bookmark
                  onSelect={this.state.progress > 75 && this.progressClick}
                  progress={75}
                >
                  Intake Details
                </Bookmark>
                <Bookmark
                  // onSelect={this.progressClick}
                  progress={100}
                >
                  Confirmation
                </Bookmark>
              </Timeline>
            </div>
          </div>
          <div className="col-lg-8 col-md-8  full-height-section-wrap">
            <div className="full-height-section-body d-flex align-items-center justify-content-center">
              <div className="align-items-center d-flex justify-content-center">
                <div className="">
                  {progress === 0 && (
                    <ScrollAnimation animateIn="fadeIn">
                      <ConsultLogin
                        onSubmit={this.nextPage}
                        loginToPersonal={() => this.nextPage()}
                      />
                    </ScrollAnimation>
                  )}
                  {progress === 25 && (
                    <ScrollAnimation animateIn="fadeIn">
                      <PersonalDetails />
                    </ScrollAnimation>
                  )}
                  {progress === 50 && (
                    <ScrollAnimation animateIn="fadeIn">
                      <Scheduling appointmentDetail={history.location.state.appointmentDetail} />
                    </ScrollAnimation>
                  )}
                  {progress === 75 && (
                    <ScrollAnimation animateIn="fadeIn">
                      <IntakeDetails />
                    </ScrollAnimation>
                  )}
                  {progress === 100 && (
                    <ScrollAnimation animateIn="fadeIn">
                      <ReviewPay
                        appointmentDetail={
                          history.location.state.appointmentDetail
                        }
                      />
                    </ScrollAnimation>
                  )}
                </div>
              </div>
            </div>
            {progress === 0 || progress === 100 ? (
              ""
            ) : (
              <div className="full-height-section-footer ">
                <span className="btn text-center pb-5">
                  <button
                    type="button"
                    style={{
                      width: "380px",
                      maxWidth: "100%"
                    }}
                    className="btn3 fix-btn"
                    onClick={() => this.nextPage()}
                  >
                    Next <Icon size={24} icon={ic_trending_flat} />
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
  user: state.user
});

export default connect(mapStateToProps)(Appointment);
