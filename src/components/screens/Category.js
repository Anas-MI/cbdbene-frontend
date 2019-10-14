import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { ProductItem, FadeTransition } from "../";
// import Comingsoon from "../templates/Comingsoon";
import {
  getProductsByCategory,
  getMatchCategory
} from "../../services/extra/productHelpers";

import classNames from "classnames";
import {
  comboCatDesc,
  comboCatTitle,
  projectName
} from "../../constantMessage";
class Category extends Component {
  constructor(props) {
    super(props);
    this.getProducts = this.getProducts.bind(this);
    this.setProductState = this.setProductState.bind(this);
    this.state = {
      visibleProducts: false,
      productList: [],
      categoryTitle: props.match.params.categoryTitle
    };
  }
  componentDidMount() {
    const { products, match } = this.props;
    this.getProducts(products.products, match.params.categoryTitle);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  componentWillReceiveProps(nextProps) {
    const { match, products } = nextProps;
    if (match.params.categoryTitle !== this.props.match.params.categoryTitle) {
      this.getProducts(products.products, match.params.categoryTitle);
    }
  }
  getCategoryDesc(plist = [], categoryTitle) {
    if (
      categoryTitle === "Combos" ||
      categoryTitle === "Kits" ||
      categoryTitle === "Bundles"
    )
      return {
        categorytitle: comboCatTitle,
        catdescription: comboCatDesc
      };

    if (plist.length > 0) {
      return (
        getMatchCategory(plist[0].categoryid, categoryTitle) || {
          categorytitle: categoryTitle,
          catdescription: ""
        }
      );
    }
    return {
      categorytitle: categoryTitle,
      catdescription: ""
    };
  }
  getProducts(list, categoryTitle) {
    const { visibleProducts } = this.state;
    if (visibleProducts) {
      this.setState(
        {
          visibleProducts: false
        },
        () => {
          setTimeout(() => {
            this.setProductState(list, categoryTitle);
          }, 400);
        }
      );
    } else {
      this.setProductState(list, categoryTitle);
    }
  }
  setProductState(list, categoryTitle) {
    const productList =
      categoryTitle === "Combos" || categoryTitle === "Bundles"
        ? list.filter(el => el.combo)
        : getProductsByCategory(list, categoryTitle) || [];
    if (productList.length) {
      console.log({
        productList
      });
      this.setState(
        {
          productList,
          category: this.getCategoryDesc(productList, categoryTitle)
        },
        () => {
          setTimeout(() => {
            this.setState({
              visibleProducts: true
            });
          }, 400);
        }
      );
    }
  }

  render() {
    const {
      state: {
        productList
        // category
      }
      // props: { products }
    } = this;
    // if (products.products.length > 0) {
    //   if (productList.length < 1) {
    //     if (category)
    //       return (
    //         <Comingsoon
    //           title={"Sorry"}
    //           description={`${category.categorytitle} have 0 products`}
    //         />
    //       );

    //     return <Comingsoon title={"Sorry"} description={`  `} />;
    //   } else {
    //   }
    // } else {
    // }
    let title = projectName;
    if (this.state.category) {
      title = `${projectName} | ${this.state.category.categorytitle}`;
    }
    const { className } = this.props;

    return (
      <div
        className={classNames("CPBody CPBody--activeSubcategory", {
          [className]: className
        })}
      >
        <Helmet>
          <title>{title}</title>
          {this.state.category && (
            <meta
              name="description"
              content={this.state.category.catdescription}
            />
          )}
          <meta
            name="keywords"
            content={`cbdbené,CBDBENÉ,
          questions,quincy,il,quiz,quotes,ratings,reactions,recipe,reddit,regina,research,rite,aid,roll,rub,san,diego,shop,side,sleep,south,africa,spray,stocks,store,strength,studies,tablets,taste,tennessee,thailand,tinnitus,topical,tucson,tulsa,types,law,under,tongue,users,uses,vancouver,pen,vermont,versus,vs,tincture,walgreens,website,whole,foods,wi,wikipedia,wisconsin,with,terpenes,withdrawal,x10,xanax,xarelto,interaction,xwerks,yakima,yeast,infection,yield,per,acre,plant,yoga,york,pa,young,living,youtube,za,zambia,review,zimbabwe,zone,east,
          `}
          />
        </Helmet>
        <div className="CPBodyRow CPBodyRow--light CPBodyRow--activeSubcat pb-md-0 pb-5">
          <FadeTransition
            in={this.state.visibleProducts}
            className="CPSubcatIntro CPBodyRow-intro"
          >
            <div className="CPSubcatIntroDescription">
              <h5 className="CPSubcatIntroDescription-name">
                {this.state.category && this.state.category.categorytitle}
              </h5>
              <p className="CPSubcatIntroDescription-info">
                {this.state.category && this.state.category.catdescription}
              </p>
            </div>
          </FadeTransition>
          {productList.map((el, index) => (
            <ProductItem
              key={index}
              in={this.state.visibleProducts}
              countryCode={this.props.location.countryCode}
              product={el}
            />
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location,
  products: state.products
});
export default connect(mapStateToProps)(Category);
