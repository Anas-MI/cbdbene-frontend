import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { msg, heading } = this.props;
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          {heading && <ModalHeader toggle={this.toggle}>{heading}</ModalHeader>}
          <ModalBody>{msg}</ModalBody>
        </Modal>
      </div>
    );
  }
}
