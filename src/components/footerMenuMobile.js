import React, { Component } from "react";
import { connect } from "react-redux";

import FooterMenuColops from "./footerMenuColops";
import { getFooterMenu } from "../services/api";
import menuGenerator from "../services/extra/menuGenerator";
class FooterMenuMobileClass extends Component {
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
    console.log({
      arr
    });
    return arr.map((el, key) => {
      //  const { openedSubMenu } = this.state;
      return (
        <div key={key}>
          <FooterMenuColops menuData={el} />
        </div>
      );
    });
  }

  render() {
    const { mainMenus } = this.state;
    return (
      <div className="hellomobile">{this.generateMainMenus(mainMenus)}</div>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location
});
export const FooterMenuMobile = connect(mapStateToProps)(FooterMenuMobileClass);
