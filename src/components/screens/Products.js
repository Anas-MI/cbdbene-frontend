import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategoraiesProducts } from "../../services/extra/productHelpers";
import { CatSlidersList } from "../shop";
import classNames from "classnames";

import { Helmet } from "react-helmet";
import { projectName } from "../../constantMessage";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: props.products.products || [],
      productByCategory: [],
      introList: [],
      categoryList: [],
      loaded: {
        page: false
      },
      isRowRendered: true
    };
  }
  componentDidMount() {
    this.setState({
      productByCategory: getCategoraiesProducts(this.props.products.products)
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.products.products !== nextProps.products.products) {
      this.setState({
        productByCategory: getCategoraiesProducts(this.props.products.products)
      });
    }
  }

  render() {
    const { productByCategory } = this.state;
    console.log({
      products: this.props.products.products.map(el => el.visibleAttrList)
    });
    const { className } = this.props;

    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <Helmet>
          <title>{projectName} | Shop</title>
          <meta
            name="keywords"
            content={`cbdbené,CBDBENÉ,
          life,hamilton,hangover,hawaii,hemp,hong,kong,karachi,lahore,price,texas,urdu,usa,india,islamabad,jackson,tn,jacob,hooy,jakarta,jamaica,japan,jelly,beans,jersey,jobs,johannesburg,johnson,city,kamloops,keller,tx,kelowna,keto,kidney,disease,kitchener,knoxville,koi,kuwait,las,vegas,legal,nc,liver,logo,london,lotion,manufacturers,massage,meaning,miami,milwaukee,missouri,mockup,montreal,nashville,nausea,near,me,new,orleans,news,nimbin,north,carolina,not,working,nslc,ny,ohio,olx,omaha,on,online,oregon,orlando,ottawa,percentage,perth,pills,prescription,pros,cons,qatar,quackery,quality,control,testing,quebec,queens,
          `}
          />
        </Helmet>
        <div className="CPBody CPBody--activeCategory">
          <CatSlidersList productList={productByCategory} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location,
  products: state.products
});
export default connect(mapStateToProps)(Products);
