import React, { Component } from "react";
import { connect } from "react-redux";

class MenuPanel extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="Panel">
        <div className="overflowContainer Panel--overflowScrollable">
          <div className="Panel--verticalFlex">{children}</div>
        </div>
      </div>
    );
  }
}

export default connect()(MenuPanel);
