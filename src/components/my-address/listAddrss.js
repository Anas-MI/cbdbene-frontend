import React, { Component } from "react";
import { connect } from "react-redux";
import Lodar from "../lodar";
import MyAccountSidebar from "../MyAccountSidebar";
import { getSingleUserApi } from "../../services/api/";
import { getAddress } from "../../actions";
import SingleAddress from "./singleAddress";
import { Link } from "react-router-dom";
import classNames from "classnames";

import {
  Card,
  CardBody
  // CardTitle
} from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ic_library_add } from "react-icons-kit/md/ic_library_add";
import Icon from "react-icons-kit";
class ListAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SpinnerToggle: false
    };
  }
  componentDidMount() {
    const {
      user: { _id: id },
      history,
      location
    } = this.props;
    if (!id) {
      history.push("/" + location.countryCode + "/login");
    }
    if (id) {
      this.getuserDetails(id);
      this.props.getAddress(id);
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  updateChckBoxafteruserUpdate() {
    const { user } = this.props;
    this.getuserDetails(user._id);
  }
  getuserDetails(_id) {
    getSingleUserApi(_id)
      .then(res => {
        return res.json();
      })
      .then(rep => {
        if (rep.user) {
          this.setState(
            {
              userDetailsRes: rep.user,
              SpinnerToggle: false
            },
            () => {
              document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
          );
        } else {
        }
      })
      .catch(error => {});
  }

  render() {
    const {
      location,
      address: { address },
      className
    } = this.props;
    console.log({ address });
    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        {this.state.SpinnerToggle && <Lodar />}
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 ">
              <MyAccountSidebar activeLink="PAYMENT METHOD" />
            </div>
            <div className="col-lg-9 ">
              <h3 className="">Your Addresses</h3>
              <Card className="panel-section">
                <CardBody>
                  <TransitionGroup className="row">
                    <CSSTransition
                      timeout={300}
                      className="transition-item3 col-md-4 col-sm-6 col-xs-12 mb-3"
                    >
                      <Card className="panel-section h-100">
                        <CardBody>
                          <div className="h-100 d-flex flex-column justify-content-center">
                            <Link
                              to={
                                "/" + location.countryCode + "/my-address-add"
                              }
                            >
                              <center>
                                <Icon size={64} icon={ic_library_add} />
                              </center>
                            </Link>
                            <h4 className="text-center">Add Address</h4>
                          </div>
                        </CardBody>
                      </Card>
                    </CSSTransition>
                    {address &&
                      address.map((el, key) => (
                        <CSSTransition
                          key={key}
                          timeout={300}
                          classNames="transition-item3"
                        >
                          <SingleAddress
                            history={this.props.history}
                            address={el}
                          />
                        </CSSTransition>
                      ))}
                  </TransitionGroup>
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
  location: state.location,
  address: state.address
});
export default connect(
  mapStateToProps,
  {
    getAddress
  }
)(ListAddress);
