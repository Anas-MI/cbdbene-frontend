import React, { Component } from "react";
import { connect } from "react-redux";
import { CustomLink } from "./";

import { getFooterMenu } from "../services/api";
import menuGenerator from "../services/extra/menuGenerator";

class FooterMenuClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainMenus: [],
      openedSubMenu: ""
    };
  }

  componentDidMount() {
    this.generateMenusObj();
  }
  generateShopSlug() {
    return `/${this.props.location.countryCode}/shop`;
  }
  generatePageSlug(title, type) {
    return `/${this.props.location.countryCode}/pages/${title}`;
  }
  generateExternalSlug(parentName, externallink) {
    // const slug = title.replace(/\//g, "!");
    if (externallink.split("//")[0].includes("http")) {
      // if(typeof parentName === "string" ){
      //   if(parentName.toLowerCase() === "social"){

      //   }
      // }
      return externallink;
    }
    return `/${this.props.location.countryCode}/${externallink}`;
  }
  generateCategorySlug(title) {
    const slug = title.replace(/\//g, "!");
    return `/${this.props.location.countryCode}/category/${slug}`;
  }
  generateMenusObj() {
    getFooterMenu()
      .then(res => res.json())
      .then(resJson => {
        if (resJson.status) {
          const fullMenu = menuGenerator(
            resJson.footer,
            this.props.location.countryCode
          );
          this.setState({ mainMenus: fullMenu });
        }
      });
  }
  generateMainMenus(arr) {
    return arr.map((el, key) => {
      return (
        <div key={key} className="footer-inside-content footer-inside-two">
          <ul>
            <li>{el.footerlabel}</li>

            {el.subMenu.length > 0 &&
              el.subMenu.map((submenu, index) => {
                return (
                  <li key={index}>
                    <CustomLink to={submenu.slug}>
                      {submenu.footerlabel}
                    </CustomLink>
                  </li>
                );
              })}
          </ul>
        </div>
      );
    });
  }

  render() {
    const { mainMenus } = this.state;
    return <div>{this.generateMainMenus(mainMenus)}</div>;
  }
}
const mapStateToProps = state => ({
  location: state.location
});
export const FooterMenu = connect(mapStateToProps)(FooterMenuClass);
