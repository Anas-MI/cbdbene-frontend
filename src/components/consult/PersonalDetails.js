import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { city_states } from "../../services/extra/countrySelectorOption";
// import { ic_picture_in_picture } from "react-icons-kit/md";
export default class PersonalDetails extends Component {
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
    var stateList = city_states["United States"].split("|");
    return (
      <div className="">
        <div className="row ">
          <div className="p-md-4 p-3 w-430 register border bg-p2 shadow shadowBoxBackground ">
            <div className="inside-form Larger ">
              <form>
                <div className="top-section">
                  <div className="has-input">
                    <label>Name:</label>
                    <input
                      id="login_email"
                      name="login_email"
                      // value=""
                      // onChange=""
                      type="text"
                      data-validate={["email", "required"]}
                    />
                  </div>
                  <div className="has-input pb-3">
                    <label>Sex:</label>

                    <label
                      style={{
                        display: "inline-block",
                        float: "none",
                        width: "auto",
                        paddingRight: "15px"
                      }}
                      className="radio"
                    >
                      <span>Male</span>
                      <input
                        type="radio"
                        // checked="checked"
                        defaultChecked={true}
                        name="is_company"
                      />
                      <span className="checkround" />
                    </label>
                    <label
                      style={{
                        display: "inline-block",
                        float: "none",
                        width: "auto",
                        paddingRight: "15px"
                      }}
                      className="radio"
                    >
                      <span>Female</span>
                      <input type="radio" name="is_company" />
                      <span className="checkround" />
                    </label>
                  </div>
                  <div className="has-input">
                    <label>Date Of Birth:</label>
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChange} //only when value has changed
                    />
                  </div>
                  <div className="has-input">
                    <label>Weight:</label>
                    <select
                      id="login_password"
                      // name="login_password"
                      // value=""
                      // onChange=""
                    >
                      <option>> 60 Lbs</option>
                      <option>60-75 Lbs</option>
                      <option>75-100 Lbs</option>
                      <option>>125 Lbs</option>
                    </select>
                  </div>
                  <div className="has-input">
                    <label>State:</label>
                    <select
                      id="login_password"
                      // name="login_password"
                      // value=""
                      // onChange=""
                    >
                      {stateList &&
                        stateList.length > 0 &&
                        stateList.map(key => {
                          return <option value={key}>{key}</option>;
                        })}
                    </select>
                  </div>
                  {/* <button
                    style={{ opacity: "0" }}
                    type="button"
                    onClick={() => this.props.loginToPersonal()}
                    className="btn btn-main btn3 w-100"
                  >
                    I'm new, Sing up later
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
