import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import ConforimToggle from "./ConforimToggle";
import "animate.css/animate.min.css";
class BookAppointment extends Component {
  render() {
    const { className } = this.props;
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
            <select className="form-control">
              <option>No Appointment</option>
              <option>Set Up Here</option>
            </select>
            <br />
            <br />
            <p>Duration</p>
            <br />
            <p>Time Zone</p>
            <br />
            <p>Date</p>
            <br />
            <p>Timeslot</p>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location
});

export default connect(mapStateToProps)(BookAppointment);
