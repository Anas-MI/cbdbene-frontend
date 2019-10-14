//MyNotification.js
import React, { Component } from "react";
import { Card, CardBody, Alert, ListGroup } from "reactstrap";
import { connect } from "react-redux";
import classNames from "classnames";
import { Helmet } from "react-helmet";

import MyAccountSidebar from "../MyAccountSidebar";
import { projectName } from "../../constantMessage";

class MyNotification extends Component {
  componentDidMount() {
    const { user, history, location } = this.props;
    if (!user._id) {
      history.push("/" + location.countryCode + "/login");
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  render() {
    const { className } = this.props;

    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <Helmet>
          <title>{projectName} | Notifications</title>
        </Helmet>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 ">
              <MyAccountSidebar activeLink="NOTIFICATION" />
            </div>
            <div className="col-lg-9 ">
              <h3>Notification</h3>
              <Card className="panel-section">
                <Alert color="dark">YOUR NOTIFICATION</Alert>
                <CardBody>
                  <ListGroup>
                    {/* <ListGroupItem color="info">Cras justo odio</ListGroupItem>
                    <ListGroupItem color="info">
                      Dapibus ac facilisis in
                    </ListGroupItem>
                    <ListGroupItem color="info">Morbi leo risus</ListGroupItem>
                    <ListGroupItem color="warning">
                      Porta ac consectetur ac
                    </ListGroupItem>
                    <ListGroupItem color="warning">
                      Vestibulum at eros
                    </ListGroupItem> */}
                  </ListGroup>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  location: state.location
});
export default connect(mapStateToProps)(MyNotification);
