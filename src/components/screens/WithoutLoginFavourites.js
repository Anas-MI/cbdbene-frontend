import React, { Component } from "react";
import Icon from "react-icons-kit";
import { trash, shoppingCart } from "react-icons-kit/fa";
import { connect } from "react-redux";
import classNames from "classnames";
import { getProductDetailApi } from "../../services/api";
import { ic_clear } from "react-icons-kit/md/";
import { filePath } from "../Constants";
import {
  Card,
  CardBody,
  CardTitle,
  Alert,
  Table,
  ButtonGroup,
  Button,
  Modal,
  ModalHeader
} from "reactstrap";
import { variablePriceSet } from "../../services/extra/cartHealpers";
import {
  favouritesAlreadyProductIntoCartMessage,
  addToCartMessage
} from "../../constantMessage";
import { setFav, addToCart, setWishList, toggleCartBar } from "../../actions";

import { Link } from "react-router-dom";
import BasicFunction from "../../services/extra/basicFunction";
const basicFunction = new BasicFunction();
class WithoutLoginFavourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishList: [],
      err: false,
      errMsg: "",
      visible: false,
      showModal: false,
      isLoading: false,
      modalData: {
        title: "",
        msg: ""
      }
    };
    this.toggleModal = this.toggleModal.bind(this);

    this.getWishlist = this.getWishlist.bind(this);
  }
  componentDidMount() {
    const { user, history, location } = this.props;
    if (user._id) {
      history.push("/" + location.countryCode + "/my-favourites");
    }

    this.getWishlist();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  toggleModal() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }
  addToCart(id, productSlug) {
    var flag = false;
    const {
      cart,
      location,
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
        }
      );
      // setInterval(() => {
      //   this.setState({
      //     showModal: false
      //   });
      // }, 3000);
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
              }
            );

            this.props.addToCart(
              variablePriceSet(productItem),
              this.props.cart,
              this.props.user.userMetaId
            );
            // setInterval(() => {
            //   this.setState({
            //     showModal: false
            //   });
            // }, 3000);
          }
        })
        .catch(err => {});
    }
  }

  getWishlist() {}
  removeWishList(itm) {
    const removeIndex = basicFunction.checkProductInWishList(
      this.props.wishList,
      itm.productid
    );
    var wishListArray = [...this.props.wishList];
    if (removeIndex || removeIndex === 0) {
      wishListArray.splice(removeIndex, 1);
      this.props.setWishList(wishListArray);
      this.setState({
        SpinnerToggle: false
      });
    }
  }

  render() {
    const { modalData, showModal } = this.state;
    const { location, wishList, className } = this.props;
    console.log({
      wishList
    });
    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 ">
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
                    {wishList && wishList.length > 0 ? (
                      <div className="middletable table-responsive">
                        <Table className="new-res-table" hover>
                          <thead>
                            <tr>
                              <th>Product Image</th>
                              <th>Product Name</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {wishList.map((itm, index) => (
                              <tr key={index}>
                                <td>
                                  {itm.productDetails &&
                                    itm.productDetails.mainImage && (
                                      <img
                                        src={
                                          filePath +
                                          itm.productDetails.mainImage
                                        }
                                        className="favrate-list-image-width"
                                        alt="product"
                                      />
                                    )}
                                </td>
                                <td>{itm.productDetails.productName}</td>
                                <td>
                                  <div>
                                    <ButtonGroup>
                                      <Link
                                        className="btn9 btn mobile-remove-btn-padding"
                                        to={
                                          "/" +
                                          location.countryCode +
                                          "/shop/" +
                                          itm.productSlug
                                        }
                                      >
                                        View
                                      </Link>

                                      <Button
                                        className="btn6 btn mobile-remove-btn-padding"
                                        onClick={() => this.removeWishList(itm)}
                                      >
                                        {" "}
                                        <Icon icon={trash} />
                                      </Button>
                                      <Button
                                        className="btn2 btn mobile-remove-btn-padding"
                                        onClick={() =>
                                          this.addToCart(
                                            itm.productmeta,
                                            itm.productSlug
                                          )
                                        }
                                      >
                                        {" "}
                                        <Icon icon={shoppingCart} />
                                      </Button>
                                    </ButtonGroup>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    ) : (
                      <p>You currently don't have any favourites.</p>
                    )}
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
          toggle={this.toggleModal}
          className={"full-modal"}
        >
          <ModalHeader toggle={this.toggleModal}>{modalData.title}</ModalHeader>
          <div className="Modal-body center-modal">
            <div className="modal-inner">
              <div className="modal-content">
                {/* <p className="text-center MCItemCarouselIntro-title">
                  {modalData.title}
                </p> */}
                <p className="text-center ">{modalData.msg}</p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user,
  location: state.location,
  wishList: state.wishList,
  isCartBarOpen: state.cartSideBar.isOpen
});
export default connect(
  mapStateToProps,
  { setFav, addToCart, setWishList, toggleCartBar }
)(WithoutLoginFavourites);
