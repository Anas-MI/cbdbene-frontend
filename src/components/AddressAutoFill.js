import React, { Component } from "react";
import classNames from "classnames";
import PlacesAutocomplete from "react-places-autocomplete";
import { ic_search } from "react-icons-kit/md/";
import Icon from "react-icons-kit";
import { regExReplace } from "./Constants";

import {allCountryWithValidName} from "../services/extra/allCountryWithValidName";
export default class AddressAutoFill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      fill: false,
      city: "",
      state: "",
      country: "",
      other: "",
      other_err: false,
      city_err: false,
      state_err: false,
      country_err: false
    };
    this.setAllValue = this.setAllValue.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  componentDidMount() {

  }
  onTextChange(e) {
    const { value, id, attributes } = e.target;

    // if (attributes["data-validate"])
    // type = attributes["data-validate"].value

    let pattern = null;
    if (attributes["data-pattern"]) pattern = attributes["data-pattern"].value;

    let newValue = value;

    if (pattern) {
      newValue = value.replace(regExReplace[pattern], "");
    }
    // if(id === 'country'){
    //    this.countryValidation(newValue)
    // }
    

    this.setState(
      {
        [id]: newValue,
        [id + "_err"]: true
      },
      () => {
        const { city, state, country, other, zip } = this.state;
        this.props.autofillformresponse({ country, state, city, other, zip });
      }
    );
  }

  // //code for check country valid or not
  // countryValidation(value){
  //   const countryObject=allCountryWithValidName;
  //   countryObject.forEach(function(itm,index){
  //     if(itm.name===value){
  //       console.log('xxxxxxxxx ',value + 'match to name');
  //     }
  //     if(itm.alpha2Code==value){
  //       console.log('xxxxxxxxx ',value + 'match to alpha2Code');
  //     }
  //     if(itm.alpha3Code===value){
  //       console.log('xxxxxxxxx ',value + 'match to alpha3Code');
  //     }
  //     const altSpellings= itm.altSpellings;
  //     altSpellings.forEach(function(alt,index){
  //       if(value===alt){
  //         console.log('xxxxxxxxx ',value + 'match to altSpellings');
  //       }
  //     })
      
  //   })
  // }

  handleChange = address => {
    this.setState({ address, fill: true });
  };

  handleSelect = address => {
    const arr = address.split(",");
    const size = arr.length;
    const country = arr[size - 1].trim();
    const state = arr[size - 2];
    const city = arr[size - 3];
    const other = arr[0];
    this.setState({
      country,
      state,
      city,
      other,
      address
    });
    console.log({
      address
    });
    const searchStr = `https://maps.googleapis.com/maps/api/geocode/json?address=${address
      .split(" ")
      .join("+")}&key=AIzaSyBXxXfKy5wtHEO9XniOvGEKPME-_ldClVk`;

    fetch(searchStr, {
      headers: {
        "Accept-Encoding": "gzip",
        "User-Agent": "my program (gzip)"
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log({ res });
        if (res.results && res.results.length > 0) {
          const address = res.results[0].address_components;
          const zipObj = address.find(
            el => el.types && el.types.includes("postal_code")
          );
          if (zipObj && zipObj.short_name) {
            const zip = zipObj.short_name;
            this.setState(
              {
                zip
              },
              () => {
                this.props.autofillformresponse({
                  country,
                  state,
                  city,
                  other,
                  zip
                });
              }
            );
          } else {
            this.setState(
              {
                zip: ""
              },
              () => {
                this.props.autofillformresponse({
                  country,
                  state,
                  city,
                  other,
                  zip: ""
                });
              }
            );
          }
        }
      })
      .catch(err => {
        console.log({ err });
        this.setState(
          {
            zip: ""
          },
          () => {
            this.props.autofillformresponse({
              country,
              state,
              city,
              other,
              zip: ""
            });
          }
        );
      });
  };
  setAllValue() {
    const {
      country,
      state,
      city,
      address,
      zip
    } = this.props.autofilladddatatoparent;
    if (country) {
      this.setState({
        country,
        state,
        city,
        fill: true,
        other: address,
        address,
        zip
      });
    }
  }
  render() {
    const { fill, city, state, country, other, zip } = this.state;
    const { address_err, zipErr } = this.props;
    if (this.props.autofilladddatatoparent.country) {
      if (!fill) {
        this.setAllValue();
      }
    }
    const colSize = this.props.colSize || 6;
    return (
      <div>
        <div className="row frm-details">
          <div className={"col-md-" + colSize}>
            <div
              className={classNames("has-input", {
                "has-error": false
              })}
            >
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div>
                    <label>Search Your Address </label>
                    <div
                      className={classNames(
                        "has-icon-submit has-input search-input inputwrapper",
                        {
                          "has-error":
                            address_err[0] &&
                            address_err[1] &&
                            address_err[2] &&
                            address_err[3]
                        }
                      )}
                    >
                      <div style={{ color: "#d0d2ca" }}>
                        <Icon
                          className="submit-icon input-search-icon mt-10 ci"
                          size={25}
                          icon={ic_search}
                        />
                      </div>
                      <input
                        {...getInputProps({
                          placeholder: "Search Places ...",
                          className: "location-search-input"
                        })}
                      />
                      {address_err[0] &&
                      address_err[1] &&
                      address_err[2] &&
                      address_err[3] ? (
                        <p className="error">Address is required</p>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? {
                              backgroundColor: "#fafafa",
                              cursor: "pointer",
                              padding: "10px"
                            }
                          : {
                              backgroundColor: "#ffffff",
                              cursor: "pointer",
                              padding: "10px"
                            };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
          </div>
          <div className={"col-md-" + colSize}>
            <div
              className={classNames(" has-input", {
                "has-error": address_err[0]
              })}
            >
              <label>Address</label>
              <input
                value={other}
                type="text"
                id="other"
                onChange={this.onTextChange}
              />
              {address_err[0] && <p className="error">Address is required</p>}
            </div>
          </div>
          <div className={"col-md-" + colSize}>
            <div
              className={classNames(" has-input", {
                "has-error": address_err[2] || address_err[4]
              })}
            >
              <label>Country</label>
              <input
                value={country}
                type="text"
                id="country"
                onChange={this.onTextChange}
                data-validate={["fullName"]}
                data-pattern="fullName"
                maxLength="30"
              />
              {address_err[2] &&
                !(address_err.length === 5 && address_err[4]) && (
                  <p className="error">{ country.trim().length>0 ? 'Country is not valid.':'Country is required'} </p>
                )}
              {address_err.length === 5 && address_err[4] && (
                <p className="error">CBD Bené offers shipping to USA only.</p>
              )}
            </div>
          </div>

          <div className={"col-md-" + colSize}>
            <div
              className={classNames(" has-input", {
                "has-error": address_err[3]
              })}
            >
              <label>State</label>
              <input
                type="text"
                value={state}
                id="state"
                onChange={this.onTextChange}
                data-validate={["fullName"]}
                data-pattern="fullName"
                maxLength="30"
              />
              {address_err[3] && <p className="error">State is required</p>}
            </div>
          </div>
          <div className={"col-md-" + colSize}>
            <div
              className={classNames(" has-input", {
                "has-error": address_err[1]
              })}
            >
              <label>City</label>
              <input
                value={city}
                type="text"
                id="city"
                onChange={this.onTextChange}
                data-validate={["fullName"]}
                data-pattern="fullName"
                maxLength="30"
              />
              {address_err[1] && <p className="error">City is required</p>}
            </div>
          </div>
          <div className={"col-md-" + colSize}>
            <div
              className={classNames(" has-input", {
                "has-error": zipErr
              })}
            >
              <label>Zip Code</label>
              <input
                value={zip}
                type="text"
                id="zip"
                onChange={this.onTextChange}
                data-validate={["zipcode", "required"]}
                data-pattern=""
                maxLength="12"
              />
              {zipErr && <p className="error">Zip Code is required</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
