import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import $ from "jquery";
import { Icon } from "react-icons-kit";
import { heart, heartO } from "react-icons-kit/fa";

import { MainMenus } from "./";
import { CustomLink } from "../";
import { unsetUser } from "../../actions";

class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.toggleSubMenu = this.toggleSubMenu.bind(this);
    this.hideMobileMenu = this.hideMobileMenu.bind(this);
    this.state = {
      showMobileMenu: false,
      openedSubMenu: null
    };
  }
  componentDidMount() {
    document.body.style.overflow = "";
  }
  toggleMobileMenu() {
    this.setState(
      prevState => ({
        showMobileMenu: !prevState.showMobileMenu
      }),
      () => {
        if (this.state.showMobileMenu) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
        $(this.refs.menu_item).fadeToggle();
      }
    );
  }
  hideMobileMenu() {
    this.setState(
      {
        showMobileMenu: false
      },
      () => {
        document.body.style.overflow = "";
        $(this.refs.menu_item).fadeOut();
      }
    );
  }
  toggleSubMenu(key) {
    const { openedSubMenu } = this.state;
    if (openedSubMenu === key) {
      this.setState({
        openedSubMenu: null
      });
    } else {
      this.setState({
        openedSubMenu: key
      });
    }
  }
  render() {
    const { location, menus, cart, user, wishList } = this.props;
    const { showMobileMenu, openedSubMenu } = this.state;

    const cartCount =
      cart &&
      cart.items &&
      cart.items
        .map(el => el.qty.value)
        .reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
    const wishListCount = wishList && wishList.length;
    const accountLabel = user && user.userMetaObj && user.userMetaObj.firstname ? `Hi, ${user.userMetaObj.firstname}` : "My Account"
    return (
      <ul className="Nav-list Nav-list-loginAndCart Nav-list--small">
        <li className="Nav-listItem ">
          <CustomLink to={`/${location.countryCode}/cart`}>
            <button
              className="Nav-cart"
              onClick={this.hideMobileMenu}
              data-count={cartCount}
              type="button"
            />
          </CustomLink>
        </li>
        <li className="Nav-listItem ">
          <CustomLink
            to={
              this.props.user._id
                ? `/${location.countryCode}/my-favourites`
                : `/${location.countryCode}/favourites`
            }
          >
            <button
              className={classNames("Nav-heart", {
                favHeart: wishListCount > 0
              })}
              onClick={this.hideMobileMenu}
              data-count={wishListCount}
              type="button"
            >
              {wishListCount > 0 && <Icon icon={heart} />}
              {wishListCount <= 0 && <Icon icon={heartO} />}
              {wishListCount > 0 && (
                <span className="heart-count">{wishListCount}</span>
              )}
            </button>
          </CustomLink>
        </li>
        <li className="Nav-listItem">
          <button
            className={classNames("Nav-panelToggle", {
              open: showMobileMenu
            })}
            onClick={this.toggleMobileMenu}
            type="button"
          />
        </li>
        <div ref="menu_item" className="mobile-menus">
          <MainMenus
            menus={menus}
            isSmall={true}
            toggleMobileMenu={this.toggleMobileMenu}
            openedSubMenu={openedSubMenu}
            toggleSubMenu={this.toggleSubMenu}
            showMobileMenu={showMobileMenu}
          />
          {user._id && (
            <li
              key="loginMenu"
              className={classNames("Nav-listItem has-submenu", {
                open: openedSubMenu === "loginMenu"
              })}
              onClick={() => {
                this.toggleSubMenu("loginMenu");
              }}
            >
              <CustomLink
                className={classNames("CustomLink Nav-listLink")}
                to={"#"}
              >
                <span className="CustomLink-content">{accountLabel}</span>
              </CustomLink>
              <ul className={classNames("inner_submenu mobile_inner_submenu")}>
                <li onClick={this.toggleMobileMenu}>
                  <CustomLink
                    className="CustomLink Nav-listLink"
                    to={`/${location.countryCode}/my-account`}
                  >
                    <span className="CustomLink-content">My Order</span>
                  </CustomLink>
                </li>
                <li onClick={this.toggleMobileMenu}>
                  <CustomLink
                    className="CustomLink Nav-listLink"
                    to={`/${location.countryCode}/my-profile`}
                  >
                    <span className="CustomLink-content">Profile</span>
                  </CustomLink>
                </li>
                <li onClick={this.toggleMobileMenu}>
                  <CustomLink
                    className="CustomLink Nav-listLink"
                    to={"#"}
                    onClick={this.props.logout}
                  >
                    <span className="CustomLink-content">Logout</span>
                  </CustomLink>
                </li>
              </ul>
            </li>
          )}
          {!user._id && (
            <li className={classNames("Nav-listItem")}>
              <CustomLink
                className={classNames("CustomLink Nav-listLink")}
                to={`/${location.countryCode}/login`}
                onClick={this.toggleMobileMenu}
              >
                <span className="CustomLink-content">Login</span>
              </CustomLink>
            </li>
          )}
        </div>
      </ul>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location,
  user: state.user,
  cart: state.cart,
  wishList: state.wishList
});
export default connect(
  mapStateToProps,
  {
    unsetUser
  }
)(MobileMenu);
