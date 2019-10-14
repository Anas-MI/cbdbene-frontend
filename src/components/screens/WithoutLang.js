import React, { Component } from "react";
import { Lodar } from "../";
export default class WithoutLang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: window.location.pathname,
      url: window.location.href,
      origin: window.location.origin
    };
  }
  render() {
    return (
      <div>
        <Lodar />
      </div>
    );
  }
}
