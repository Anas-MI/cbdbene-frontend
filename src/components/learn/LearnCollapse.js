import React from "react";
import Icon from "react-icons-kit";
import { Collapse } from "reactstrap";
import {
  ic_keyboard_arrow_down,
  ic_keyboard_arrow_up
} from "react-icons-kit/md";

const LearnCollapse = props => {
  const { isOpen, onClick, title, children } = props;
  return (
    <div
      style={{
        marginBottom: "10px",
        border: "1px solid #ccc"
      }}
      className=""
    >
      <div
        style={{
          borderBottom: "1px solid transparent",
          background: "#edebe3",
          paddingLeft: "15px",
          paddingRight: "15px"
        }}
        className="pt-2 pb-2 cursor-pointer"
        onClick={onClick}
      >
        <h4 style={{ fontWeight: 400, marginBlock: 0 }}>
          <span className="d-flex align-items-center justify-content-between">
            <div style={{ fontSize: "19px" }}>{title}</div>
            {isOpen ? (
              <Icon size={24} icon={ic_keyboard_arrow_up} />
            ) : (
              <Icon size={24} icon={ic_keyboard_arrow_down} />
            )}
          </span>
        </h4>
      </div>
      <Collapse isOpen={isOpen}>
        <div className="learn-collapse-list">{children}</div>
      </Collapse>
    </div>
  );
};
export default LearnCollapse;
