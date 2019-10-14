import React from "react";
import Icon from "react-icons-kit";

export default ({ title, msg, icon }) => {
  return (
    <div className="error-block w-430 mx-auto">
      {icon && (
        <div className="error-inner-icon pr-4">
          <Icon icon={icon} size={24} />
        </div>
      )}
      <div className="error-inner">
        <p className="error-heading">{title}</p>
        <span>{msg}</span>
      </div>
    </div>
  );
};
