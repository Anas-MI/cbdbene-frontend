import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";

import { filePath } from "../Constants";
import BasicFunction from "../../services/extra/basicFunction";
const basicFunction = new BasicFunction();

class CartModal extends Component {
  returnPrice(item) {
    const {
      qty: { value: qtyVal },
      regularprice,
      saleprice
    } = item;
    const value = saleprice ? saleprice : regularprice;
    if (value) {
      var returnValue = basicFunction.nombarFormat(value * qtyVal);
      return `$${returnValue}`;
    }
    return ``;
  }
  render() {
    const {
      isOpen,
      toggle,
      title,
      currentItem,
      subTotal,
      location,
      className
    } = this.props;
    const image = currentItem.combo
      ? currentItem.featureimage
      : currentItem.productid.featurefilepath;
    const currentTitle = currentItem.combo
      ? currentItem.title
      : currentItem.productid.producttitle;
    console.log({
      currentItem
    });

    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className={classNames("modal-dialog-right cart-modal", {
          className: className
        })}
      >
        <ModalHeader className="pl-5 pt-4 pb-2 product-title" toggle={toggle}>
          {title}
        </ModalHeader>
        {currentItem && (
          <ModalBody>
            <div className="row">
              <div className="col-sm-3 col-4 p-0">
                <img
                  alt={currentTitle}
                  src={filePath + image}
                  className="cart-product-image-wrap-short"
                />
              </div>
              <div className="col-sm-9 col-8">
                <div className="">
                  <p>{currentTitle}</p>
                  <ul className="cart-modal-variation-ul">
                    <li>
                      Quantity <b>{currentItem.qty && currentItem.qty.label}</b>
                    </li>
                    {currentItem &&
                      currentItem.combo !== true &&
                      currentItem.attributes.map((key, i) => {
                        return (
                          <li key={i}>
                            <div>
                              {" "}
                              {key.names}{" "}
                              <b>
                                {currentItem[key.names]
                                  ? currentItem[key.names].value
                                  : ""}
                              </b>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  <p className="subtotal-cart-modal">
                    Price <b>{this.returnPrice(currentItem)}</b>
                  </p>
                </div>
              </div>
            </div>
          </ModalBody>
        )}
        <ModalFooter className="cart-modal-footer">
          <Link
            to={`/${location.countryCode}/cart`}
            className="btn btn-danger btn9 pl-1 pr-1"
          >
            VIEW BAG
          </Link>

          <Link
            to={`/${location.countryCode}/checkout`}
            className="btn btn-danger btn5 pl-1 pr-1"
          >
            CHECKOUT
          </Link>
          <p className="small pl-2 pr-1 w-100 mt-1">
            Total <b>{basicFunction.currancyAddWithNumber(subTotal)}</b>
          </p>
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location
});

export default connect(mapStateToProps)(CartModal);
