import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { CustomLink } from "../";
import { subMenuVisible } from "../../actions";
const MainMenus = props => {
  const {
    menus,
    isSmall,
    showMobileMenu,
    toggleMobileMenu,
    openedSubMenu,
    toggleSubMenu
  } = props;
  return menus.map((el, key) => {
    return (
      <li
        key={key}
        className={classNames("Nav-listItem", {
          "has-submenu": el.subMenu.length > 0,
          open: openedSubMenu === key
        })}
        // onMouseEnter={props.showSubMenu}
        // onMouseLeave={props.hideSubMenu}
        onClick={() => {
          if (typeof toggleSubMenu === "function") toggleSubMenu(key);
        }}
      >
        <CustomLink
          className={classNames("CustomLink Nav-listLink")}
          to={el.slug}
          onClick={() => {
            if (isSmall && showMobileMenu) {
              if (typeof toggleMobileMenu === "function") toggleMobileMenu();
            }
          }}
        >
          <span className="CustomLink-content">{el.menulabel}</span>
        </CustomLink>
        {el.subMenu.length > 0 && (
          <ul
            className={classNames("inner_submenu", {
              mobile_inner_submenu: isSmall
            })}
          >
            {el.subMenu.map((submenu, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    if (typeof toggleMobileMenu === "function")
                      toggleMobileMenu();
                  }}
                >
                  <CustomLink
                    className="CustomLink Nav-listLink"
                    to={submenu.slug ? submenu.slug : "#"}
                  >
                    <span className="CustomLink-content">
                      {submenu.menulabel}
                    </span>
                  </CustomLink>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  });
};

export default connect(
  null,
  {
    subMenuVisible
  }
)(MainMenus);
