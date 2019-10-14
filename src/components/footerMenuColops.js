import React, { Component } from "react";
import { CustomLink } from "./";
import { Collapse, CardBody, Card } from "reactstrap";
import Icon from "react-icons-kit";
import classNames from "classnames";
import { ic_expand_more } from "react-icons-kit/md";

class FooterMenuColops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainMenus: [],
      openedSubMenu: "",
      collappse: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { collapse } = this.state;
    const el = this.props.menuData;
    return (
      <div className="hello">
        <div
          className="toggle-footer"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          <span>{el.footerlabel}</span>{" "}
          <Icon
            className={classNames("icon", { open: collapse })}
            icon={ic_expand_more}
            size={16}
          />
        </div>
        <Collapse isOpen={collapse}>
          <Card>
            <CardBody>
              <ul>
                <li>{el.footerlabel}</li>
                {el.subMenu.length > 0 &&
                  el.subMenu.map((submenu, index) => {
                    return (
                      <li key={index}>
                        <CustomLink
                          to={
                            // submenu.pagetype === "externallink"
                            //   ? submenu.externallink
                            //   :
                            submenu.slug
                          }
                        >
                          {submenu.footerlabel}
                        </CustomLink>
                      </li>
                    );
                  })}
              </ul>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}
export default FooterMenuColops;
