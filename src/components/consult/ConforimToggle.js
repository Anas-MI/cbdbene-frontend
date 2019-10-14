import React, { useState } from "react";
import ReactSvg from "react-svg";
import { Collapse } from "reactstrap";
import classNames from "classnames";

import { imagePack } from "../Constants";

const ConforimToggle = props => {
  const {
    title,
    // description,
    fullDescription
  } = props;

  const [isOpen, setOpen] = useState(false);

  // if (!description) return <div />;
  // if (description.trim() === "") return <div />;

  return (
    <li className="ProductDetails-listItem">
      <div className="ProductDetails-itemTitle">
        {title}
        <button
          className={classNames("ProductDetails-moreBtn tgl-btn", {
            opened: isOpen
          })}
          onClick={() => {
            setOpen(!isOpen);
          }}
        >
          <ReactSvg src={imagePack.plusCircle} />
        </button>
      </div>
      <div className="ProductDetails-itemDescription">
       
        <Collapse className="w-100" isOpen={isOpen}>
          <div style={{ overflow: "hidden" }}>
            <div className="w-100">{fullDescription}</div>
          </div>
        </Collapse>
      </div>
    </li>
  );
};

export default ConforimToggle;
