import React from "react";
import Icon from "react-icons-kit";

export default ({ heading, content, icon, image }) => (
  <div className="cus-icon-block">
    <div className="cus-icon-block-inner">
      {icon && <Icon icon={icon} className="cus-icon-block-image" />}
      {image && <img src={image} className="cus-icon-block-image" alt="icon" />}
      <div className="cus-icon-block-heading">{heading}</div>
      <div className="cus-icon-block-content">{content}</div>
    </div>
  </div>
);
