import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Alert,
  Table,
  // Badge,
  Modal,
  ModalBody,
  // ModalFooter,
  ButtonGroup,
  ModalHeader
  // Collapse
} from "reactstrap";

import classNames from "classnames";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import {
  cancelOrder,
  myOrderPageFooterDetails,
  warningText,
  productDetailModalTitle,
  projectName
} from "../../constantMessage";

import { addToCart } from "../../actions";
import { variablePriceSet } from "../../services/extra/cartHealpers";
import { getProductDetailApi } from "../../services/api";

// import { eye } from "react-icons-kit/fa";
import Icon from "react-icons-kit";
import BasicFunction from "../../services/extra/basicFunction";
import {
  // getOrderList,
  getOrderByUser,
  orderDelete
} from "../../services/api";
import { Link } from "react-router-dom";
import MyAccountSidebar from "../MyAccountSidebar";
import { Lodar, CustomLink } from "../";
import { FullModal } from "../modal";
import OrderReview from "../reviews/OrderReview";
import {
  ic_error_outline
  // ic_remove_shopping_cart
} from "react-icons-kit/md";
import { addSlugToProduct } from "../../services/extra";
import { invoiceUrl } from "../Constants";
const basicFunction = new BasicFunction();
class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: "",
      loginUserId: "",
      orderSingle: "",
      conformShow: false,
      conformSucess: false,
      conformFail: false,
      ConformClose: false,
      failShow: false,
      deleteOrderId: null,
      SpinnerToggle: true,
      reorderDetails: "",
      openReviewPid: null
    };
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.sweetAlert = this.sweetAlert.bind(this);
    this.reorder = this.reorder.bind(this);
  }
  componentDidMount() {
    const { user, history, location } = this.props;
    if (!user._id) {
      history.push("/" + location.countryCode + "/login");
    }
    if (user._id) {
      this.setState({
        loginUserId: user._id
      });
    }

    getOrderByUser(this.props.user.userMetaId)
      .then(res => res.json())
      .then(resJson => {
        if (resJson.status) {
          const orderList = resJson.orders.sort(function(a, b) {
            return new Date(b.createdOn) - new Date(a.createdOn);
          });
          this.setState(
            {
              orderList: orderList.map(el => ({
                ...el,
                products: el.products.map(el => addSlugToProduct(el))
              })),
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
      });
  }
  componentWillUnmount() {
    if (this.dismissTimeout) clearTimeout(this.dismissTimeout);
  }
  toggle(order = "") {
    this.setState({
      modal: true,
      orderSingle: order
    });
  }
  toggle2(order = "") {
    this.setState({
      modal: false
    });
  }
  openReviewCollapse = openReviewPid => {
    this.setState(prevState => ({
      openReviewPid:
        openReviewPid === prevState.openReviewPid ? null : openReviewPid
    }));
  };
  dismissReviewModal = () => {
    if (this.dismissReviewModal) clearTimeout(this.dismissReviewModal);

    this.openReviewCollapse(null);
  };
  sweetAlert(type) {
    switch (type) {
      case "openFirst":
        this.setState({
          conformShow: true
        });
        break;
      case "openSecond":
        if (this.state.deleteOrderId) {
          const id = this.state.deleteOrderId;
          this.setState({
            SpinnerToggle: true
          });
          orderDelete({ id })
            .then(res => res.json())
            .then(resJson => {
              if (resJson.status) {
                this.setState({
                  conformShow: false,
                  conformSucess: true,
                  deleteOrderId: null
                });
              }
              getOrderByUser(this.props.user.userMetaId)
                .then(res => res.json())
                .then(resJson => {
                  if (resJson.status) {
                    const revArr = resJson.orders;
                    revArr.sort(function(a, b) {
                      return new Date(b.createdOn) - new Date(a.createdOn);
                    });
                    // revArr.sort((a,b) => a.orderdate - b.orderdate);
                    this.setState({
                      orderList: revArr.map(el => ({
                        ...el,
                        products: el.products.map(el => addSlugToProduct(el))
                      })),
                      SpinnerToggle: false
                    });
                  }
                })
                .catch(err => {});
            })
            .catch(err => {});
        }
        this.setState({
          conformShow: false,
          conformSucess: true
        });
        break;
      case "closeFirst":
        this.setState({
          conformShow: false,
          conformSucess: false
        });
        break;
      case "closeSecond":
        this.setState({
          conformSucess: false,
          conformShow: false
        });
        break;
      case "openThird":
        this.setState({
          failShow: true,
          conformShow: false
        });
        break;
      case "closeThird":
        this.setState({
          failShow: false
        });
        break;
      default:
        break;
    }
  }

  deleteOrder(orderId) {
    this.setState({
      deleteOrderId: orderId
    });
    this.sweetAlert("openFirst");
    // orderDelete
  }
  getEstimateTotal() {}
  getCouponCodeDiscountTotal() {}

  reorder(order) {
    this.setState({
      SpinnerToggle: true
    });
    order.products.map((itm, index) => {
      console.log({
        itm
      });
      getProductDetailApi(itm.productMeta || itm.comboId)
        .then(res => res.json())
        .then(resJson => {
          console.log({
            resJson
          });
          if (resJson.product_details.producttype === "variable") {
            const product = resJson.product_details;
            var productItem = { ...product };
            const qty = { label: itm.qty, value: itm.qty };
            productItem.qty = qty;
            resJson.product_details.attributes.map((key, index) => {
              const attribute = key.names;

              const labelValue = {
                label: itm.attribute[attribute],
                value: itm.attribute[attribute]
              };
              productItem = { ...productItem, [attribute]: labelValue };
              return null;
            });
            this.props.addToCart(
              variablePriceSet(productItem),
              this.props.cart,
              this.props.user.userMetaId
            );
          } else {
            const product = resJson.product_details;
            productItem = { ...product };
            const qty = { label: itm.qty, value: itm.qty };
            productItem.qty = qty;
            this.props.addToCart(
              variablePriceSet(productItem),
              this.props.cart,
              this.props.user.userMetaId
            );
          }
        })
        .catch(err => {});
      return null;
    });
    setTimeout(() => {
      this.props.history.push("/" + this.props.location.countryCode + "/cart");
    }, 1000);
  }

  render() {
    var countVal = 0;
    const { location, className } = this.props;
    const { openReviewPid } = this.state;
    this.state.orderList &&
      this.state.orderList.map((order, i) => {
        console.log({
          orderId: order.userId,
          loginUserId: this.state.loginUserId
        });
        return order.userId === this.state.loginUserId ? (countVal = 1) : "";
      });

    var serNo = 0;
    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <Helmet>
          <title>{projectName} | My Account</title>
        </Helmet>
        {this.state.SpinnerToggle && <Lodar />}
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 ">
              <MyAccountSidebar activeLink="MY ACCOUNT" />
            </div>
            <div className="col-lg-9 ">
              <h3>My Order</h3>
              <Card className="panel-section">
                <Alert color="dark">RECENT PURCHASES</Alert>
                <CardBody>
                  <CardTitle>
                    <div className="">
                      {this.state.orderList &&
                      countVal > 0 &&
                      this.state.orderList.length > 0 ? (
                        <Table className="new-res-table" hover>
                          <thead>
                            <tr>
                              <th>S.No.</th>
                              <th>Product Name</th>
                              <th>Price</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.orderList.map(
                              (order, i) => (
                                // order.userid === this.state.loginUserId ? (
                                <tr key={i}>
                                  <th className="sr-number" scope="row">
                                    {(serNo = serNo + 1)}
                                  </th>
                                  <td data-label="Name">
                                    {order.products.map((pro, i) => {
                                      const link = pro.productSlug
                                        ? `/${location.countryCode}/shop/${
                                            pro.productSlug
                                          }`
                                        : null;
                                      return (
                                        <p>
                                          <CustomLink key={i} to={link}>
                                            {pro.title}
                                          </CustomLink>
                                        </p>
                                      );
                                    })}
                                  </td>
                                  <td
                                    data-label="Price"
                                    className="inline-data"
                                  >
                                    {basicFunction.currancyAddWithNumber(
                                      order.grandTotal
                                    )}
                                  </td>
                                  <td data-label="Date" className="inline-data">
                                    {basicFunction.dateTimeInMonthName(
                                      order.createdOn
                                    )}{" "}
                                  </td>
                                  <td
                                    data-label="Status"
                                    className="inline-data text-capitalize"
                                  >
                                    {order.deleted !== "true"
                                      ? // <Badge className="btn9">
                                        order.status
                                      : // </Badge>
                                        // <Badge className="btn6">
                                        order.deleted
                                    // </Badge>
                                    }
                                  </td>
                                  <td data-label="Action">
                                    <ButtonGroup>
                                      <Button
                                        style={{
                                          paddingTop: "12px",
                                          paddingBottom: "12px"
                                        }}
                                        className="btn9 pl-3 pr-3"
                                        onClick={() => this.toggle(order)}
                                      >
                                        {/* <Icon icon={eye} /> */}
                                        View
                                      </Button>
                                      <span style={{ minWidth: "2px" }} />
                                      {/* {order.deleted !== "true" ? (
                                        <Button
                                          className="btn6 pl-3 pr-3"
                                          onClick={() =>
                                            this.deleteOrder(order._id)
                                          }
                                        >
                                          {" "}
                                          <Icon
                                            icon={ic_remove_shopping_cart}
                                          />
                                        </Button>
                                      ) : (
                                        ""
                                      )} */}
                                      <Button
                                        style={{
                                          paddingTop: "12px",
                                          paddingBottom: "12px"
                                        }}
                                        className="btn9 pl-3 pr-3"
                                        onClick={() => this.reorder(order)}
                                      >
                                        Reorder
                                      </Button>
                                      <span style={{ minWidth: "2px" }} />
                                      <Button
                                        style={{
                                          paddingTop: "12px",
                                          paddingBottom: "12px"
                                        }}
                                        target="_blank"
                                        className="btn9 pl-3 pr-3"
                                        // to={}
                                        onClick={()=>{
                                          window.open(`${invoiceUrl}${order._id}.pdf`)
                                        }}
                                      >
                                        {/* <Icon icon={eye} /> */}
                                        Invoice
                                      </Button>
                                    </ButtonGroup>
                                    <div className="w-100 pt-3">
                                      {order.products &&
                                        order.products.filter(
                                          el => !el.reviewed
                                        ).length > 0 && (
                                          <span
                                            onClick={() => {
                                              this.openReviewCollapse(
                                                order._id
                                              );
                                            }}
                                            className="cursor-pointer hover-text-line"
                                          >
                                            Write a product review
                                          </span>
                                        )}

                                      <FullModal
                                        toggle={this.dismissReviewModal}
                                        isOpen={openReviewPid === order._id}
                                      >
                                        <OrderReview
                                          onSuccess={() => {
                                            this.dismissTimeout = setTimeout(
                                              () => {
                                                this.dismissReviewModal();
                                              },
                                              1500
                                            );
                                          }}
                                          order={order}
                                        />
                                      </FullModal>
                                    </div>
                                  </td>
                                </tr>
                              )
                              // ) : null
                            )}
                          </tbody>
                        </Table>
                      ) : (
                        <h3>You currently don't have any purchases.</h3>
                      )}
                    </div>
                  </CardTitle>
                  <hr />
                  <CardSubtitle>
                    From here you can:
                    {myOrderPageFooterDetails &&
                    myOrderPageFooterDetails.length > 0 ? (
                      <ul className="myAccount-recent-parchase-ul row">
                        {myOrderPageFooterDetails.map((det, i) => (
                          <li key={i}>{det.details}</li>
                        ))}
                      </ul>
                    ) : (
                      ""
                    )}
                  </CardSubtitle>

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
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle2}
            className={this.props.className + " order-view-modal full-modal"}
          >
            <ModalHeader toggle={this.toggle2}>
              {productDetailModalTitle}
            </ModalHeader>
            <ModalBody className="center-modal p-0">
              <div className="modal-inner">
                <Table className="new-res-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.orderSingle &&
                    this.state.orderSingle.products.length > 0
                      ? this.state.orderSingle.products.map((itm, i) => {
                          console.log({
                            itm,
                            orderSingle: this.state.orderSingle
                          });
                          return (
                            <tr key={i}>
                              <td data-label="Title"> {itm.title}</td>
                              <td data-label="Rate" className="inline-data">
                                {" "}
                                {basicFunction.currancyAddWithNumber(
                                  parseFloat(itm.unitPrice)
                                )}
                              </td>
                              <td data-label="Quantity" className="inline-data">
                                {" "}
                                {itm.qty}
                              </td>
                              <td data-label="Price" className="inline-data">
                                {itm.subscribed ? (
                                  <div>
                                    <strike>
                                      {basicFunction.currancyAddWithNumber(
                                        itm.unitPrice * itm.qty
                                      )}
                                    </strike>
                                    <br />
                                    <span>
                                      {basicFunction.currancyAddWithNumber(
                                        itm.unitPrice * itm.qty -
                                          basicFunction.getParchantage(
                                            itm.subscribedDiscountPersent,
                                            itm.unitPrice * itm.qty
                                          )
                                      )}
                                    </span>
                                  </div>
                                ) : (
                                  basicFunction.currancyAddWithNumber(
                                    itm.subTotal
                                  )
                                )}
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                    <tr className="order-view-bottom">
                      <td className="hide-in-res" colSpan="3">
                        Sub Total
                      </td>
                      <td data-label="Sub Total" className="inline-data">
                        {basicFunction.currancyAddWithNumber(
                          this.state.orderSingle.wholeSubtotal || 0
                        )}
                      </td>
                    </tr>
                    <tr className="order-view-bottom">
                      <td className="hide-in-res" colSpan="3">
                        Shipping Charge
                      </td>
                      <td data-label="Shipping Charge" className="inline-data">
                        {basicFunction.currancyAddWithNumber(
                          this.state.orderSingle.shippingCharge || 0
                        )}
                      </td>
                    </tr>
                    <tr className="order-view-bottom">
                      <td className="hide-in-res" colSpan="3">
                        Estimated Tax
                      </td>
                      <td data-label="Estimated Tax" className="inline-data">
                        {basicFunction.currancyAddWithNumber(
                          basicFunction.getParchantage(
                            parseFloat(this.state.orderSingle.countryTax),
                            this.state.orderSingle.wholeSubtotal +
                              this.state.orderSingle.shippingcharge
                          ) ||
                            (this.state.orderSingle.taxAmount &&
                              this.state.orderSingle.taxAmount.toFixed(2)) ||
                            0
                        )}
                      </td>
                    </tr>
                    {this.state.orderSingle.couponDisc ? (
                      <tr className="order-view-bottom">
                        <td className="hide-in-res" colSpan="3">
                          Coupon discount ( {this.state.orderSingle.couponDisc}
                          %)
                        </td>
                        <td
                          data-label="Coupon discount"
                          className="inline-data"
                        >
                          -{" "}
                          {basicFunction.currancyAddWithNumber(
                            basicFunction.getParchantage(
                              parseFloat(this.state.orderSingle.couponDisc),
                              this.state.orderSingle.wholeSubtotal
                            ) || 0
                          )}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}

                    <tr className="order-view-bottom">
                      <td className="hide-in-res" colSpan="3">
                        Grand Total
                      </td>
                      <td data-label="Grand Total" className="inline-data">
                        {basicFunction.currancyAddWithNumber(
                          this.state.orderSingle.grandTotal
                        )}
                      </td>
                    </tr>
                    {/* <tr>
                      <td className="hide-in-res" colSpan="3">
                        Payment Method
                      </td>
                      <td data-label="Payment Method" className="inline-data">
                        {this.state.orderSingle.paymentMethod}
                      </td>
                    </tr> */}
                  </tbody>
                </Table>

                {this.state.orderSingle.userdetails ? (
                  <div>
                    <h4>
                      <b>User Details</b>
                    </h4>
                    {this.state.orderSingle.userdetails.firstname ? (
                      <h5>
                        <b>Name : </b>
                        {this.state.orderSingle.userdetails.firstname}{" "}
                        {this.state.orderSingle.userdetails.lastname}
                      </h5>
                    ) : (
                      ""
                    )}
                    {this.state.orderSingle.userdetails.email ? (
                      <h5>
                        <b>Email : </b>
                        {this.state.orderSingle.userdetails.email}{" "}
                      </h5>
                    ) : (
                      ""
                    )}
                    {this.state.orderSingle.userdetails.phonenumber ? (
                      <h5>
                        <b>Phone : </b>
                        {this.state.orderSingle.userdetails.phonenumber}{" "}
                      </h5>
                    ) : (
                      ""
                    )}
                    <hr />
                    {this.state.orderSingle.userdetails.shippingaddress ? (
                      <p>
                        <b>Shipping Address: </b>
                        {this.state.orderSingle.userdetails.shippingaddress}
                      </p>
                    ) : (
                      ""
                    )}
                    {this.state.orderSingle.userdetails.billingaddress ? (
                      <p>
                        <b>Billing Address: </b>
                        {this.state.orderSingle.userdetails.billingaddress}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
                <hr />
              </div>
            </ModalBody>
            {/* <ModalFooter>
              <Button color="secondary" onClick={this.toggle2}>
                Close
              </Button>
            </ModalFooter> */}
          </Modal>
        </div>

        <div>
          <Modal
            isOpen={this.state.conformShow}
            toggle={() => this.sweetAlert("openThird")}
            className={"full-modal"}
          >
            <ModalHeader toggle={() => this.sweetAlert("openThird")}>
              {warningText}
            </ModalHeader>
            <div className="Modal-body center-modal">
              <div className="modal-inner">
                <div className="modal-content p-3">
                  <Icon
                    icon={ic_error_outline}
                    className="text-center"
                    size="64"
                  />
                  <br />
                  <p className="text-center title-80">{cancelOrder}</p>
                  <div className="row">
                    <div className="col-md-6 ">
                      <button
                        className=" btn btn-info btn6 mx-auto"
                        onClick={() => this.sweetAlert("openSecond")}
                      >
                        Yes, Cancel it!
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        className="btn btn-info btn7 mx-auto"
                        onClick={() => this.sweetAlert("openThird")}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  location: state.location
});
export default connect(
  mapStateToProps,
  { addToCart }
)(MyAccount);
