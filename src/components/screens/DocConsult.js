import React, { Component } from "react";
import { Lodar } from "../";
export default class DocConsult extends Component {
  componentDidMount() {
    window.location.href = process.env.PUBLIC_URL + "/doc-consult";
  }
  render() {
    return <Lodar />;
  }
}
