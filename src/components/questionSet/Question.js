import React from "react";
import classNames from "classnames";

export default ({ title, children, className }) => {
  return (
    <div
      className={classNames("question-set-question text-center", {
        [className]: className
      })}
    >
      <h3>{title}</h3>
      {children}
    </div>
  );
};
