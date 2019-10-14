import React from "react";
export default ({ progress }) => (
  <div className="progress-slide-wrapper">
    <div className="progress-slide-inner">
      <div
        style={{
          width: `${progress}%`
        }}
        className="progress-slide-fill"
      />
    </div>
  </div>
);
