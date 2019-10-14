import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardBody, Button } from "reactstrap";
import { ic_done } from "react-icons-kit/md/";

import { setDefaultCard, deleteCard } from "../../actions/cards";
import Icon from "react-icons-kit";
import { accountTypeOpt } from "../Constants";
class SingleCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addCardForm: false
    };
    this.toggleAddCardFrom = this.toggleAddCardFrom.bind(this);
  }
  toggleAddCardFrom() {
    const { addCardForm } = this.state;
    this.setState({
      addCardForm: !addCardForm
    });
  }
  deleteCard = () => {
    const { user, card, cards } = this.props;
    this.props.deleteCard(user._id, card, cards, cards.cards);
  };
  setDefaultCard = () => {
    const { user, card, cards } = this.props;
    this.props.setDefaultCard(
      user._id,
      card.customerPaymentProfileId,
      cards,
      cards.cards
    );
  };
  onSubmitSuccess = () => {
    this.setState({
      addCardForm: false
    });
  };
  convertCardNumber = (number = "") => {
    if (number)
      return number
        .split("")
        .map((el, ind) => (ind > number.length - 5 ? el : "X"))
        .join("");

    return "";
  };

  render() {
    // const { addCardForm } = this.state;
    const {
      // defaultCard,
      card
    } = this.props;
    console.log({
      props11: this.props
    });
    const getAccountType = accountType => {
      const foundAccount = accountTypeOpt.find(el => el.value === accountType);
      if (foundAccount) {
        return foundAccount.label;
      }
      return accountType;
    };
    if (card.bankAccount) {
      const {
        accountNumber,
        accountType,
        nameOnAccount,
        routingNumber
      } = card.bankAccount;
      return (
        <div className="col-md-12 col-sm-12 col-xs-12">
          <Card className="panel-section">
            <CardBody>
              <div className="row align-items-md-center">
                <div className="col-md-8 col-sm-8 col-xs-12">
                  <h6>{nameOnAccount ? nameOnAccount : "No Name"}</h6>
                  <p className="mb-md-2">
                    Account Number: {accountNumber} | Routing Number:{" "}
                    {routingNumber}
                    {/* {this.convertCardNumber(card.cardnumber)} */}
                  </p>
                  <p className="mb-md-0">
                    Account Type: {getAccountType(accountType)}
                    {/* {this.convertCardNumber(card.cardnumber)} */}
                  </p>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-12 d-md-flex justify-content-md-end">
                  <ul className="address-ul">
                    {/* <li>
                    <Button
                      color="link"
                      className="simple-link"
                      onClick={() => this.toggleAddCardFrom()}
                    >
                      Edit
                    </Button>
                  </li> */}
                    <li>
                      <Button
                        onClick={this.deleteCard}
                        color="link"
                        className="simple-link"
                      >
                        Delete
                      </Button>
                    </li>
                    {card.isDefault ? (
                      <li>
                        <Button color="link" className="simple-link" disabled>
                          <Icon
                            size="20"
                            style={{ color: "green" }}
                            icon={ic_done}
                          />
                        </Button>
                      </li>
                    ) : (
                      <li>
                        <Button
                          onClick={this.setDefaultCard}
                          color="link"
                          className="simple-link"
                        >
                          Set as Default
                        </Button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      );
    }

    return <div />;
  }
}

const mapStateToProps = state => ({
  user: state.user,
  location: state.location,
  cards: state.cards
});
export default connect(
  mapStateToProps,
  { setDefaultCard, deleteCard }
)(SingleCheck);
