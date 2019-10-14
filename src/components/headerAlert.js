import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import Icon from "react-icons-kit";
import { timesRectangle } from "react-icons-kit/fa";
import { headerPopUpModal } from "../actions";

class HeaderAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertShow: true
    };
    this.deleteAlert = this.deleteAlert.bind(this);
  }
  componentDidMount() {
    if (this.props.headerPopUpModalData) {
      this.setState({
        alertShow: false
      });
    }
  }
  deleteAlert() {
    this.props.headerPopUpModal(true);
    this.setState({
      alertShow: false
    });
  }
  render() {
    return (
      <div>
        {this.state.alertShow && (
          <Alert color="dark" className="headerDarkAlert">
            <span>Be one of our “Friends with Bénéfits” and get 20% off!.</span>
            <span
              className="header-alert-close"
              onClick={() => this.deleteAlert()}
            >
              <Icon icon={timesRectangle} style={{ float: "right" }} />
            </span>
          </Alert>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  headerPopUpModalData: state.checkout.headerPopUpModalData
});
export default connect(
  mapStateToProps,
  { headerPopUpModal }
)(HeaderAlert);
