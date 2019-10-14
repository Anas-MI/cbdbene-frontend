import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ConforimToggle from "./ConforimToggle";
import "animate.css/animate.min.css";
import classNames from "classnames";

class ConfirmAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemain: 120,
      time: {},
      seconds: 120000
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.round(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.round(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { location, className } = this.props;
    return (
      <div
        className={classNames("container", {
          [className]: className
        })}
      >
        <div className="row  align-content-center height100vh justify-content-center  height100vh">
          <div className="col-lg-4 col-md-4 shadowBoxBackground p-5">
            <h3>Patients Details</h3>
            <ul className="ProductDetails-list">
              <ConforimToggle
                title="Consults History"
                description="test"
                fullDescription="Consults History Consults History Consults History Consults History Consults History"
              />
              <ConforimToggle
                title="Payment History"
                description="test"
                fullDescription="Payment History Payment History Payment History Payment History Payment History"
              />
            </ul>
          </div>
          <div className="col-lg-7 col-md-7 offset-1 shadowBoxBackground p-5">
            <h3>Appointment Details</h3>
            <br />
            <p> Reschedule or Cancel</p>
            <br />
            <br />
            <p>Doctors Details</p>
            <br />
            <br />
            <p>
              {" "}
              m: {this.state.time.m} s: {this.state.time.s} (Waiting Room)
            </p>
            <Link to={`/${location.countryCode}/appointment-details`}>
              Next Page
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location
});

export default connect(mapStateToProps)(ConfirmAppointment);
