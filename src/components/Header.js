import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import $ from "jquery";
import HeaderCheckOut from "./headerCheckOut";
import {
  clearCart,
  clearCards,
  unsetUser,
  unsetWishList,
  setWishList,
  toggleCartBar,
  subMenuVisible,
  setPosUp,
  clearAddress
} from "../actions";
import { Icon } from "react-icons-kit";
import menuGenerator from "../services/extra/menuGenerator";
import { baseUrl } from "./Constants";
import { getMenusApi } from "../services/api/";

import HeaderAlert from "./headerAlert";
import { ic_error_outline } from "react-icons-kit/md/ic_error_outline";

import { Modal, ModalHeader } from "reactstrap";
import MainHeader from "./MainHeader";
import { WrapperMenu } from "./menu";
import { confirmLogout } from "../constantMessage";

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleResize = this.handleResize.bind(this);
    // this.fetchSetting = this.fetchSetting.bind(this);
    this.logOut = this.logOut.bind(this);
    this.toggle = this.toggle.bind(this);
    this.isLogin = this.isLogin.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.toggleMenuItem = this.toggleMenuItem.bind(this);
    this.confirmLogout = this.confirmLogout.bind(this);
    this.cancelLogout = this.cancelLogout.bind(this);
    // this.hideAllAlert = this.hideAllAlert.bind(this);
    //  this.finalLogOut = this.finalLogOut.bind(this);
    this.countFav = this.countFav.bind(this);
    this.state = {
      scrollPos: 0,
      scrolledUp: false,
      category: [],
      openedMenu: null,
      isSubMenuOpen: false,
      selectedMainMenu: "",
      // isSmall: window.innerWidth >= 640 ? false : true,
      isSmall: window.innerWidth >= 1025 ? false : true,
      logoUrl: null,
      options: [],
      mainMenus: [],
      isLoginCheck: false,
      showMobileMenu: false,
      openedSubMenu: null,
      herderIsCheckout: true,
      confirmLogout: false,
      cancelLogout: false,
      successLogout: false,
      countFav: 0
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
    this.generateMenusObj();
    // this.fetchSetting();
    if (this.props.user && this.props.user._id) {
      this.setState({ isLoginCheck: true });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  }
  showSubMenu = () => {
    // if (this.subMenuTimeout) clearTimeout(this.subMenuTimeout);
    // this.props.subMenuVisible();
  };
  showSubMenuWrp = () => {
    if (this.subMenuTimeout) clearTimeout(this.subMenuTimeout);
    if (this.props.isVisibleMenu) {
      this.props.subMenuVisible();
    }
    // this.props.subMenuVisible()
  };
  hideSubMenu = () => {
    // this.subMenuTimeout = setTimeout(() => {
    //   this.props.subMenuVisible(false);
    // }, 300);
  };
  toggleMenuItem(e) {}
  countFav() {}
  generateMenusObj() {
    getMenusApi()
      .then(res => res.json())
      .then(resJson => {
        const { location } = this.props;
        if (resJson.status) {
          const menusEl = menuGenerator(
            resJson.menus,
            location && location.countryCode,
            true
          );
          console.log({
            menusEl
          });
          const menuEl2 = menusEl.map(elx => {
            const { subMenu } = elx;
            return {
              ...elx,
              subMenu: subMenu.map(elA => {
                const { menulabel, slug } = elA;
                return {
                  ...elA,
                  menulabel: menulabel === "Combos" ? "Bundles" : menulabel,
                  slug: slug && slug.replace(/Combos/g, "Bundles")
                };
              })
            };
          });
          this.setState({ mainMenus: menuEl2 });
        }
      });
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  toggleOpen() {
    this.setState({
      dropdownOpen: true
    });
  }
  toggleClose() {
    this.setState({
      dropdownOpen: false
    });
  }
  isLogin() {
    if (this.props.user._id) {
      return 1;
    } else {
      return 0;
    }
  }
  cancelLogout() {
    this.setState({ confirmLogout: false });
  }
  logOut() {
    this.setState({ confirmLogout: true });
  }

  confirmLogout() {
    this.props.clearCart();
    console.log({ props: this.props });
    this.props.history.push("/US");
    this.props.unsetUser();
    this.props.clearCards();
    this.props.clearAddress();
    this.props.setWishList([]);
    // window.location.href = "/" + this.props.location.countryCode+'/';
    this.setState({
      confirmLogout: false
    });
  }
  fetchSetting() {
    axios
      .get(`${baseUrl}/options/getsitesettings`)
      .then(response => {
        if (response.data) {
          if (response.data.success);
          this.setState({ options: response.data.options }, () => {
            this.state.options.map(option => {
              if (option.optionname === "logo")
                this.setState({ logoUrl: option.optionvalue });
              return null;
            });
          });
        }
      })
      .catch(function(error) {});
  }
  toggleMobileMenu(e) {
    this.setState(
      prevState => ({
        showMobileMenu: !prevState.showMobileMenu
      }),
      () => {
        $(this.refs.menu_item).fadeToggle();
      }
    );
  }
  handleScroll(e) {
    const { scrollPos } = this.state;
    const { setPosUp } = this.props;
    let currentScrollPos = $(window).scrollTop();
    if (scrollPos < currentScrollPos) this.setState({ scrolledUp: true });
    else {
      this.setState({ scrolledUp: false });
    }
    // console.log(currentScrollPos)
    if (currentScrollPos > 45) {
      setPosUp(false);
    } else {
      setPosUp();
    }
    this.setState({ scrollPos: currentScrollPos });
  }
  handleHover(e) {}
  handleResize() {
    const isBig = window.innerWidth >= 1025; // 640;
    if (isBig) document.body.style.overflow = "";

    this.setState({ isSmall: isBig ? false : true });
  }
  isSticky() {
    const { scrolledUp, isSmall, showMobileMenu } = this.state;
    if (isSmall) {
      if (showMobileMenu) {
        return false;
      }
    }
    return scrolledUp;
  }
  onMouseEnter() {
    this.setState({ dropdownOpen: true });
  }

  onMouseLeave() {
    this.setState({ dropdownOpen: false });
  }
  render() {
    const {
      scrollPos,
      scrolledUp,
      isSmall,
      // logoUrl,
      mainMenus,
      showMobileMenu
    } = this.state;
    const { location, isCheckoutPage } = this.props;
    // const pathName = window.location.pathname.split("/");
    // var herderIsCheckout = true;
    // if (pathName[2] === "checkout") {
    //   herderIsCheckout = false;
    // }
    const pathName = window.location.pathname.split("/");
    const isOnCheckoutPage = pathName[2] === "checkout";
    return (
      <div className="whole-header">
        <HeaderAlert />
        {isOnCheckoutPage ? (
          <HeaderCheckOut headerPath={location.countryCode} />
        ) : (
          <div>
            <MainHeader
              toggleMobileMenu={this.toggleMobileMenu}
              isSticky={this.isSticky()}
              isSmall={isSmall}
              scrollPos={scrollPos}
              scrolledUp={scrolledUp}
              showMobileMenu={showMobileMenu}
              mainMenus={mainMenus}
              logOut={this.logOut}
              showSubMenu={this.showSubMenu}
              hideSubMenu={this.hideSubMenu}
            />
            <WrapperMenu
              onMouseEnter={this.showSubMenuWrp}
              onMouseLeave={this.hideSubMenu}
            />
          </div>
        )}
        {this.state.confirmLogout ? (
          <div>
            <Modal
              isOpen={this.state.confirmLogout}
              toggle={this.cancelLogout}
              className={"full-modal"}
            >
              <ModalHeader toggle={this.cancelLogout}>
                {confirmLogout}
              </ModalHeader>
              <div className="Modal-body center-modal">
                <div className="modal-inner">
                  <div className="modal-content p-3">
                    <Icon
                      icon={ic_error_outline}
                      className="text-center"
                      size="64"
                    />
                    <br />
                    <p className="text-center title-80">
                      Do you really want to logout?
                    </p>
                    <div className="row">
                      <div className="col-6 text-center">
                        <button
                          className="btn w15 btn-info btn6 m-auto"
                          onClick={this.confirmLogout}
                        >
                          Yes
                        </button>
                      </div>
                      <div className="col-6 text-center">
                        <button
                          className="btn w15 btn-info btn7 m-auto"
                          onClick={this.cancelLogout}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  location: state.location,
  wishList: state.wishList,
  isVisibleMenu: state.subMenus.isVisible,
  isCheckoutPage: state.extras.isCheckoutPage
  // isPosUp: state.subMenus.isVisible.isPosUp
});
const mapDispatchToProps = {
  clearCart,
  unsetUser,
  unsetWishList,
  setWishList,
  toggleCartBar,
  subMenuVisible,
  setPosUp,
  clearAddress,
  clearCards,
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
