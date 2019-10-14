import React, { Component } from "react";
import classNames from "classnames";
import { TabContent, TabPane, Collapse } from "reactstrap";
import { Icon } from "react-icons-kit";
import { plus, chevronDown, chevronUp } from "react-icons-kit/fa/";
export default class Template1secondsection extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeTab: 1,
      data: props.content || []
    };
  }
  componentDidMount() {}
  toggleTab(activeTab) {
    this.setState({
      activeTab
    });
  }

  renderListMenu(arr) {
    if (arr.length > 0)
      return (
        <ul>
          {arr.map((el, key) => {
            return (
              <li
                key={key}
                className={classNames({
                  active: this.state.activeTab === el.id
                })}
                onClick={() => {
                  this.toggleTab(el.id);
                }}
              >
                <a href="#/">{el.title}</a>
              </li>
            );
          })}
        </ul>
      );
    return <div />;
  }
  renderListContent(arr) {
    return (
      <TabContent activeTab={this.state.activeTab}>
        {arr.map((el, key) => {
          const innerListLeft = el.list.filter((e, i) => !(i % 2));
          const innerListRight = el.list.filter((e, i) => i % 2);
          return (
            <TabPane key={key} tabId={el.id}>
              <div className="tabcontent">
                <h4 className="main-sec-heading">{el.title}</h4>
                <p className="big-font">
                  {el.description}:
                  <ul className="icon-list">
                    <div className="left-sec">
                      {innerListLeft.map((el, index) => {
                        return (
                          <li key={index}>
                            <Icon icon={plus} /> {el}
                          </li>
                        );
                      })}
                    </div>
                    <div className="right-sec">
                      {innerListRight.map((el, index) => {
                        return (
                          <li key={index}>
                            <Icon icon={plus} /> {el}
                          </li>
                        );
                      })}
                    </div>
                  </ul>
                </p>
              </div>
            </TabPane>
          );
        })}
      </TabContent>
    );
  }
  renderListContentMobile(arr) {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mobile-show">
        <div className="tab">
          <div className="accordian">
            <div className="accordian-content">
              {arr.map((el, index) => {
                const open = this.state.activeTab === el.id;
                return (
                  <div key={index}>
                    {open && (
                      <p className="big-font">
                        <br />
                        {el.description}
                      </p>
                    )}
                    <h4
                      onClick={() => {
                        this.toggleTab(el.id);
                      }}
                      className="accordian-heading"
                    >
                      {el.title}
                      <span className="right">
                        {open ? (
                          <Icon icon={chevronUp} />
                        ) : (
                          <Icon icon={chevronDown} />
                        )}
                      </span>
                    </h4>
                    <Collapse isOpen={open}>
                      <ul className="icon-list">
                        {el.list.map((el, index) => {
                          return (
                            <li key={index}>
                              <Icon icon={plus} /> {el}
                            </li>
                          );
                        })}
                      </ul>
                    </Collapse>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const { data } = this.state;

    return (
      <div className="container white-bg-p-80 mobile-diifer mb-5">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mobile-hide">
            <div className="tab">
              <div className="left">
                <div className="tablist">{this.renderListMenu(data)}</div>
              </div>
              <div className="right">{this.renderListContent(data)}</div>
            </div>
          </div>
          {/* mobile hide sec */}
          {this.renderListContentMobile(data)}
        </div>
      </div>
    );
  }
}
