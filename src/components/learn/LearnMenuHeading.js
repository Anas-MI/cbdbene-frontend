import React from "react";

const LearnMenuHeading = props => {
  const { title, active, onClick } = props;
  return (
    <p
      onClick={onClick}
      style={{
        fontWeight: active ? 500 : 400
      }}
      class="cursor-pointer"
    >
      {title}
    </p>
  );
};
export default LearnMenuHeading;
