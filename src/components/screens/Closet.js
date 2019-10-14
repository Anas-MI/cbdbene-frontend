import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Card, CardBody, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";
import MyAccountSidebar from "../MyAccountSidebar";
import { projectName } from "../../constantMessage";
class Closet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { user, location, history } = this.props;
    if (!user._id) {
      history.push("/" + location.countryCode + "/login");
    }
  }

  render() {
    return (
      <div className="">
        <Helmet>
          <title>{projectName} | Favorite</title>
        </Helmet>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 ">
              <MyAccountSidebar activeLink="CLOSET" />
            </div>
            <div className="col-lg-9 ">
              <h1>Closet</h1>
              <p>
                These are the items you've purchased. You can see more details
                by clicking on a product below.
              </p>
              <Card className="panel-section">
                <CardBody>
                  <p>You have no items in your closet</p>

                  <hr />
                  <CardSubtitle>
                    Once you make a purchase from lululemon, your items will be
                    displayed here.
                    <br />
                    <Link to={"/" + this.props.location.countryCode + "/shop"}>
                      START SHOPPING
                    </Link>
                  </CardSubtitle>
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
  location: state.location,
  user: state.user
});
export default connect(mapStateToProps)(Closet);
