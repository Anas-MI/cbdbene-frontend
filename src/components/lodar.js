import React, { Component } from "react";

export default class Lodar extends Component {
  render() {
    return (
      <div className="mainLoder">
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
          <div className="bounce4" />
        </div>
      </div>
    );
  }
}
