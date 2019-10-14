import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  // CardFooter,
  Button
  // Collapse
} from "reactstrap";
import { ic_done } from "react-icons-kit/md/";

import { setDefaultCard, deleteCard } from "../../actions/cards";
import Icon from "react-icons-kit";
// import CardForm from "./CardForm";
class SingleCard extends Component {
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
    if (card.creditCard) {
      const { cardType, expirationDate, cardNumber } = card.creditCard;
      return (
        <div className="col-md-12 col-sm-12 col-xs-12">
          <Card className="panel-section">
            <CardBody>
              <div className="row align-items-md-center just">
                <div className="col-md-6 col-sm-6 col-12">
                  <h6>{cardType ? cardType : "No Name"}</h6>
                  <p className="mb-md-0">
                    {cardNumber} | {expirationDate}
                    {/* {this.convertCardNumber(card.cardnumber)} */}
                  </p>
                </div>
                <div className="col-md-6 col-sm-6 col-12 d-md-flex justify-content-md-end">
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

            {/* <Collapse isOpen={this.state.addCardForm}>
            <CardFooter>
              <CardForm
                onSubmitSuccess={this.onSubmitSuccess}
                id={card.id}
                card={card}
                cardDetail=""
              />
            </CardFooter>
          </Collapse> */}
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
)(SingleCard);
