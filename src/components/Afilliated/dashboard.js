import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import classNames from "classnames";
import { Icon } from "react-icons-kit";
import { ic_done, ic_clear } from "react-icons-kit/md";
import moment from "moment";
import AffiliateAccount from "./AffiliateAccount";
import AffiliateBankInformation from "./AffiliateBankInformation";
import AffiliateTax from "./AffiliateTax";
import { getAmbassadorDetails, getAllCreatives } from "../../services/api";
import { makeCancelable } from "../../services/makeCancelable";
import { copyToClipboard } from "../Constants";
import Statistics from "./statistics";
import Referrals from "./Referrals";
import RefferralPayout from "./RefferralPayout";
import ReferralVisits from "./ReferralVisits";
import Creatives from "./Creatives";
import { Lodar } from "../";
import LogoutConfirmModel from "./LogoutConfirmModel";
import { setAPUser, unsetAPUser } from "../../actions/";
import BasicFunction from "../../services/extra/basicFunction";
const basicFunction = new BasicFunction();
class LoginDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      ambassador: this.props.ambassadoruser || {},
      ambassador_data: {},
      creatives: [],
      confirmLogout: false,
      SpinnerToggle: true
    };
    this.toggle = this.toggle.bind(this);
    this.cancelLogout = this.cancelLogout.bind(this);
    this.confirmLogout = this.confirmLogout.bind(this);
  }
  componentDidMount() {
    const { location, history, ambassadoruser } = this.props;
    if (!ambassadoruser.ambass_id) {
      history.push("/" + location.countryCode + "/ambassador-portal/login");
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.cancelableData = makeCancelable(
      getAmbassadorDetails(
        this.state.ambassador ? this.state.ambassador.ambass_id : ""
      ).then(res => res.json()),
      response => {
        if (response.status && response.data) {
          this.props.setAPUser(response.data);
          this.setState({
            ambassador_data: response.data,
            SpinnerToggle: false
          });
        } else {
          this.setState({
            SpinnerToggle: false
          });
        }
      },
      error => {
        console.log({ error });
        this.setState({
          SpinnerToggle: false
        });
      }
    );
    this.cancelableCreative = makeCancelable(
      getAllCreatives().then(res => res.json()),
      response => {
        if (response.creative) {
          this.setState({
            creatives: response.creative
          });
        }
      },
      error => {}
    );
  }
  componentWillUnmount() {
    this.cancelableData();
    this.cancelableCreative();
  }

  displayLink = ref => `${window.location.origin}?ref=${ref}`;

  copyText(e) {
    const { innerText } = e.target;

    copyToClipboard(innerText);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  logout() {
    this.setState({
      confirmLogout: true
    });
  }
  cancelLogout() {
    this.setState({
      confirmLogout: false
    });
  }
  confirmLogout() {
    const { location, history } = this.props;
    this.props.unsetAPUser();
    history.push("/" + location.countryCode + "/ambassador-portal/login");
  }

  renderVisitRow(arr) {
    if (arr)
      return arr.map((el, index) => (
        <tr key={index}>
          <th scope="row">{el.url}</th>
          <td>{basicFunction.returnReferringUrl(el.refer_url)}</td>
          <td>
            {el.converted ? <Icon icon={ic_done} /> : <Icon icon={ic_clear} />}
          </td>
          <td>{moment(el.date).format("MMMM Do, YYYY h:mm a")}</td>
        </tr>
      ));
  }
  render() {
    const { ambassador_data } = this.state;
    var countPaid = 0;
    var amountPaid = 0;
    var countUnpaid = 0;
    var amountUnPaid = 0;
    var totalCount = 0;

    if (ambassador_data) {
      if (ambassador_data.urlvisits) {
        ambassador_data.urlvisits.map(key => {
          if (key.converted) {
            totalCount = totalCount + 1;
            if (key.paid) {
              countPaid = countPaid + 1;
              amountPaid = key.amount + amountPaid;
            } else {
              countUnpaid = countUnpaid + 1;
              amountUnPaid = key.amount + amountUnPaid;
            }
          }
          return null;
        });
      }
    }
    const { className } = this.props;
    return (
      <div
        className={classNames("container-fluid", {
          [className]: className
        })}
      >
        {this.state.SpinnerToggle && <Lodar />}
        <br className="hide-in-mobile" /> <br className="hide-in-mobile" />
        <Nav className="scroll-able-tabs" tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Ambassador URL
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Statistics
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Referrals
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: this.state.activeTab === "4" })}
              onClick={() => {
                this.toggle("4");
              }}
            >
              Payouts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: this.state.activeTab === "5" })}
              onClick={() => {
                this.toggle("5");
              }}
            >
              Visits
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: this.state.activeTab === "6" })}
              onClick={() => {
                this.toggle("6");
              }}
            >
              Creatives
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: this.state.activeTab === "7" })}
              onClick={() => {
                this.toggle("7");
              }}
            >
              Account
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: this.state.activeTab === "8" })}
              onClick={() => {
                this.toggle("8");
              }}
            >
              Bank
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: this.state.activeTab === "9" })}
              onClick={() => {
                this.toggle("9");
              }}
            >
              Tax Information
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames({ active: this.state.activeTab === "11" })}
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div className="container">
              <br />
              <Row>
                {ambassador_data && (
                  <Col sm="12">
                    <h2>Ambassador URL</h2>
                    <p>
                      Your ambassador ID is: <b>{ambassador_data.ambass_id}</b>{" "}
                    </p>
                    <p>
                      Your referral URL is:{" "}
                      <b>
                        <a href={this.displayLink(ambassador_data.ambass_id)}>
                          {this.displayLink(ambassador_data.ambass_id)}
                        </a>
                      </b>
                    </p>
                    <p>
                      Your email id is: <b>{ambassador_data.email}</b>
                    </p>
                  </Col>
                )}
              </Row>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="container">
              <br />
              <Row>
                <Col sm="12">
                  <h2>Statistics</h2>
                  <Statistics
                    countUnpaid={countUnpaid}
                    countPaid={countPaid}
                    totalCount={totalCount}
                    ambassador_data={this.state.ambassador_data}
                    amountPaid={amountPaid}
                    amountUnPaid={amountUnPaid}
                  />
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tabId="3">
            <div className="container">
              <br />
              <Row>
                <Col sm="12">
                  <h2>Referrals</h2>
                  <Referrals
                    ambassador_data={this.state.ambassador_data}
                    totalCount={totalCount}
                  />
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tabId="4">
            <div className="container">
              <br />
              <Row>
                <Col sm="12">
                  <h2>Referral Payouts</h2>
                  <RefferralPayout
                    ambassador_data={ambassador_data}
                    countPaid={countPaid}
                  />
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tabId="5">
            <div className="container">
              <br />
              <Row>
                <Col sm="12">
                  <h2>Referral URL Visits</h2>
                  <p>
                    Column one lists the visit URL in relative format, column
                    two lists the referrer, and column three indicates whether
                    the visit converted into a referral.
                  </p>
                  <ReferralVisits ambassador_data={ambassador_data} />
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tabId="6">
            <div className="container">
              <br />
              <div>
                <h2>Creatives</h2>
                <Creatives
                  creatives={this.state.creatives}
                  ambassador={this.state.ambassador}
                />
              </div>
              <br />
              <br />
            </div>
          </TabPane>
          <TabPane tabId="7">
            <div className="container">
              <br />
              <AffiliateAccount />
            </div>
          </TabPane>
          <TabPane tabId="8">
            <div className="container">
              <br />
              <AffiliateBankInformation />
            </div>
          </TabPane>
          <TabPane tabId="9">
            <div className="container">
              <br />
              <AffiliateTax ambassador_data={ambassador_data} />
            </div>
          </TabPane>
          <TabPane tabId="10">
            <div className="container">
              <br />
              <Row>
                <Col sm="12">
                  <h2>PROFILE SETTINGS</h2>
                  <p>Your payment email </p>
                  <input type="text" />
                  <br />
                  <p>
                    <input type="checkbox" /> Enable New Referral Notifications
                  </p>
                  <br />
                  <h2>CUSTOM EXTENSION SETTINGS</h2>
                  <p>Custom Ambassador Extension</p>
                  <input type="text" />
                  <br />
                  <button
                    className="btn btn5"
                    style={{ width: "250px", marginTop: "20px" }}
                  >
                    Save Profile Setting
                  </button>
                  <br />
                </Col>
              </Row>
            </div>
          </TabPane>
        </TabContent>
        <LogoutConfirmModel
          confirmLogoutstats={this.state.confirmLogout}
          cancelLogout={() => this.cancelLogout()}
          confirmLogout={() => this.confirmLogout()}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location,
  ambassadoruser: state.ambassadoruser
});

export default connect(
  mapStateToProps,
  { setAPUser, unsetAPUser }
)(LoginDashboard);
