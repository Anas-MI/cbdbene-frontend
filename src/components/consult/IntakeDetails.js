import React, { Component } from "react";

export default class IntakeDetails extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="">
        <div className="row ">
          <div
            style={{
              width: "600px",
              maxWidth: "100%"
            }}
            className="p-md-4 p-3 register border bg-p2 shadow shadowBoxBackground"
          >
            <div className="inside-form Larger ">
              <form>
                <div className="has-input">
                  <h5>Allergies , Medications &amp; Dietary Supplements</h5>
                  <ol className="howSoesLi">
                    <li>
                      Please list the things you are allergic to here . For
                      example: Pollen: Nasal congestion , Peanuts : Anaphylaxis,
                      Strawberries: Hives, Etc.
                    </li>
                    <br />
                    <li>
                      Please list your medications here. If possible , please
                      provide the dose , and when you take them . Example:
                      Valium , 2 mg at night , 5 mg twice daily
                    </li>
                    <br />
                    <li>
                      Please list your dietary supplements here . If possible ,
                      Please provide the dose , and when you take them . Example
                      : Vitamin D , 400 IU daily, Magnesium 300 mg twice daily
                    </li>
                  </ol>
                  <h5>Current Condition and Medical History</h5>
                  <p>
                    Please list all the medical conditions, including surgeries
                    and diagnoses, that you have experienced in the past or are
                    currently experiencing.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
