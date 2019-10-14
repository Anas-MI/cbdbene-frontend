import React, { Component } from "react";

import classNames from "classnames";
// import axios from "axios";
// import { baseUrl } from "../Constants";
// import {
//   getCountryName,
//   getPageContent,
//   getContinentName
// } from "../../services/extra";
import { Helmet } from "react-helmet";
// import HomeTemplate from "../templates/HomeTemplate";
// import { Lodar } from "../";
import NewHome from "../NewHome";
// import { makeCancelable } from "../../services/makeCancelable";
import { getUserMetaNoCart } from "../../actions";
import { connect } from "react-redux";
import { projectName } from "../../constantMessage";
class Home extends Component {
  constructor(props) {
    super(props);
    // this.fetchHomeContent = this.fetchHomeContent.bind(this);
    this.state = {
      pageContent: {},
      featureProducts: [],
      loaded: {
        content: false
      },
      isPageLoaded: false
    };
  }
  componentDidMount() {
    // this.fetchHomeContent();
    const { user } = this.props;
    if (!user.userMetaId || !user.userMetaObj) {
      this.props.getUserMetaNoCart(user._id);
    }
    document.body.classList.add("is-home")
  }
  
  componentWillUnmount() {
    // if (typeof this.cancelFetch === "function") this.cancelFetch();
    document.body.classList.remove("is-home")
  }

  isLoaded(obj) {
    return Object.values(obj).every(el => el);
  }
  // fetchHomeContent() {
  //   const { location } = this.props;

  //   let countryName = getCountryName(location.countryCode);
  //   let continentName = getContinentName(countryName);

  //   this.cancelFetch = makeCancelable(
  //     axios.get(`${baseUrl}/pages/pagecontent/`, {
  //       params: {
  //         id: "home"
  //       }
  //     }),
  //     response => {
  //       if (response.data) {
  //         if (response.data.status)
  //           this.setState(prevState => ({
  //             pageContent: getPageContent(response.data.content, continentName)
  //               .pagecontent,
  //             loaded: {
  //               ...prevState.loaded,
  //               content: true
  //             },
  //             isPageLoaded: true
  //           }));
  //         else
  //           this.setState(prevState => ({
  //             loaded: {
  //               ...prevState.loaded,
  //               content: true
  //             }
  //           }));
  //       }
  //     },
  //     error => {
  //       this.setState(prevState => ({
  //         loaded: {
  //           ...prevState.loaded,
  //           content: true
  //         }
  //       }));
  //     }
  //   );
  // }
  render() {
    // const { pageContent, loaded } = this.state;
    const { className } = this.props;
    return (
      <div
        className={classNames("home-page", {
          [className]: className
        })}
      >
        <Helmet>
          <title>{projectName} | Home</title>
        </Helmet>
        {/* {!this.isLoaded(loaded) && <Lodar />} */}
        {<NewHome history={this.props.history} />}
        {/* {this.isLoaded(loaded) && <HomeTemplate pagecontent={pageContent} />} */}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location,
  user: state.user
});
export default connect(
  mapStateToProps,
  { getUserMetaNoCart }
)(Home);
