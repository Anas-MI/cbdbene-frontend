import React, { Component } from "react";
import { connect } from "react-redux";

import { ic_keyboard_backspace } from "react-icons-kit/md/ic_keyboard_backspace";
import { filePath, imagePack } from "./Constants";
import Icon from "react-icons-kit";
import { lock, ticket, globe } from "react-icons-kit/fa";
import { Link } from "react-router-dom";
import {
  checkoutHeaderRightSideIconWarranty,
  checkoutHeaderRightSideIcondelivery,
  checkoutHeaderRightSideIconSecurepayment,
  projectName
} from "../constantMessage";
import { toggleCartBar } from "../actions";
class HeaderCheckOut extends Component {
  componentDidMount() {
    if (this.props.isOpen) {
      this.props.toggleCartBar();
    }
  }
  render() {
    const { location } = this.props;

    return (
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 order-2 order-md-0  shopLink">
            <Link to={"/" + location.countryCode + "/shop"}>
              <Icon icon={ic_keyboard_backspace} />
              <span style={{ marginLeft: "10px" }}> CONTINUE SHOPPING</span>
            </Link>
          </div>
          <div className="col-md-4 order-0 order-md-1  logoChckout text-center">
            <Link to={"/" + location.countryCode}>
              <img
                // src={filePath + logoUrl} // ? logoUrl : maxfireImg}
                src={imagePack.logo}
                alt={projectName}
                className="logo-image"
              />
            </Link>
          </div>
          <div className="col-md-4 order-md-2 infoChckout">
            <div className="row  justify-content-end">
              <div className="col-lg-3 col-md-4 col-4 ">
                <div className="checkout-header-right-side-banner">
                  <Icon
                    icon={ticket}
                    className="checkout-header-icon"
                    size="25"
                  />
                  <p className="small">{checkoutHeaderRightSideIconWarranty}</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-4">
                <div className="checkout-header-right-side-banner">
                  <Icon
                    icon={globe}
                    className="checkout-header-icon"
                    size="25"
                  />
                  <p className="small">{checkoutHeaderRightSideIcondelivery}</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-4">
                <div className="checkout-header-right-side-banner">
                  <Icon
                    icon={lock}
                    className="checkout-header-icon"
                    size="25"
                  />
                  <p className="small">
                    {checkoutHeaderRightSideIconSecurepayment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location,
  isOpen: state.cartSideBar.isOpen
});
export default connect(
  mapStateToProps,
  { toggleCartBar }
)(HeaderCheckOut);
