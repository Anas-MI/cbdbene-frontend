import React from "react";

const ProductUseList = props =>
  props.list.map((el, index) => {
    if (el && index > 0) {
      const { title, description } = el;
      if (el.title.trim() !== "" && el.description.trim() !== "") {
        return (
          <li key={index} className="PDPExpectationsContentList-detailsItem">
            <span className="PDPExpectationsContentList-detailsHeadline">
              {title}
            </span>
            <span className="PDPExpectationsContentList-detailDescription">
              {description}
            </span>
          </li>
        );
      }
    }
    return null;
  });

export default ProductUseList;
