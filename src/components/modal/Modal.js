import React, { Component } from "react";
import { ic_clear } from "react-icons-kit/md/";
import Icon from "react-icons-kit";
import classNames from "classnames";
import { Modal as ReactModal, ModalHeader } from "reactstrap";

export default class Modal extends Component {
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
    const { isOpen, children, noCross, large, heading } = this.props;
    return (
      <div>
        <ReactModal
          isOpen={isOpen}
          toggle={this.toggle}
          className={classNames("full-modal", {
            large: large
          })}
        >
          {heading && <ModalHeader toggle={this.toggle}>{heading}</ModalHeader>}
          <div className="Modal-body center-modal">
            {!noCross && !heading && (
              <div className="modal-dismiss" onClick={this.toggle}>
                <Icon icon={ic_clear} />
              </div>
            )}
            <div className="modal-inner">
              <div className="modal-content">{children}</div>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
