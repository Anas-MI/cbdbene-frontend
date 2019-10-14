import React from "react";
import { emptyCart } from "../../constantMessage";

const EmptyCart = props => {
  const { children } = props;
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center pt-5">
          <h1 className="product-title">0 ITEMS</h1>
          <br />
          <h1 className="product-title">{emptyCart}</h1>
          <br />
          <br />
          {children}
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
