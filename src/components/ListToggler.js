import React, { Component } from "react";
import { Collapse } from "reactstrap";
import { Icon } from "react-icons-kit";
import { ic_menu, ic_close } from "react-icons-kit/md";

export default class ListToggler extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: props.isOpen || false
    };
  }
  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }
  isCollapse(max) {
    const { innerWidth } = window;
    if (!max) return true;
    if (max > innerWidth) return true;

    return false;
  }
  render() {
    const { children, title, max } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        {this.isCollapse(max) && (
          <div className="ListToggler-title">
            <span className="title">{title}</span>
            {isOpen ? (
              <Icon icon={ic_close} size={20} onClick={this.toggle} />
            ) : (
              <Icon icon={ic_menu} size={20} onClick={this.toggle} />
            )}
          </div>
        )}
        {this.isCollapse(max) && (
          <Collapse isOpen={this.state.isOpen}>{children}</Collapse>
        )}
        {!this.isCollapse(max) && <div>{children}</div>}
      </div>
    );
  }
}
