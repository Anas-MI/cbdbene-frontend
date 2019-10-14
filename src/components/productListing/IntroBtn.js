import React from "react";
import ReactSVG from "react-svg";
import { imagePack } from "../Constants";
import { CustomLink } from "../";

export default ({ children, link, onClick, ...props }) => {
  return (
    <div className="CPSubcatIntroCTA" {...props}>
      <CustomLink
        className="CPSubcatIntroCTA-btn"
        to={link ? link : "#"}
        onClick={() => {
          if (typeof onClick === "function") onClick();
        }}
      >
        <div className="CPSubcatIntroCTA-wrapper">
          <span className="CPSubcatIntroCTA-text">{children}</span>
          <ReactSVG width="40" src={imagePack.rightArrow} />
        </div>
      </CustomLink>
    </div>
  );
};
