import React, { Component } from "react";
import { connect } from "react-redux";
import { CatProductSlider } from "../";
import { getVisibleCategory } from "../../services/extra/productHelpers";
import { Lodar } from "../";
import ScrollAnimation from "react-animate-on-scroll";
class CatSlidersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  render() {
    const { productList, location } = this.props;
    const { isLoading } = this.state;
    const visibleList = getVisibleCategory(
      productList,
      location.countryCode
    ).filter(el => el.products.length);
    // console.log({ visibleList });
    if (visibleList.length <= 0) {
      if (isLoading) {
        this.setState({
          isLoading: false
        });
      }
      return <div />;
    }
    return (
      <div>
        {isLoading && <Lodar />}
        {visibleList.map((el, index) => {
          const { category, products } = el;
          const intro = {
            title: category.categorytitle,
            desc: category.catdescription
          };
          // if (index === visibleList.length - 1 && isLoading)
          // this.setState({ isLoading: false });

          return (
            <ScrollAnimation
              key={index}
              animateIn="fadeIn"
              animateOnce={true}
              elay={1000}
            >
              <CatProductSlider
                rowClassName={index % 2 ? "dark" : "light"}
                intro={intro}
                productsArr={products}
              />
            </ScrollAnimation>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location
});
export default connect(mapStateToProps)(CatSlidersList);
