import React, { Component } from "react";
import { Tooltip } from "reactstrap";

export default class TooltipHelp extends Component {
  render() {
    return (
      <div>
        <span className="tooltip-help">?</span>
        <Tooltip
          placement={this.props.item.placement}
          isOpen={this.state.tooltipOpen}
          target={"Tooltip-" + this.props.id}
          toggle={this.toggle}
        >
          Tooltip Content!
        </Tooltip>
      </div>
    );
  }
}
