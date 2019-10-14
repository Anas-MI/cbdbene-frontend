import React, { Component } from "react";
import { imagePack } from "../Constants";
export default class Consultations extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="row align-items-center d-flex justify-content-center height100vh">
        <div className="col-lg-4">
          <img className="img-fluid" src={imagePack.logo} />
        </div>

        <div className="col-lg-8 ">
          <div className="">
            <h3>Consultations</h3>
            <p>
              Consult our doctors , Who have rich experience with CBD to get a
              good idea about how your body will react to CBD
            </p>
            <p>Overall Review of Your Health History & Dose Titrations.</p>
            <p>Potential Drug Interacions with Prescription Medicines.</p>
            <p>Management of Adverse reaction to CBD if any</p>
          </div>
          {/* <div className=" content_section_3 mb-xl-5">
                <a  >Book an Appointment</a>
                <a className="ml-5">I'm here for my appointment</a>
            </div> */}
        </div>
      </div>
    );
  }
}
