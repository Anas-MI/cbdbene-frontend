import React from "react";
import { Modal, ModalHeader } from "reactstrap";

const ActionModal = props => {
  const {
    isOpen,
    toggle,
    onAccept,
    onReject,
    acceptText,
    rejectText,
    children,
    heading
  } = props;
  return (
    <Modal isOpen={isOpen} toggle={toggle} className={"full-modal"}>
      {heading && <ModalHeader toggle={toggle}>{heading}</ModalHeader>}
      <div className="Modal-body center-modal pt-5">
        <div className="modal-inner pt-5">
          <div className="modal-content">
            {children}
            <div className="row justify-content-center">
              <div className="p-5">
                <span onClick={onAccept} className="btn">
                  {acceptText ? acceptText : "Yes"}
                </span>
              </div>
              <div className="p-5">
                <span onClick={onReject} className="btn">
                  {rejectText ? rejectText : "No"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ActionModal;
