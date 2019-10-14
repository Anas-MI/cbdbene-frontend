import React, { Component } from "react";

export default class ReviewPay extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { doctorName, date, time } = this.props.appointmentDetail;
    return (
      <div className="">
        <div className="row align-items-center d-flex justify-content-center">
          <div
            style={{
              width: "860px",
              maxWidth: "100%"
            }}
            className="p-md-4 text-center p-3 w-430 register border bg-p2 shadow shadowBoxBackground"
          >
            <p className="pt-5">
              Your Appointment with <b>{doctorName}</b>, scheduled for{" "}
              <b>{`${date.data}, ${time}`}</b> is waiting for a confirmation.
            </p>
            <p className="pb-4">{`Thank you for choosing Bené`}</p>
            {/* <h3>Personal Details</h3> */}
            {/* <p>All entries</p>
            <h5>Scheduling</h5>
            <p>All entries</p>
            <br />
            <h5>Intake Detail</h5>
            <p>All entries and responses</p>
            <br />
            <h5>Review and PAY now to book</h5>
            <p>
              You can edit these details later an from the dashbaord as well
            </p> */}
          </div>
        </div>
      </div>
    );
  }
}
