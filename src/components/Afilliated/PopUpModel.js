import React, { Component } from "react";
import { ic_error_outline, ic_done, ic_clear } from "react-icons-kit/md/";
import Icon from "react-icons-kit";
import { Modal, ModalHeader } from "reactstrap";

export default class PopUpModel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.disableModel = this.disableModel.bind(this);
  }
  disableModel() {
    this.props.disableModel();
  }

  render() {
    const { showModal, modalData } = this.props;
    return (
      <div>
        <Modal
          isOpen={showModal}
          toggle={this.disableModel}
          className={"full-modal"}
        >
          <ModalHeader toggle={this.disableModel}>
            {modalData.title}
          </ModalHeader>
          <div className="Modal-body center-modal">
            <div className="modal-inner">
              <div className="modal-content">
                {modalData.title === "Error" ? (
                  <div style={{ color: "#EF233C", textAlign: "center" }}>
                    <Icon
                      className="popup-alert-icon"
                      size={64}
                      icon={ic_error_outline}
                    />
                  </div>
                ) : (
                  <Icon className="popup-alert-icon" size={64} icon={ic_done} />
                )}
                <p className="text-center title-80 p-3">{modalData.msg}</p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
