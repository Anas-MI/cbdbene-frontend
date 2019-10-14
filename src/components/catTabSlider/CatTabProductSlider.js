import React, { Component } from "react";
import { connect } from "react-redux";
import ScrollAnimation from "react-animate-on-scroll";
import { HomeSliderSection } from "..";
import { CatTabSliderTabBtn } from ".";
import { imagePack } from "../Constants";
import FadeTransition from "../FadeTransition";
class CatTabProductSlider extends Component {
  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.state = {
      sliderProducts: props.products.featured || [],
      activeTab: "Featured",
      isVisible: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isVisible: true });
    }, 300);
  }
  changeTab(activeTab) {
    const {
      products: { products, featured }
    } = this.props;
    this.setState(
      {
        activeTab,
        isVisible: false
      },
      () => {
        setTimeout(() => {
          this.setState({
            sliderProducts: this.filterProducts(activeTab, products, featured)
          });
          setTimeout(() => {
            this.setState({
              isVisible: true
            });
          }, 400);
        }, 400);
      }
    );
  }
  filterProducts(key, productArr, filterProducts) {
    switch (key) {
      case "Featured":
        return filterProducts;

      case "All":
        return productArr;

      default:
        return productArr.filter(
          el =>
            el.categoryid &&
            el.categoryid[0] &&
            el.categoryid[0].categorytitle === key
        );
    }
  }
  render() {
    const {
      allIcon,
      capsulesIcon,
      ediblesIcon,
      featuredIcon,
      oilsIcon,
      petsIcon,
      topicalIcon
    } = imagePack;
    const { sliderProducts, activeTab, isVisible } = this.state;
    const sliderTabList = [
      {
        title: "Featured",
        image: featuredIcon
      },
      {
        title: "All",
        image: allIcon
      },
      {
        title: "Oils",
        image: oilsIcon
      },
      {
        title: "Capsules",
        image: capsulesIcon
      },
      {
        title: "Topicals",
        image: topicalIcon
      },
      {
        title: "Edibles",
        image: ediblesIcon
      },
      {
        title: "Pets",
        image: petsIcon
      }
    ];
    const tabButtons = sliderTabList
      .filter(el => {
        const {
          products: { products, featured }
        } = this.props;
        const elx = this.filterProducts(el.title, products, featured);
        return elx.length > 0;
      })
      .map((el, key) => (
        <CatTabSliderTabBtn
          onClick={() => {
            this.changeTab(el.title);
          }}
          key={key}
          {...el}
          isActive={activeTab === el.title}
        />
      ));
    return (
      <ScrollAnimation animateOnce animateIn="fadeIn">
        <div className="container-fluid">
          <div className="row justify-content-center hs-tab-container">
            {tabButtons}
          </div>
        </div>
        <FadeTransition className="mt-5" in={isVisible}>
          <HomeSliderSection
            productArr={sliderProducts}
            noTitle={true}
            noIntroGap={true}
            {...this.props}
          />
        </FadeTransition>
      </ScrollAnimation>
    );
  }
}
const mapStateToProps = state => ({
  products: state.products
});
export default connect(mapStateToProps)(CatTabProductSlider);
