import React, { Component } from "react";

export default class HowDoesWork extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <section
        className="PDPExpectations-wrapper theme-alabaster-2 is-visible"
        data-component="PDPExpectations"
        data-global-ref="ScrollRevealer-reveal"
      >
        <div
          className="PDPExpectations-fullImageWrapper PDPExpectations-fullImageWrapper--withObjectFit"
          data-ref="PDPExpectations-fullImageWrapper"
        >
          <span className="PDPExpectations-fullImageInner">
            <picture
              className="Picture PDPExpectations-fullImage"
              data-ref="PDPExpectations-fullImage"
            >
              <source srcSet="https://www.dplindbenchmark.com/wp-content/uploads/2014/05/Happy-Doctors.jpg" />
              <img alt="consult" />
            </picture>
          </span>
        </div>

        <div className="PDPExpectationsContent-wrapper">
          <div className="PDPExpectationsContent-inner">
            <div className="PDPExpectationsContent-sectionOne">
              <div className="PDPExpectationsContentSummary">
                <h2 className="PDPExpectationsContentSummary-title">
                  How Does it Work ?
                </h2>
              </div>
            </div>
            <div className="PDPExpectationsContent-sectionTwo">
              <ul className="PDPExpectationsContentList-details">
                <li className="PDPExpectationsContentList-detailsItem">
                  <span className="PDPExpectationsContentList-detailDescription">
                    Appointment Scheduling takes less than 5 minutes
                  </span>
                </li>
                <li className="PDPExpectationsContentList-detailsItem">
                  <span className="PDPExpectationsContentList-detailDescription">
                    We will notify you in advance teleponecally when your
                    appointment will be due.
                  </span>
                </li>
                <li className="PDPExpectationsContentList-detailsItem">
                  <span className="PDPExpectationsContentList-detailDescription">
                    Go to your dashboard , Consult with your doctor throgh video
                    conference or telephone
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
