import React, { Component } from "react";

export default class T2thirdsection extends Component {
  render() {
    return (
      <div className="twouppromo section">
        <div className="two-up-promo section container" id="home-two-up-promo">
          <div className="row section-inner">
            <div className="inner-container">
              <div className="tile-container">{this.props.children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
