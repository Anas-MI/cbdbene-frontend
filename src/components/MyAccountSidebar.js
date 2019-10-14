import React, { Component } from "react";
import { connect } from "react-redux";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import Icon from "react-icons-kit";
import classNames from "classnames";
import ListToggler from "./ListToggler";
import {
  shoppingCart,
  heart,
  user,
  infoCircle,
  barChart,
  money,
  mapMarker
} from "react-icons-kit/fa/";
import {ic_playlist_add_check} from 'react-icons-kit/md/'

class MyAccountSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location, activeLink } = this.props;
    return (
      <div className="">
        <ListToggler 
        // max={992}
        max={1}
        >
          <Nav vertical>
            <hr />
            <p>YOUR ORDER</p>
            <NavItem
              className={classNames("my-accountLink", {
                active: activeLink === "MY ACCOUNT"
              })}
            >
              <Link to={"/" + location.countryCode + "/my-account"}>
                <Icon icon={shoppingCart} className="sidebar-icon" />
                MY ORDER
              </Link>
            </NavItem>
            <NavItem
              className={classNames("my-accountLink", {
                active: activeLink === "MY SUBSCRIPTION"
              })}
            >
              <Link to={"/" + location.countryCode + "/my-subscription"}>
                <Icon size={20} icon={ic_playlist_add_check} className="sidebar-icon" />
                MY SUBSCRIPTION
              </Link>
            </NavItem>

            <NavItem
              className={classNames("my-accountLink", {
                active: activeLink === "FAVOURITES"
              })}
            >
              <Link to={"/" + location.countryCode + "/my-favourites"}>
                <Icon icon={heart} className="sidebar-icon" />
                FAVOURITES
              </Link>
            </NavItem>

            <hr />
            <p>YOUR ACCOUNT</p>
            <NavItem
              className={classNames("my-accountLink", {
                active: activeLink === "changePassword"
              })}
            >
              <Link to={"/" + location.countryCode + "/change-password"}>
                <Icon icon={user} className="sidebar-icon" />
                CHANGE PASSWORD
              </Link>
            </NavItem>
            {/* <NavItem
              className={classNames("my-accountLink", {
                active: activeLink === "PROFILE"
              })}
            >
              <Link to={"/" + location.countryCode + "/my-profile"}>
                <Icon icon={user} className="sidebar-icon" />
                MY PROFILE
              </Link>
            </NavItem> */}
            <NavItem
              className={classNames("my-accountLink", {
                active: activeLink === "PAYMENT METHOD"
              })}
            >
              <Link to={"/" + location.countryCode + "/my-address"}>
                <Icon icon={mapMarker} className="sidebar-icon" />
                MY ADDRESS
              </Link>
            </NavItem>
            <NavItem
              className={classNames("my-accountLink", {
                active: activeLink === "CARD METHOD"
              })}
            >
              <Link to={"/" + location.countryCode + "/my-card"}>
                <Icon icon={money} className="sidebar-icon" />
                PAYMENT METHOD
              </Link>
            </NavItem>
            {/* <NavItem
              className={classNames("my-accountLink", {
                active: activeLink === "NOTIFICATION"
              })}
            >
              <Link to={"/" + location.countryCode + "/my-notification"}>
                <Icon icon={infoCircle} className="sidebar-icon" />
                NOTIFICATION
              </Link>
            </NavItem> */}
          </Nav>
        </ListToggler>
        <br />
        <br />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location
});
export default connect(mapStateToProps)(MyAccountSidebar);
