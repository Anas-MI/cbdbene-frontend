import React from "react";
// import className from "classnames";
import { CatTabSliderTabBtn } from "./catTabSlider";
export default ({ list, hoverCircle }) => {
  const List = list.map((el, key) => (
    <div key={key} className="col-sm-3">
      {
        <CatTabSliderTabBtn
          hoverCircle={hoverCircle}
          title={el.title}
          image={el.image}
        />
      }
    </div>
  ));
  return (
    <div className="continer icon-list-container">
      <div className="row">{List}</div>
    </div>
  );
};
