import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default class Scheduling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    // console.log({
    //   appointmentDetail: this.props.appointmentDetail
    // })
    // const {
    //   date,
    //   time
    // } = this.props.appointmentDetail
    return (
      <div className="">
        <div className="row ">
          <div className="p-md-4 p-3 w-430 register border bg-p2 shadow shadowBoxBackground ">
            <div className="inside-form Larger ">
              <form>
                <div className="has-input">
                  <label>
                    How Long do you expect this consultation to go on for?:
                  </label>

                  <label
                    htmlFor="aa"
                    style={{
                      display: "inline-block",
                      float: "none",
                      width: "auto",
                      paddingRight: "15px"
                    }}
                    className="radio"
                  >
                    <span>15 Mins</span>
                    <input
                      type="radio"
                      defaultChecked={true}
                      id="aa"
                      name="is_company"
                    />
                    <span className="checkround" />
                  </label>
                  <label
                    htmlFor="ab"
                    style={{
                      display: "inline-block",
                      float: "none",
                      width: "auto",
                      paddingRight: "15px"
                    }}
                    className="radio"
                  >
                    <span>30 Mins</span>
                    <input type="radio" id="ab" name="is_company" />
                    <span className="checkround" />
                  </label>
                </div>
                {/* <p>Please select your time zone</p>

                <a href="#/" className=" btn3">
                  Time Zone
                </a> */}

                {/* <div className="has-input">
                  <label>Calender and time slot suggestions:</label>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange} //only when value has changed
                    showTimeSelect
                    dateFormat="Pp"
                  />
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
