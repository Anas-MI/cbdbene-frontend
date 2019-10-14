import React, { Component } from "react";
import classNames from "classnames";

export default class ListNavigation extends Component {
  render() {
    const { current, list } = this.props;
    const myList = new Array(list).fill(null).map((el, index) => (
      <div
        key={index}
        className={classNames("list-navigation-item", {
          "is-current": current === index,
          "is-filled": current >= index
        })}
      >
        <span />
      </div>
    ));
    return (
      <div className="list-navigation">
        <div className="list-navigation-inner">{myList}</div>
      </div>
    );
  }
}
