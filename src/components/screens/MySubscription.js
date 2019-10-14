import React, { Component } from "react";
import { Card, CardBody, CardTitle, Alert, Table } from "reactstrap";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import classNames from "classnames";
import BasicFunction from "../../services/extra/basicFunction";
import {
  // subscriptionGetApi,
  getOrderByUser,
  getSingleUserApi
} from "../../services/api";
import { Link } from "react-router-dom";
import MyAccountSidebar from "../MyAccountSidebar";
import { Lodar } from "../";
import { addSlugToProduct } from "../../services/extra";
import { projectName } from "../../constantMessage";
const basicFunction = new BasicFunction();
class MySubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptionList: "",
      loginUserId: "",
      SpinnerToggle: true
    };
  }
  componentDidMount() {
    const { user, history, location } = this.props;
    if (!user._id) {
      history.push("/" + location.countryCode + "/login");
    }

    function flatten(arr) {
      return arr.reduce(function(flat, toFlatten) {
        return flat.concat(
          Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
        );
      }, []);
    }
    if (user._id) {
      // let userid = user._id;
      if (user.userMetaId) {
        getOrderByUser(user.userMetaId)
          .then(res => res.json())
          .then(resJson => {
            if (resJson.status) {
              const orderList = resJson.orders.sort(function(a, b) {
                return new Date(b.createdOn) - new Date(a.createdOn);
              });
              const orderList2 = orderList.map(el =>
                el.products.map(el => addSlugToProduct(el))
              );
              const productList = flatten(orderList2);
              const subscriptionList = productList.filter(
                el => el.isSubscribed
              );
              this.setState(
                {
                  subscriptionList,
                  SpinnerToggle: false
                },
                () => {
                  console.log({
                    subscriptionList,
                    orderList2,
                    productList
                  });
                  document.body.scrollTop = document.documentElement.scrollTop = 0;
                }
              );
            } else {
              this.setState(
                {
                  SpinnerToggle: false
                },
                () => {
                  document.body.scrollTop = document.documentElement.scrollTop = 0;
                }
              );
            }
          })
          .catch(err => {
            console.log({ err });

            this.setState(
              {
                SpinnerToggle: false
              },
              () => {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
              }
            );
          });
      } else {
        getSingleUserApi(user._id)
          .then(res => res.json())
          .then(res => {
            if (res.user && res.user._id) {
              getOrderByUser(user.userMetaId)
                .then(res => res.json())
                .then(resJson => {
                  if (resJson.status) {
                    const orderList = resJson.orders.sort(function(a, b) {
                      return new Date(b.createdOn) - new Date(a.createdOn);
                    });
                    const orderList2 = orderList.map(el =>
                      el.products.map(el => addSlugToProduct(el))
                    );
                    const productList = flatten(orderList2);
                    const subscriptionList = productList.filter(
                      el => el.isSubscribed
                    );
                    this.setState(
                      {
                        subscriptionList,
                        SpinnerToggle: false
                      },
                      () => {
                        document.body.scrollTop = document.documentElement.scrollTop = 0;
                      }
                    );
                  } else {
                    this.setState(
                      {
                        SpinnerToggle: false
                      },
                      () => {
                        document.body.scrollTop = document.documentElement.scrollTop = 0;
                      }
                    );
                  }
                })
                .catch(err => {
                  console.log({ err });
                  this.setState(
                    {
                      SpinnerToggle: false
                    },
                    () => {
                      document.body.scrollTop = document.documentElement.scrollTop = 0;
                    }
                  );
                });
            }
          });
      }

      // subscriptionGetApi({ userid })
      //   .then(res => res.json())
      //   .then(resJson => {
      //     if (resJson.status) {
      //       this.setState({
      //         subscriptionList: resJson.subscribed,
      //         SpinnerToggle: false
      //       });
      //     }
      //   })
      //   .catch(err => {});

      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.setState({
        loginUserId: user._id
      });
    }
  }

  render() {
    const { location, className } = this.props;
    const productLink = subs => {
      // if (subs.productmeta) {
      //   if (subs.productmeta._id) {
      //     return (
      //       <Link to={"/" + location.countryCode + "/shop/" + subs.productSlug}>
      //         {subs.productid && subs.productid.producttitle}
      //       </Link>
      //     );
      //   }
      // }

      // if (subs.comboid) {
      //   if (subs.comboid._id) {
      //     return (
      //       <Link to={"/" + location.countryCode + "/shop/" + subs.productSlug}>
      //         {subs.comboid && subs.comboid.title}
      //       </Link>
      //     );
      //   }
      // }
      if (subs.title)
        return (
          <Link
            to={
              subs.productSlug
                ? "/" + location.countryCode + "/shop/" + subs.productSlug
                : null
            }
          >
            {subs.title}
          </Link>
        );

      return "-";
    };
    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <Helmet>
          <title>{projectName} | My Subscriptions</title>
        </Helmet>
        {this.state.SpinnerToggle && <Lodar />}
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 ">
              <MyAccountSidebar activeLink="MY SUBSCRIPTION" />
            </div>
            <div className="col-lg-9 ">
              {/* <h1>Your Subscription</h1> */}
              <br />
              <Card className="panel-section">
                <Alert color="dark">YOUR SUBSCRIPTION</Alert>
                <CardBody>
                  <CardTitle>
                    <div className="table-responsive">
                      {this.state.subscriptionList.length > 0 ? (
                        <Table className="new-res-table" hover>
                          <thead>
                            <tr>
                              <th>S. No.</th>
                              <th>Subscribed On</th>
                              <th>Duration</th>
                              <th>Product</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.subscriptionList.map((subs, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td
                                  className="inline-data"
                                  data-label="Subscribed On"
                                >
                                  {basicFunction.dateTimeInMonthName(
                                    subs.createdOn
                                  )}
                                </td>
                                <td
                                  className="inline-data"
                                  data-label="Duration"
                                >
                                  {subs.subscriptionMeta &&
                                    (subs.subscriptionMeta.duration > 1
                                      ? `${
                                          subs.subscriptionMeta.duration
                                        } Months`
                                      : `${
                                          subs.subscriptionMeta.duration
                                        } Month`)}
                                </td>
                                {/* <td>
                                <a className="btn or-btn btn-light-grey">View</a>
                              </td> */}
                                <td data-label="Product">
                                  {productLink(subs)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      ) : (
                        <h3>
                          You currently have not added any items to your
                          subscription list.
                        </h3>
                      )}
                    </div>
                  </CardTitle>
                  <hr />
                  <Link
                    to={"/" + location.countryCode + "/shop"}
                    className="btn or-btn btn-outline-shopping btn-icon"
                    style={{ marginTop: "15px", width: "300px" }}
                  >
                    START SHOPPING
                  </Link>
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
export default connect(mapStateToProps)(MySubscription);
