import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Alert,
  Tooltip,
  Collapse
} from "reactstrap";
export class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false
    };
  }
  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  render() {
    const {
      props: { title, description }
    } = this;
    return (
      <div>
        <span
          className="myProifle-enableCheckoutTooltip"
          style={{
            textDecoration: "underline",
            color: "blue"
          }}
          href="#"
          id={this.props.tooltipID}
        >
          {" "}
          ?{" "}
        </span>
        <Tooltip
          placement="right"
          isOpen={this.state.tooltipOpen}
          target={this.props.tooltipID}
          toggle={this.toggle}
        >
          Entering a default shipping address here means you won't have to enter
          an address each time you check out.
        </Tooltip>
      </div>
    );
  }
}
