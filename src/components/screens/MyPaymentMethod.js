import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Alert,
  Tooltip,
  Collapse
} from "reactstrap";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Lodar } from "../";
import MyAccountSidebar from "../MyAccountSidebar";
import MyProfileAddress from "../MyProfileAddress";
import { addUpdateUserDetails, getSingleUserApi } from "../../services/api/";
import {
  enableCheckoutCheckboxDetails,
  stripePaymentDetails,
  shippingAddressDetails,
  shippingAddressTollTippMessage,
  paymentMethodTollTippMessage,
  projectName
} from "../../constantMessage";
import StripePymentSave from "../stripePymentSave";
class MyPaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.toggle4 = this.toggle4.bind(this);
    this.toggle5 = this.toggle5.bind(this);
    this.toggle6 = this.toggle6.bind(this);
    this.toggle7 = this.toggle7.bind(this);
    this.handleCheckExpressCheckout = this.handleCheckExpressCheckout.bind(
      this
    );
    this.state = {
      tooltipOpen: false,
      tooltipOpen2: false,
      tooltipOpen3: false,
      collapse: false,
      collapse2: false,
      collapse3: false,
      collapse4: false,
      ExpressCheckout: false,
      cardDetails: "",
      SpinnerToggle: true,
      disableCheckbox: true
    };
  }
  componentDidMount() {
    const { user, history, location } = this.props;
    if (!user._id) {
      history.push("/" + location.countryCode + "/login");
    }
    if (user._id) {
      this.getuserDetails(user._id);
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
          if (
            rep.user.shippingdetails.firstname &&
            rep.user.billingdetails.firstname
          ) {
            //disableCheckbox:true
            this.setState({
              disableCheckbox: false
            });
          }
          if (rep.user.expresscheckout) {
            this.setState({
              expresscheckout: true
            });
          }
        } else {
        }
      })
      .catch(error => {});
  }
  handleCheckExpressCheckout() {
    var expresscheckout = false;
    if (this.state.expresscheckout === true) {
      expresscheckout = false;
    } else {
      expresscheckout = true;
    }
    this.setState({ expresscheckout: !this.state.expresscheckout });

    //  setTimeout(() => {
    addUpdateUserDetails({
      userid: this.props.user._id,
      expresscheckout: expresscheckout.toString()
    })
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          isLoading: false
        });
        if (resJson.status) {
          this.setState({
            modalData: {
              msg: "Your account successfully updated"
            }
          });
          this.props.updateProfileFormToMyProfile();
        } else if (resJson.error) {
          this.setState({
            modalData: {
              title: "Error",
              msg: resJson.error
            }
          });
        } else {
          this.setState({
            modalData: {
              title: "Error",
              msg: "Try again ..."
            }
          });
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
      });
    // }, 300);
  }
  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  toggle2() {
    this.setState({
      tooltipOpen2: !this.state.tooltipOpen2
    });
  }
  toggle3() {
    this.setState({
      tooltipOpen3: !this.state.tooltipOpen3
    });
  }
  toggle4() {
    this.setState({
      collapse: !this.state.collapse
    });
    this.setState({
      collapse4: false
    });
    this.setState({
      collapse3: false
    });
    this.setState({
      collapse2: false
    });
  }
  toggle5() {
    this.setState({
      collapse2: !this.state.collapse2
    });
    this.setState({
      collapse4: !this.state.collapse4
    });
    this.setState({
      collapse3: false
    });
    this.setState({
      collapse: false
    });
  }
  toggle6() {
    this.setState({
      collapse3: !this.state.collapse3
    });
    this.setState({
      collapse4: !this.state.collapse4
    });
    this.setState({
      collapse2: false
    });
    this.setState({
      collapse: false
    });
  }
  toggle7() {
    this.setState({
      collapse3: !this.state.collapse3
    });
    this.setState({
      collapse4: !this.state.collapse4
    });
    this.setState({
      collapse2: false
    });
    this.setState({
      collapse: false
    });
  }

  scrollToAddress() {
    this.setState({
      collapse: true
    });
    //  var elmnt = document.getElementById("addressDiv");
    // elmnt.scrollIntoView();
    var ele = document.getElementById("addressDiv");
    var x = 0;
    while (ele) {
      x += ele.offsetTop;
      ele = ele.offsetParent;
    }

    window.scroll({
      top: x - 80, // could be negative value
      left: 0,
      behavior: "smooth"
    });
  }

  scrollTopayment() {
    //  var elmnt = document.getElementById("addressDiv");
    // elmnt.scrollIntoView();
    var ele = document.getElementById("addressDiv3");
    var x = 0;
    while (ele) {
      x += ele.offsetTop;
      ele = ele.offsetParent;
    }

    window.scroll({
      top: x - 80, // could be negative value
      left: 0,
      behavior: "smooth"
    });
  }
  render() {
    return (
      <div className="">
        <Helmet>
          <title>{projectName} | Payment methods</title>
        </Helmet>
        {this.state.SpinnerToggle && <Lodar />}
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 ">
              <MyAccountSidebar activeLink="PAYMENT METHOD" />
            </div>
            <div className="col-lg-9 ">
              <h3 className="product-title">Payment Method</h3>

              <Card className="panel-section">
                <Alert color="dark">EXPRESS CHECKOUT</Alert>
                <CardBody>
                  <CardTitle>
                    <input
                      type="checkbox"
                      id="expressCheckout"
                      disabled={this.state.disableCheckbox}
                      onChange={this.handleCheckExpressCheckout}
                      defaultChecked={this.state.expresscheckout}
                      className="mypaymentChceckox"
                    />
                    <label htmlFor="expressCheckout">
                      ENABLE EXPRESS CHECKOUT
                    </label>
                  </CardTitle>

                  <CardSubtitle>
                    <p>{enableCheckoutCheckboxDetails}</p>
                  </CardSubtitle>
                  {/* <p className="small-font">
                    To enable express checkout, first:
                  </p> */}
                  <div className="row">
                    <ul className="myProifle-enableCheckout-ul">
                      <li>
                        <p>
                          Choose a default{" "}
                          <a onClick={() => this.scrollToAddress()} href="#/">
                            shipping address
                          </a>
                          <span
                            className="myProifle-enableCheckoutTooltip"
                            style={{
                              textDecoration: "underline",
                              color: "blue"
                            }}
                            href="#"
                            id="TooltipExample"
                          >
                            ?
                          </span>
                          <Tooltip
                            placement="right"
                            isOpen={this.state.tooltipOpen}
                            target="TooltipExample"
                            toggle={this.toggle}
                          >
                            {shippingAddressTollTippMessage}
                          </Tooltip>
                        </p>
                      </li>

                      <li>
                        <p>
                          Choose a default{" "}
                          <a onClick={() => this.scrollTopayment()} href="#/">
                            payment method
                          </a>
                          <span
                            className="myProifle-enableCheckoutTooltip"
                            style={{
                              textDecoration: "underline",
                              color: "blue"
                            }}
                            href="#"
                            id="TooltipExample3"
                          >
                            ?
                          </span>
                          <Tooltip
                            placement="right"
                            isOpen={this.state.tooltipOpen3}
                            target="TooltipExample3"
                            toggle={this.toggle3}
                          >
                            {paymentMethodTollTippMessage}
                          </Tooltip>
                        </p>
                      </li>
                    </ul>
                  </div>
                </CardBody>
              </Card>
              <div id="addressDiv"> </div>
              <Card className="panel-section" ref="addressDiv">
                <Alert color="dark">YOUR SHIPPING ADDRESSES</Alert>
                <CardBody>
                  <CardTitle>
                    <p>{shippingAddressDetails}</p>
                  </CardTitle>

                  <a
                    href="#/"
                    onClick={this.toggle4}
                    className="btn or-btn btn-outline-shopping btn-icon"
                    style={{ marginTop: "15px", width: "200px" }}
                  >
                    VIEW ADDRESS
                  </a>
                  <br />
                  <div>
                    <Collapse isOpen={this.state.collapse}>
                      <MyProfileAddress
                        updateChckBoxafteruserUpdate={() =>
                          this.updateChckBoxafteruserUpdate()
                        }
                      />
                    </Collapse>
                  </div>
                </CardBody>
              </Card>

              <div id="addressDiv3" />
              <Card className="panel-section">
                <Alert color="dark">YOUR PAYMENT METHODS</Alert>
                <CardBody>
                  <CardTitle>
                    <p>{stripePaymentDetails}</p>
                  </CardTitle>

                  <StripePymentSave
                    stripePaymentError={this.state.stripePaymentError}
                    stripeReturnData={this.stripeReturnData}
                    userId={this.props.user._id}
                    cardDetail={this.state.userDetailsRes}
                  />
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
export default connect(mapStateToProps)(MyPaymentMethod);
