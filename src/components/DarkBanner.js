import React, { Component } from "react";

export default class DarkBanner extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className="dark-banner">
        <div className="container-extend">
          {title && <h3 className="display-4 d-none d-md-block">{title}</h3>}
          {title && <h3 className="display-4 d-block d-md-none">{title}</h3>}
          {children}
        </div>
      </div>
    );
  }
}
