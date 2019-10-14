import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import PreCheckout from "../PreCheckout";
import CheckOutForm from "../CheckOutForm";
import { Redirect } from "react-router-dom";
import {
  setGuest,
  getUserMetaNoCart,
  setCheckoutPage,
  setRedirectCheckout
} from "../../actions";
import classNames from "classnames";
import { projectName } from "../../constantMessage";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.handleShowCheckout = this.handleShowCheckout.bind(this);
    this.handleGoToRegister = this.handleGoToRegister.bind(this);
    this.state = {
      showCheckout: false,
      isRegister: false
    };
  }
  componentDidMount() {
    const { user, cart, setCheckoutPage } = this.props;
    if (user._id) {
      this.setState({ showCheckout: true });
      if (cart && cart.items && cart.items.length > 0) {
        if (!user.userMetaId || !user.userMetaObj) {
          this.props.getUserMetaNoCart(user._id);
        }
      }
    }
    setCheckoutPage(true);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  componentWillUnmount() {
    this.props.setCheckoutPage(false);
  }
  handleShowCheckout() {
    this.props.setGuest(true);
    this.setState({
      showCheckout: true
    });
  }
  handleGoToRegister() {
    this.props.setRedirectCheckout(true);
    setTimeout(() => {
      this.setState({
        isRegister: true
      });
    }, 100);
  }

  render() {
    const {
      cart,
      location: { countryCode },
      className
    } = this.props;
    const { showCheckout, isRegister } = this.state;
    if (cart.items < 1) {
      return <Redirect to={`/${countryCode}/cart`} />;
    }
    if (isRegister) {
      return <Redirect to={`/${countryCode}/registration`} />;
    }
    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <Helmet>
          <title>{projectName} | Checkout</title>
        </Helmet>
        {!showCheckout && (
          <PreCheckout
            {...this.props}
            onGaust={this.handleShowCheckout}
            onRegister={this.handleGoToRegister}
          />
        )}
        {showCheckout && <CheckOutForm {...this.props} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart,
  location: state.location
});
export default connect(
  mapStateToProps,
  { setGuest, getUserMetaNoCart, setCheckoutPage, setRedirectCheckout }
)(Checkout);
