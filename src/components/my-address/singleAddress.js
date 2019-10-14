import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardBody, Button } from "reactstrap";
import { ic_done } from "react-icons-kit/md/";

import Icon from "react-icons-kit";
import { deleteAddress, setDefaultAddress } from "../../actions/address";
class SingleAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  deleteAddress = () => {
    const { user, address, wholeAddress } = this.props;
    this.props.deleteAddress(
      user._id,
      address.id,
      wholeAddress,
      wholeAddress.address
    );
  };
  setDefaultAddress = () => {
    const { user, address, wholeAddress } = this.props;
    this.props.setDefaultAddress(
      user._id,
      address.id,
      wholeAddress,
      wholeAddress.address
    );
  };
  editAddress = () => {
    const {
      history,
      location: { countryCode },
      address: { id }
    } = this.props;

    history.push(`/${countryCode}/edit-address/${id}`);
  };
  render() {
    const { address } = this.props;
    // console.log({addressSingle : address })
    if (!address) return <div />;
    return (
      <div className="col-md-4 col-sm-6 col-xs-12">
        <Card className="panel-section">
          <CardBody>
            <div className="w-100">
              <h6 className="text-capitalize">
                {address.firstname + " "}
                {address.lastname}
              </h6>
            </div>
            <div className="w-100">
              <p className="l-h">{address.address}</p>
              <p className="l-h">
                {address.city && <span>{address.city}, </span>}
                {address.state && <span>{address.state}, </span>}
                {address.country && <span>{address.country}, </span>}
                {address.zip && <span>{address.zip}. </span>}
              </p>
            </div>
            <div className="w-100">
              <p className="l-h">Phone Number {address.phone}</p>
            </div>
            {/* <a href="/">+ Add delivery instructions</a> */}
            <hr />
            <div className="w-100">
              <ul className="address-ul">
                <li>
                  <Button
                    onClick={this.editAddress}
                    color="link"
                    className="simple-link"
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={this.deleteAddress}
                    color="link"
                    className="simple-link"
                  >
                    Delete
                  </Button>
                </li>
                <li>
                  {address.isDefault && (
                    <Button color="link" className="simple-link" disabled>
                      <Icon
                        size="20"
                        style={{ color: "green" }}
                        icon={ic_done}
                      />
                    </Button>
                  )}
                  {!address.isDefault && (
                    <Button
                      onClick={this.setDefaultAddress}
                      color="link"
                      className="simple-link"
                    >
                      Set as Default
                    </Button>
                  )}
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  location: state.location,
  wholeAddress: state.address
});
export default connect(
  mapStateToProps,
  { deleteAddress, setDefaultAddress }
)(SingleAddress);
