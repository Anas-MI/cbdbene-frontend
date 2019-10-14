import React, { Component } from "react";
import { ic_error_outline } from "react-icons-kit/md/";
import Icon from "react-icons-kit";
import { Modal, ModalHeader } from "reactstrap";
import { confirmLogout } from "../../constantMessage";
export default class LogoutConfirmModel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.confirmLogout = this.confirmLogout.bind(this);
    this.cancelLogout = this.cancelLogout.bind(this);
  }
  confirmLogout() {
    this.props.confirmLogout();
  }
  cancelLogout() {
    this.props.cancelLogout();
  }
  render() {
    const { confirmLogoutstats } = this.props;
    return (
      <div>
        <Modal
          isOpen={confirmLogoutstats}
          toggle={this.cancelLogout}
          className={"full-modal"}
        >
          <ModalHeader toggle={this.cancelLogout}>{confirmLogout}</ModalHeader>
          <div className="Modal-body center-modal">
            <div className="modal-inner">
              <div className="modal-content p-3">
                <Icon
                  icon={ic_error_outline}
                  className="text-center"
                  size="64"
                />
                <br />
                <p className="text-center title-80">
                  Do you really want to logout?
                </p>
                <div className="row">
                  <div className="col-6 text-center">
                    <button
                      className="btn w15 btn-info btn6 m-auto"
                      onClick={this.confirmLogout}
                    >
                      Yes
                    </button>
                  </div>
                  <div className="col-6 text-center">
                    <button
                      className="btn w15 btn-info btn7 m-auto"
                      onClick={this.cancelLogout}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
