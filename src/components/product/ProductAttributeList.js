import React from "react";

const ProductAttributeList = props =>
  props.list.map((el, index) => {
    const { title, description } = el;
    if (el.title.trim() !== "" && el.description.trim() !== "") {
      return (
        <li
          key={index}
          className="ProductDetails-listItem ProductDetails-listItem--1"
        >
          <div className="ProductDetails-itemTitle">{title}</div>
          <div className="ProductDetails-itemDescription">{description}</div>
        </li>
      );
    }
    return null;
  });

export default ProductAttributeList;
