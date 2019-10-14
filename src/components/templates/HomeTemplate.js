import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { Banner, HomeSliderSection, HomeContentSec, Quate } from "../";

class HomeTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagecontent: {},
      loaded: false
    };
  }
  isEmpty(obj) {
    const newArr = Object.keys(obj);
    let result = true;
    newArr.map(el => {
      if (el) {
        if (el !== "visibility") {
          if (obj[el]) {
            if (obj[el] !== "" && obj[el] !== null && obj[el] !== undefined) {
              result = false;
            }
          }
        }
      }
      return null;
    });

    return result;
  }
  render() {
    const { pagecontent, products, className } = this.props;

    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        {pagecontent.firstsection &&
          pagecontent.firstsection.visibility !== "no" && (
            <Banner
              title={pagecontent.firstsection.title}
              imagelink={pagecontent.firstsection.imagelink}
              btntext={pagecontent.firstsection.btntext}
              btnlink={pagecontent.firstsection.btnlink}
              description={pagecontent.firstsection.description}
              {...this.props}
            />
          )}
        {pagecontent.secondsection &&
          products.featured.length > 0 &&
          pagecontent.secondsection.visibility !== "no" && (
            <HomeSliderSection
              title={pagecontent.secondsection.title}
              // productArr={mainProducts}
              productArr={products.featured}
              btntext={pagecontent.secondsection.linktext}
              btnlink={pagecontent.secondsection.btnlink}
              noTitle={this.isEmpty(pagecontent.secondsection) ? true : false}
              description={pagecontent.secondsection.description}
              {...this.props}
            />
          )}
        {pagecontent.thirdsection &&
          !this.isEmpty(pagecontent.thirdsection) &&
          pagecontent.thirdsection.visibility !== "no" && (
            <HomeContentSec
              stitle={pagecontent.thirdsection.stitle}
              title={pagecontent.thirdsection.title}
              imagelink={pagecontent.thirdsection.imagelink}
              btntext={pagecontent.thirdsection.btntext}
              btnlink={pagecontent.thirdsection.btnlink}
              description={pagecontent.thirdsection.description}
              {...this.props}
            />
          )}
        {pagecontent.fourthsection &&
          !this.isEmpty(pagecontent.fourthsection) &&
          pagecontent.fourthsection.visibility !== "no" && (
            <HomeContentSec
              stitle={pagecontent.fourthsection.stitle}
              title={pagecontent.fourthsection.title}
              imagelink={pagecontent.fourthsection.imagelink}
              btntext={pagecontent.fourthsection.btntext}
              btnlink={pagecontent.fourthsection.btnlink}
              description={pagecontent.fourthsection.description}
              {...this.props}
            />
          )}
        {pagecontent.fifthsection &&
          !this.isEmpty(pagecontent.fifthsection) &&
          pagecontent.fifthsection.visibility !== "no" && (
            <HomeContentSec
              stitle={pagecontent.fifthsection.stitle}
              title={pagecontent.fifthsection.title}
              imagelink={pagecontent.fifthsection.imagelink}
              btntext={pagecontent.fifthsection.btntext}
              btnlink={pagecontent.fifthsection.btnlink}
              description={pagecontent.fifthsection.description}
              {...this.props}
            />
          )}
        {pagecontent.sixthsection &&
          !this.isEmpty(pagecontent.sixthsection) &&
          pagecontent.sixthsection.visibility !== "no" && (
            <Quate
              title={pagecontent.sixthsection.title}
              description={pagecontent.sixthsection.description}
              {...this.props}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
  products: state.products
});
export default connect(mapStateToProps)(HomeTemplate);
