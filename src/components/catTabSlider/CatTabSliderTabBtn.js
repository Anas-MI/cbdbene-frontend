import React from "react";
import classNames from "classnames";
import ReactSvg from "react-svg";

const isSvg = image => image.split(".").reverse()[0] === "svg";

const CatTabSliderTabBtn = ({
  isActive,
  title,
  image,
  onClick,
  hoverCircle
}) => (
  <div
    className={classNames("hs-tab-button", {
      "hs-active": isActive
    })}
    onClick={() => {
      if (typeof onClick === "function") onClick();
    }}
  >
    {image && (
      <span
        className={classNames("hs-tab-image", {
          "hs-icon-hover": hoverCircle
        })}
      >
        {isSvg(image) && <ReactSvg src={image} />}
        {!isSvg(image) && <img alt={title} src={image} />}
      </span>
    )}
    <span className="hs-tab-title cursor-pointer">
      <span className="hs-inner-tab-title">{title}</span>
    </span>
  </div>
);
export default CatTabSliderTabBtn;
