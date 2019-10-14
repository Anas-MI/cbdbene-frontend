import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { toggleCartBar, setLearnSubMenu, setActiveMenu } from "../actions";

import { Icon } from "react-icons-kit";
import { shopping_cart } from "react-icons-kit/ikons/";
import { heart, heartO } from "react-icons-kit/fa";
import {
  // MainMenus,
  MobileMenu,
  MenuLink
} from "./menu";
import { imagePack } from "./Constants";
import MenuList from "./menu/MenuList";
// import basicFunction from "../services/extra/basicFunction";
import { projectName } from "../constantMessage";
import { learnSubMenus } from "./learn/learnData";
// const BasicFunction = new basicFunction();
// const { exportToJson } = BasicFunction;
class MainHeader extends Component {
  componentDidMount() {
    const { cart } = this.props;
    if (cart.items && cart.items.length > 0) {
      document.body.classList.add("cart-has-item");
    } else {
      document.body.classList.remove("cart-has-item");
    }
  }
  componentWillReceiveProps(nextProps) {
    const {
      cart
      // mainMenus
    } = nextProps;
    if (cart.items && cart.items.length > 0) {
      document.body.classList.add("cart-has-item");
    } else {
      document.body.classList.remove("cart-has-item");
    }
  }
  logOut = () => {
    if (typeof this.props.logOut === "function") {
      this.props.logOut();
    }
  };
  render() {
    const {
      isSticky,
      isSmall,
      scrollPos,
      scrolledUp,
      showMobileMenu,
      mainMenus,

      location,
      wishList,
      cart,
      user,
      toggleMobileMenu
    } = this.props;
    const accountLabel = user && user.userMetaObj && user.userMetaObj.firstname ? `Hi, ${user.userMetaObj.firstname}` : "My Account"
    const wishListCount = wishList && wishList.length;
    const logo = (
      <MenuLink
        onClick={() => {
          if (showMobileMenu && isSmall) {
            if (typeof toggleMobileMenu === "function") {
              toggleMobileMenu();
            }
          }
        }}
        to={`/${location.countryCode}`}
        image={imagePack.logo}
        imageClass="logo-image"
        imageAlt={projectName}
      />
    );

    const emptyHeart = (
      <>
        <Icon icon={heartO} className="favHeart" /> {wishListCount}
      </>
    );
    const fillHeart = (
      <>
        <Icon icon={heart} className="favHeart" /> {wishListCount}
      </>
    );
    // const tempMenu = mainMenus.filter(el => {
    //   return el.menulabel !== "Shop";
    // });
    const cartCount =
      cart &&
      cart.items &&
      cart.items
        .map(el => el.qty.value)
        .reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
    return (
      <div className="inner-header">
        <div className="header_1">
          <div className="">
            <nav className="Nav">
              <div
                className={classNames("Nav-header", {
                  "Nav-large": !isSmall,
                  "Nav-small": isSmall,
                  "is-fixed-hidden":
                    scrollPos > 80 && isSticky && !this.props.isVisibleMenu,
                  "is-fixed-visible":
                    (scrollPos > 0 && !scrolledUp) ||
                    (isSmall && showMobileMenu) ||
                    (scrollPos > 0 && this.props.isVisibleMenu),
                  "has-bg": !isSmall && this.props.isVisibleMenu
                })}
              >
                {isSmall && (
                  <ul className="Nav-list Nav-list--small">{logo}</ul>
                )}
                {!isSmall && (
                  <ul
                    className="Nav-list Nav-list--inline Nav-list--mainNav"
                    ref="menuList"
                    onMouseOver={e => {
                      e.stopPropagation();
                    }}
                  >
                    {logo}
                    <MenuList
                      showSubMenu={this.props.showSubMenu}
                      hideSubMenu={this.props.hideSubMenu}
                    />
                    {/* <MainMenus
                      showSubMenu={this.props.showSubMenu}
                      hideSubMenu={this.props.hideSubMenu}
                      // menus={mainMenus}
                      menus={tempMenu}
                    /> */}
                  </ul>
                )}
                {!isSmall && (
                  <ul className="Nav-list Nav-list-loginAndCart Nav-list--inline">
                    <MenuLink
                      onMouseEnter={() => {
                        this.props.showSubMenu();
                        this.props.setLearnSubMenu(
                          learnSubMenus(location.countryCode)
                        );
                        this.props.setActiveMenu("Learn");
                      }}
                      onMouseLeave={() => {
                        this.props.hideSubMenu();
                        this.props.setActiveMenu();
                      }}
                      to={`/${location.countryCode}/learn`}
                      label="Learn"
                    />
                    <MenuLink
                      to={`/${location.countryCode}/consult`}
                      label="Consult"
                    />
                    {user._id ? (
                      <MenuLink
                        to={`/${location.countryCode}/my-account`}
                        className="has-submenu"
                        label={accountLabel}
                      >
                        <ul className="inner_submenu">
                          <MenuLink
                            to={`/${location.countryCode}/my-account`}
                            label="My Order"
                          />
                          <MenuLink
                            to={`/${location.countryCode}/change-password`}
                            label="Profile"
                          />
                          <MenuLink onClick={this.logOut} label="Logout" />
                        </ul>
                      </MenuLink>
                    ) : (
                      <MenuLink
                        to={`/${location.countryCode}/login`}
                        label="Login"
                      />
                    )}
                    <MenuLink
                      className="pr-1"
                      to={
                        user._id
                          ? `/${location.countryCode}/my-favourites`
                          : `/${location.countryCode}/favourites`
                      }
                      label={wishListCount > 0 ? fillHeart : emptyHeart}
                    />
                    <li className="Nav-listItem Nav-listItem--cart Nav-listItem--noBorder">
                      {/* <CustomLink to={`/${location.countryCode}/cart`}> */}
                      <button
                        className="Nav-cart2"
                        data-count={cartCount}
                        onClick={() => {
                          this.props.toggleCartBar();
                          // this.props.history.push("/cart")
                        }}
                        type="button"
                      >
                        <Icon icon={shopping_cart} />
                        <span>{cartCount}</span>
                      </button>

                      {/* </CustomLink> */}
                    </li>
                  </ul>
                )}
                {isSmall && (
                  <MobileMenu logout={this.logOut} menus={mainMenus} />
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
  cart: state.cart,
  user: state.user,
  wishList: state.wishList,
  isVisibleMenu: state.subMenus.isVisible
});
export default connect(
  mapStateToProps,
  {
    toggleCartBar,
    setLearnSubMenu,
    setActiveMenu
  }
)(MainHeader);
