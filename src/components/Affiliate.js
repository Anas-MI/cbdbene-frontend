import React, { Component } from "react";
import { connect } from "react-redux";
import Dashboard from "./Afilliated/dashboard";
import classNames from "classnames";
class Affiliate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1"
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  componentDidMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  // <Dashboard countryCode={this.props.countryCode} {...props} />
  render() {
    const { className } = this.props;
    return (
      <Dashboard
        className={classNames("", {
          [className]: className
        })}
        history={this.props.history}
      />
    );
  }
}
const mapStateToProps = state => ({
  location: state.location
});
export default connect(mapStateToProps)(Affiliate);
