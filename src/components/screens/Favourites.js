import React, { Component } from "react";
import Icon from "react-icons-kit";
import { Helmet } from "react-helmet";
import { trash, shoppingCart } from "react-icons-kit/fa";
import { connect } from "react-redux";
import { filePath, encodeUrlFn } from "../Constants";
import classNames from "classnames";
import {
  favouritesAlreadyProductIntoCartMessage,
  addToCartMessage,
  projectName
} from "../../constantMessage";
import {
  Card,
  CardBody,
  CardTitle,
  Alert,
  Table,
  ButtonGroup,
  Button
  // Modal
} from "reactstrap";
import { setFav, addToCart, setWishList, toggleCartBar } from "../../actions";
import { Modal } from "../modal";
import { variablePriceSet } from "../../services/extra/cartHealpers";
import {
  getWishListApi,
  deleteWishList,
  getProductDetailApi
} from "../../services/api";
import { Link } from "react-router-dom";
import MyAccountSidebar from "../MyAccountSidebar";
import Lodar from "../lodar";
import BasicFunction from "../../services/extra/basicFunction";
const basicFunction = new BasicFunction();
class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      wishList: "",
      err: false,
      errMsg: "",
      visible: false,
      SpinnerToggle: true,
      showModal: false,
      isLoading: false,
      modalData: {
        title: "",
        msg: ""
      }
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteWishList = this.deleteWishList.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    // this.getWishlist = this.getWishlist.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  componentDidMount() {
    const { user, location, history } = this.props;
    if (!user._id) {
      history.push("/" + location.countryCode + "/favourites");
    }
    if (user._id) {
      this.setState({
        user_id: user._id
      });
      this.getWishlist();
    }
  }

  toggleModal() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  getWishlist() {
    const { user } = this.props;
    if (user._id) {
      const userid = user._id;

      getWishListApi(userid)
        .then(res => res.json())
        .then(resJson => {
          if (resJson.success) {
            const wishList = resJson.wishlist.filter(itm => {
              if (itm.productid && itm.productmeta._id) return true;
              return false;
            });
            const wishListCombo = resJson.combo.filter(itm => {
              if (itm.comboid._id) return true;
              return false;
            });

            const wishListBoth = wishList.concat(wishListCombo);

            const items = wishListBoth;

            document.body.scrollTop = document.documentElement.scrollTop = 0;

            const data = items.map(itm => {
              if (itm.combo) {
                const productSlug = encodeUrlFn(itm.comboid.title);
                return {
                  productid: itm.comboid._id,
                  productmeta: itm.comboid._id,
                  userid: userid,
                  wishListId: itm._id,
                  combo: true,
                  productDetails: {
                    ...itm,
                    comboid: {
                      ...itm.comboid,
                      productSlug: productSlug.toLowerCase()
                    }
                  }
                };
              } else {
                const productSlug = encodeUrlFn(itm.productid.producttitle);
                return {
                  productid: itm.productid._id,
                  productmeta: itm.productmeta._id,
                  userid: userid,
                  wishListId: itm._id,
                  combo: false,
                  productDetails: {
                    ...itm,
                    productid: {
                      ...itm.productid,
                      productSlug: productSlug.toLowerCase()
                    }
                  }
                };
              }
            });

            this.setState(
              {
                wishList: data,
                SpinnerToggle: false
              },
              () => {
                setTimeout(() => {
                  this.props.setFav(
                    0,
                    this.props.cart,
                    this.props.user.userMetaId
                  );
                  this.props.setWishList(data);
                }, 100);
              }
            );
          }
        })
        .catch(err => {});

      this.setState({
        user_id: user._id
      });
    }
  }

  addToCart(id, productSlug) {
    var flag = false;
    const {
      location,
      cart,
      history,
      toggleCartBar,
      isCartBarOpen
    } = this.props;
    cart.items.map(key => {
      if (key._id === id) {
        flag = true;
      }
      return null;
    });
    if (flag) {
      this.setState(
        {
          isLoading: true,
          // showModal: true,
          modalData: {
            title: "",
            msg: favouritesAlreadyProductIntoCartMessage
          }
        },
        () => {
          if (!isCartBarOpen) {
            toggleCartBar();
          }
          // setTimeout(() => {
          //   this.setState({
          //     showModal: false
          //   });
          // }, 3000);
        }
      );
    } else {
      getProductDetailApi(id)
        .then(res => res.json())
        .then(resJson => {
          if (resJson.product_details.producttype === "variable") {
            if (
              resJson.product_details.attributes &&
              resJson.product_details.attributes.length === 1 &&
              resJson.product_details.attributes[0].values.length === 1
            ) {
              const { attributes } = resJson.product_details;
              if (attributes) {
                if (attributes.constructor === Array) {
                  const variablesArr = attributes
                    .filter(el => el)
                    .map(el => {
                      const { values, names } = el;
                      if (values) {
                        if (values.constructor === Array) {
                          if (values.length === 1) {
                            return {
                              [names]: {
                                label: values[0],
                                value: values[0]
                              }
                            };
                          }
                          return {
                            [names]: null
                          };
                        }
                      }
                      return null;
                    })
                    .filter(el => el);

                  const product = resJson.product_details;
                  var productItem = { ...product };
                  productItem = { ...productItem, ...variablesArr[0] };
                  const qty = { label: 1, value: 1 };
                  productItem.qty = qty;
                  this.setState(
                    {
                      isLoading: true,
                      // showModal: true,
                      modalData: {
                        title: "",
                        msg: addToCartMessage
                      }
                    },
                    () => {
                      if (!isCartBarOpen) {
                        toggleCartBar();
                      }
                      // setTimeout(() => {
                      //   this.setState({
                      //     showModal: false
                      //   });
                      // }, 3000);
                    }
                  );
                  this.props.addToCart(
                    variablePriceSet(productItem),
                    this.props.cart,
                    this.props.user.userMetaId
                  );
                }
              }
            } else {
              history.push("/" + location.countryCode + "/shop/" + productSlug);
            }
          } else {
            const product = resJson.product_details;
            let productItem = { ...product };
            const qty = { label: 1, value: 1 };
            productItem.qty = qty;
            this.setState(
              {
                isLoading: true,
                // showModal: true,
                modalData: {
                  title: "",
                  msg: addToCartMessage
                }
              },
              () => {
                if (!isCartBarOpen) {
                  toggleCartBar();
                }
                // setTimeout(() => {
                //   this.setState({
                //     showModal: false
                //   });
                // }, 3000);
              }
            );
            this.props.addToCart(
              variablePriceSet(productItem),
              this.props.cart,
              this.props.user.userMetaId
            );
          }
        })
        .catch(err => {});
    }
  }

  deleteWishList(ids, itm) {
    this.setState({
      SpinnerToggle: true
    });

    var wishListArray = [...this.props.wishList];
    const removeIndex = basicFunction.checkProductInWishList(
      wishListArray,
      itm.productid
    );
    if (removeIndex || removeIndex === 0) {
      if (this.props.user._id) {
        var id = wishListArray[removeIndex].wishListId;
        deleteWishList({ id })
          .then(res => res.json())
          .then(resJson => {
            if (resJson.success) {
              wishListArray.splice(removeIndex, 1);
              this.props.setWishList(wishListArray);
              this.getWishlist();
            }
          })
          .catch();
      }
    }
    this.setState({
      SpinnerToggle: false
    });
  }
  onDismiss() {
    this.setState({ visible: false });
  }
  render() {
    const { modalData, showModal, wishList } = this.state;
    const { location, className } = this.props;
    // const {wishList} = this.props;

    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <Helmet>
          <title>{projectName} | Favourites</title>
        </Helmet>
        {this.state.SpinnerToggle && <Lodar />}

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 ">
              <MyAccountSidebar activeLink="FAVOURITES" />
            </div>
            <div className="col-lg-9 ">
              <h3>Favourites</h3>
              <Card className="panel-section">
                <Alert color="dark">YOUR FAVOURITES</Alert>
                <CardBody>
                  <CardTitle>
                    <Alert
                      color="info"
                      isOpen={this.state.visible}
                      toggle={this.onDismiss}
                    >
                      {this.state.errMsg}
                    </Alert>
                    <div className="table-responsive middletable">
                      {wishList && wishList.length > 0 ? (
                        <Table className="new-res-table" hover>
                          <thead>
                            <tr>
                              <th>Product Image</th>
                              <th>Product Name</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {wishList.map((itm, index) => {
                              console.log({
                                item: itm.productDetails
                              });
                              if (itm.combo) {
                                const {
                                  featureimage,
                                  title,
                                  _id,
                                  productSlug
                                } = itm.productDetails.comboid;
                                console.log({
                                  featureimage,
                                  title,
                                  _id,
                                  productSlug
                                });
                                return (
                                  <tr key={index}>
                                    <td>
                                      {" "}
                                      {itm.productDetails.comboid && (
                                        <img
                                          src={filePath + featureimage}
                                          className="favrate-list-image-width"
                                          alt="product"
                                        />
                                      )}
                                    </td>
                                    <td> {title} </td>
                                    <td>
                                      {_id ? (
                                        <div>
                                          <ButtonGroup>
                                            <Link
                                              className="btn9 mobile-remove-btn-padding"
                                              to={
                                                "/" +
                                                location.countryCode +
                                                "/shop/" +
                                                productSlug
                                              }
                                            >
                                              View
                                            </Link>
                                            <Button
                                              className="btn6 mobile-remove-btn-padding"
                                              onClick={() =>
                                                this.deleteWishList(
                                                  itm.wishListId,
                                                  itm
                                                )
                                              }
                                            >
                                              {" "}
                                              <Icon icon={trash} />
                                            </Button>
                                            <Button
                                              className="btn2 mobile-remove-btn-padding"
                                              onClick={() =>
                                                this.addToCart(
                                                  itm.productDetails.comboid
                                                    ._id,
                                                  itm.productDetails.comboid
                                                    .productSlug
                                                )
                                              }
                                            >
                                              {" "}
                                              <Icon icon={shoppingCart} />
                                            </Button>
                                          </ButtonGroup>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </td>
                                  </tr>
                                );
                              } else if (false) {
                              }
                              return itm.combo ? (
                                <tr key={index}>
                                  <td>
                                    {" "}
                                    {itm.productDetails.comboid && (
                                      <img
                                        src={
                                          filePath +
                                          itm.productDetails.comboid
                                            .featureimage
                                        }
                                        className="favrate-list-image-width"
                                        alt="product"
                                      />
                                    )}
                                  </td>
                                  <td>
                                    {itm.productDetails.comboid &&
                                      itm.productDetails.comboid.title}
                                  </td>
                                  <td>
                                    {itm.productDetails.comboid &&
                                    itm.productDetails.comboid._id ? (
                                      <div>
                                        <ButtonGroup>
                                          <Link
                                            className="btn9 mobile-remove-btn-padding"
                                            to={
                                              "/" +
                                              location.countryCode +
                                              "/shop/" +
                                              itm.productDetails.comboid
                                                .productSlug
                                            }
                                          >
                                            View
                                          </Link>
                                          <Button
                                            className="btn6 mobile-remove-btn-padding"
                                            onClick={() =>
                                              this.deleteWishList(
                                                itm.wishListId,
                                                itm
                                              )
                                            }
                                          >
                                            {" "}
                                            <Icon icon={trash} />
                                          </Button>
                                          <Button
                                            className="btn2 mobile-remove-btn-padding"
                                            onClick={() =>
                                              this.addToCart(
                                                itm.productDetails.comboid._id,
                                                itm.productDetails.comboid
                                                  .productSlug
                                              )
                                            }
                                          >
                                            {" "}
                                            <Icon icon={shoppingCart} />
                                          </Button>
                                        </ButtonGroup>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </td>
                                </tr>
                              ) : (
                                <tr key={index}>
                                  <td>
                                    {itm.productDetails.productid &&
                                      itm.productDetails.productid
                                        .featurefilepath && (
                                        <img
                                          src={
                                            filePath +
                                            itm.productDetails.productid
                                              .featurefilepath
                                          }
                                          className="favrate-list-image-width"
                                          alt="product"
                                        />
                                      )}
                                  </td>
                                  <td>
                                    {itm.productid &&
                                      itm.productDetails.productid.producttitle}
                                  </td>
                                  <td>
                                    {itm.productmeta &&
                                    itm.productDetails.productmeta._id ? (
                                      <div>
                                        <ButtonGroup>
                                          <Link
                                            className="btn9 btn mobile-remove-btn-padding"
                                            to={
                                              "/" +
                                              location.countryCode +
                                              "/shop/" +
                                              itm.productDetails.productid
                                                .productSlug
                                            }
                                          >
                                            View
                                          </Link>
                                          <Button
                                            className="btn6 mobile-remove-btn-padding"
                                            onClick={() =>
                                              this.deleteWishList(itm._id, itm)
                                            }
                                          >
                                            {" "}
                                            <Icon icon={trash} />
                                          </Button>
                                          <Button
                                            className="btn2 mobile-remove-btn-padding"
                                            onClick={() =>
                                              this.addToCart(
                                                itm.productDetails.productmeta
                                                  ._id,
                                                itm.productDetails.productSlug
                                              )
                                            }
                                          >
                                            {" "}
                                            <Icon icon={shoppingCart} />
                                          </Button>
                                        </ButtonGroup>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      ) : (
                        <h3>You currently don't have any favourites.</h3>
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
        <Modal
          isOpen={showModal}
          heading={modalData.title}
          toggle={this.toggleModal}
        >
          {/* <p className="text-center MCItemCarouselIntro-title">
            {modalData.title}
          </p> */}
          <p className="text-center title-80 p-3">{modalData.msg}</p>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart,
  location: state.location,
  wishList: state.wishList,
  isCartBarOpen: state.cartSideBar.isOpen
});
export default connect(
  mapStateToProps,
  { setFav, addToCart, setWishList, toggleCartBar }
)(Favourites);
