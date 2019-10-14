import React, { Component } from "react";
import { Card, CardBody, CardSubtitle, Alert, Collapse } from "reactstrap";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import MyAccountSidebar from "../MyAccountSidebar";
import { getSingleUserApi } from "../../services/api";
import ProfileUpdate from "../ProfileUpdate";
import classNames from "classnames";

import ProfileUpdatePassword from "../ProfileUpdatePassword";
import { projectName } from "../../constantMessage";
class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.editProfile = this.editProfile.bind(this);
    this.editPassword = this.editPassword.bind(this);
    this.getuserDetails = this.getuserDetails.bind(this);
    this.updateProfileFormToMyProfile = this.updateProfileFormToMyProfile.bind(
      this
    );
    this.state = {
      profileUpdate: false,
      updatePassword: false,
      userDetailsRes: "",
      userDetailsLocal: ""
    };
  }
  componentDidMount() {
    const { user, history, location } = this.props;
    if (!user._id) {
      history.push("/" + location.countryCode + "/login");
    }
    if (user._id) {
      this.getuserDetails(user._id);
      this.setState({
        userDetailsLocal: user
      });
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
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
              userDetailsRes: rep.user
            },
            () => {
              document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
          );
        } else {
        }
      })
      .catch(error => {});
  }
  updateProfileFormToMyProfile() {
    this.getuserDetails(this.state.userDetailsRes.userid._id);
  }
  editProfile() {
    this.setState(prevState => ({
      profileUpdate: !prevState.profileUpdate,
      updatePassword: false
    }));
    // this.setState({
    //   updatePassword: false
    // });
  }
  editPassword() {
    this.setState(prevState => ({
      updatePassword: !prevState.updatePassword,
      profileUpdate: false
    }));
    // this.setState({
    //   profileUpdate: false
    // });
  }

  render() {
    const { className } = this.props;
    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <Helmet>
          <title>{projectName} | My Profile</title>
        </Helmet>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 ">
              <MyAccountSidebar activeLink="PROFILE" />
            </div>
            <div className="col-lg-9 ">
              <h3>Let's get to know each other.</h3>
              <Card className="panel-section">
                <Alert color="dark">YOUR PERSONAL DETAILS</Alert>
                <CardBody>
                  <div className="pull-right">
                    <span
                      // href="#/"
                      className="underLine cursor-pointer"
                      onClick={this.editProfile}
                    >
                      Edit Details
                    </span>{" "}
                    |
                    <span
                      // href="#/"
                      className="underLine cursor-pointer"
                      onClick={this.editPassword}
                    >
                      {" "}
                      Change Password
                    </span>
                  </div>

                  <Collapse isOpen={this.state.profileUpdate}>
                    {this.state.userDetailsRes && (
                      <ProfileUpdate
                        userDetailsRes={this.state.userDetailsRes}
                        updateProfileFormToMyProfile={
                          this.updateProfileFormToMyProfile
                        }
                      />
                    )}
                    {!this.state.userDetailsRes && (
                      <ProfileUpdate
                        userDetailsRes={this.state.userDetailsRes}
                        updateProfileFormToMyProfile={
                          this.updateProfileFormToMyProfile
                        }
                      />
                    )}
                  </Collapse>
                  <Collapse isOpen={this.state.updatePassword}>
                    <ProfileUpdatePassword
                      userDetailsRes={this.state.userDetailsRes}
                    />
                  </Collapse>
                  <hr />
                  <CardSubtitle>
                    <div className="row">
                      {this.state.userDetailsLocal &&
                      this.state.userDetailsLocal.email ? (
                        <div className="col-md-4">
                          <p>EMAIL : {this.state.userDetailsLocal.email}</p>
                        </div>
                      ) : (
                        ""
                      )}
                      {this.state.userDetailsRes &&
                      this.state.userDetailsRes.firstname ? (
                        <div className="col-md-4">
                          <p>
                            NAME : {this.state.userDetailsRes.firstname}{" "}
                            {this.state.userDetailsRes.lastname}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      {this.state.userDetailsRes &&
                      this.state.userDetailsRes.userid.phonenumber ? (
                        <div className="col-md-4">
                          <p>
                            PHONE NUMBER :{" "}
                            {this.state.userDetailsRes.userid.phonenumber}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </CardSubtitle>
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
export default connect(mapStateToProps)(MyProfile);
