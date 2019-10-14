import React, { Component } from "react";

export class Quate extends Component {
  render() {
    const {
      props: { title, description }
    } = this;
    return (
      <div className="quote-sec">
        <div className="quote-sec-inside">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
