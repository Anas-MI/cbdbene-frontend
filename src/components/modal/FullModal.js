import React, { Component } from "react";
import { ic_clear } from "react-icons-kit/md/";
import Icon from "react-icons-kit";
import { Modal as ReactModal } from "reactstrap";

export default class FullModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    const { toggle } = this.props;
    if (typeof toggle === "function") toggle();
  }

  render() {
    const { isOpen, children } = this.props;
    return (
      <div>
        <ReactModal
          isOpen={isOpen}
          toggle={this.toggle}
          className={"full-screen-modal"}
        >
          <div className="Modal-body full-screen-modal-body">
            <div className="modal-dismiss" onClick={this.toggle}>
              <Icon icon={ic_clear} />
            </div>
            <div className="modal-inner">
              <div className="modal-content">{children}</div>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
