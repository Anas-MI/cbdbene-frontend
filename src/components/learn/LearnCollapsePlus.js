import React from "react";
import Icon from "react-icons-kit";
import { Collapse } from "reactstrap";
import { ic_add, ic_clear } from "react-icons-kit/md";

const LearnCollapsePlus = props => {
  const { isOpen, onClick, title, children } = props;
  return (
    <div className="boxed-collapse-wrapper">
      <div className="cursor-pointer boxed-collapse" onClick={onClick}>
        <span className="d-flex align-items-center justify-content-between">
          <div style={{ fontSize: "19px" }}>{title}</div>
          {isOpen ? (
            <Icon size={24} icon={ic_clear} />
          ) : (
            <Icon size={24} icon={ic_add} />
          )}
        </span>
      </div>
      <Collapse isOpen={isOpen}>
        <div className="boxed-collapse-item">{children}</div>
      </Collapse>
    </div>
  );
};
export default LearnCollapsePlus;
