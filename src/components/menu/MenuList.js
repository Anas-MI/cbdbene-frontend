import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";

import { setSubMenuProducts, setActiveMenu } from "../../actions";
import { MenuLink } from "./";
import { getProductsByCategory } from "../../services/extra";
import { categoryList } from "../Constants";

class MenuList extends Component {
  getProducts = label => {
    const { products } = this.props;
    if (label === "Combos" || label === "Kits" || label === "Bundles") {
      const productsList = products.filter(el => el.combo);
      // console.log({productsList})
      return productsList;
    }
    const productsList = getProductsByCategory(products, label);
    return productsList;
  };
  render() {
    const {
      // isLarge,
      // children,
      // products,
      showSubMenu,
      hideSubMenu,
      setSubMenuProducts,
      setActiveMenu,
      activeMenu,
      isVisible,
      countryCode
    } = this.props;
    const list = categoryList.map(el => ({
      label: el,
      slug: `/${countryCode}/category/${el}`
    }));
    return list.map(el => (
      <MenuLink
        key={el.label}
        label={el.label}
        className={classNames({
          "active-sub-menu": activeMenu === el.label && isVisible
        })}
        to={el.slug}
        onMouseEnter={() => {
          showSubMenu();
          setSubMenuProducts(this.getProducts(el.label));
          setActiveMenu(el.label);
        }}
        onMouseLeave={hideSubMenu}
      />
    ));
  }
}
const mapStateToProps = state => ({
  products: state.products.products,
  activeMenu: state.subMenus.activeMenu,
  isVisible: state.subMenus.isVisible,
  countryCode: state.location.countryCode
});
export default connect(
  mapStateToProps,
  {
    setSubMenuProducts,
    setActiveMenu
  }
)(MenuList);
