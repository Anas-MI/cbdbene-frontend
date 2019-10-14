import React, { Component } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { connect } from "react-redux";
import ScrollAnimation from "react-animate-on-scroll";
import {
  HomeSliderSection,
  ProductUse,
  // Reviews,
  Faqs
} from "../";
import ProductDetailSec from "../ProductDetailSec";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import { Lodar, imagePack } from "../";
import { filePath } from "../Constants";
import {
  setProduct,
  clearProduct,
  getReviews,
  clearReviews
} from "../../actions";
import ReviewList from "../reviews/ReviewList";
import ReviewInfo from "../reviews/ReviewInfo";
import FiveStars from "../reviews/FiveStars";
import { getProductDetailApi } from "../../services/api";
import { getVisibleProducts } from "../../services/extra/productHelpers";
import CustomTableTwo from "../CustomTableTwo";
import IconBlock from "../IconBlock";
import { projectName } from "../../constantMessage";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.getProductDetail = this.getProductDetail.bind(this);
    this.ratingAndReviewCount = this.ratingAndReviewCount.bind(this);
    this.state = {
      loaded: false,
      activeTab: "1",
      totalRating: 0,
      totalReview: 0
    };
  }
  componentDidMount() {
    const { products, match } = this.props;
    if (products.product) {
      if (products.product.productSlug !== match.params.id) {
        this.getProductDetail(true);
      } else {
        this.getProductDetail();
      }
    } else {
      this.getProductDetail();
    }

    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  componentWillUnmount() {
    this.props.clearReviews();
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.id !== this.props.match.params.id ||
      !this.props.products.product
    ) {
      this.getProductDetail(true, nextProps.match.params.id);
    }
  }
  ratingAndReviewCount(res) {
    this.setState({
      totalReview: res.totalReviw,
      totalRating: res.totalRating
    });
  }
  getAvg = reviews => {
    const newArr = reviews.map(el => el.overall);
    const sum = newArr.reduce((a, b) => a + b, 0);
    return sum / reviews.length;
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  getProductDetail(force = false, id = this.props.match.params.id) {
    const { products, history, location } = this.props;
    // this.props.getReviews(id);
    if (products.product === null || force) {
      const product = products.products.find(el => el.productSlug === id);
      if (product) {
        this.props.setProduct(product);
        this.props.getReviews(product._id);
      } else {
        getProductDetailApi(id)
          .then(res => res.json())
          .then(resJson => {
            if (resJson.product_details) {
              const productsFound = getVisibleProducts({
                products: [resJson.product_details],
                countryCode: location.countryCode
              });
              if (productsFound.length > 0) {
                this.props.setProduct(productsFound[0]);
              } else {
                history.push(`/${location.countryCode}/404`);
              }
            } else {
              history.push(`/${location.countryCode}/404`);
            }
          });
      }
    }
  }

  render() {
    const { products, match, reviews, className } = this.props;
    const { product } = products;
    let productDesc = "";
    let title = projectName;
    let labUrl = undefined;
    if (product) {
      productDesc =
        product.combo === true
          ? product.sdescription + ". " + product.description
          : product.productid.sdescription  + ". " + product.productid.description;
      title =
        product.combo === true
          ? projectName + " | " + product.title
          : projectName + " | " + product.productid.producttitle;
      labUrl =
        product.combo === true
          ? product.labsheet && filePath + product.labsheet
          : product.labsheet && filePath + product.labsheet;
    }
    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={productDesc} />
          <meta
            name="keywords"
            content={`cbdbené,CBDBENÉ,
          amazon,alcohol,anxiety,at,cvs,walmart,australia,available,in,pakistan,balm,bath,bomb,bc,benefits,list,blog,blood,pressure,buy,calgary,cancer,reviews,testimonials,cape,town,carts,charlotte,coffee,cream,definition,diffuser,distributors,dog,treats,doterra,drops,drug,interactions,test,dubai,earth,fare,ebay,edinburgh,edmonton,effects,el,paso,epilepsy,europe,experience,explained,arthritis,cats,hair,pain,psoriasis,sale,seizures,germany,glasgow,glaucoma,gnc,good,or,bad,gout,greece,green,roads,greenville,sc,gummies,growth,halal,half,
          `}
          />
        </Helmet>
        {!product && <Lodar />}
        {/* {product && (
          <ScrollAnimation
            animateOnce
            style={{ position: "relative", zIndex: 2 }}
            animateIn="fadeIn"
          >
            <ProductDetailSec
              product={product}
              totalReview={this.state.totalReview}
              totalRating={this.state.totalRating}
            />
          </ScrollAnimation>
        )} */}
        {product && (
          <ProductDetailSec
            product={product}
            totalReview={reviews.length || this.state.totalReview}
            totalRating={this.getAvg(reviews) || this.state.totalRating}
            onReviewClick={()=>{
              this.toggle("4");
            }}
          />
        )}
        {/* <ScrollAnimation animateOnce animateIn="fadeIn"> */}
          <ProductUse product={product} />
        {/* </ScrollAnimation> */}
        {product && (
          <ScrollAnimation animateOnce animateIn="fadeIn">
            <div className="container-padding top-gap" id="reviewId">
              <Nav tabs className={"custom-tabs"}>
                <NavItem>
                  <NavLink
                    className={classNames(
                      "MCItemCarouselIntro-title cus-nav-link",
                      { active: this.state.activeTab === "1" }
                    )}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    Details
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    className={classNames(
                      "MCItemCarouselIntro-title cus-nav-link",
                      { active: this.state.activeTab === "2" }
                    )}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    How To USE
                  </NavLink>
                </NavItem>

              {labUrl && labUrl.length > 2 && <NavItem>
                <NavLink
                  className={classNames(
                    "MCItemCarouselIntro-title cus-nav-link",
                    { active: this.state.activeTab === "3" }
                  )}
                  onClick={() => {
                   // this.props.history.push(labUrl)
                    window.open(labUrl);
                    // this.toggle("3");
                  }}
                >
                  QUALITY SHEET
                </NavLink>
              </NavItem>
}
                <NavItem>
                  <NavLink
                    className={classNames(
                      "MCItemCarouselIntro-title cus-nav-link",
                      { active: this.state.activeTab === "4" }
                    )}
                    onClick={() => {
                      this.toggle("4");
                    }}
                  >
                    Reviews
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    className={classNames(
                      "MCItemCarouselIntro-title cus-nav-link",
                      { active: this.state.activeTab === "5" }
                    )}
                    onClick={() => {
                      this.toggle("5");
                    }}
                  >
                    FAQ
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab || 2}>
                <TabPane tabId="1">
                  <div className="w-100">
                    <div className="center-table pt-4 pl-md-4 pr-md-4">
                      <div className="row justify-content-center">
                        <div className="col-lg-8">
                          <div className="row justify-content-center">
                            {product.fieldname && product.fieldvalue && <div className="col-md-2">
                              <IconBlock
                                image={imagePack.cannabis}
                                heading={product.fieldname}
                                content={product.fieldvalue}
                              />
                            </div>}
                            <div className="col-md-2">
                              <IconBlock
                                image={imagePack.cannabis}
                                heading="Total Cbd"
                                content={`${product.totalcbdmg} mg`}
                              />
                            </div>
                            <div className="col-md-2">
                              <IconBlock
                                image={imagePack.medical}
                                heading="Cbd per unit"
                                content={`${product.cbdperunitmg}`.includes(".") ? parseFloat(product.cbdperunitmg).toFixed(2) : parseInt(product.cbdperunitmg)}
                              />
                            </div>
                            <div className="col-md-2">
                              <IconBlock
                                image={imagePack.inkBottle}
                                heading="Total Servings"
                                content={product.servings}
                              />
                            </div>
                            <div className="col-md-2">
                              <IconBlock
                                image={imagePack.dropper}
                                heading="Servings Size"
                                content={product.servingsize}
                              />
                            </div>
                          </div>
                          {/* <CustomTableTwo
                            rows={[
                              {
                                heading: "Cbd per unit",
                                content: product.cbdperunitmg
                              },
                              {
                                heading: "Total Servings",
                                content: product.servings
                              },
                              {
                                heading: "Servings Size",
                                content: product.servingsize
                              },
                              {
                                heading: "Total Cbd (mg)",
                                content: product.totalcbdmg
                              }
                            ]}
                          /> */}
                        </div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-12">
                          <p className="text-center ">
                            {labUrl && (
                              <a
                                href={labUrl}
                                rel="noopener noreferrer"
                                target="_blank"
                                className="Link Link--isBtn align-items-center justify-content-center"
                              >
                                Lab Sheet
                              </a>
                            )}
                          </p>
                          {/* {product.direction && (
                            <div>
                              <p className="mb-1">
                                <b>Direction</b>
                              </p>
                              <p>{product.direction}</p>
                              <hr />
                            </div>
                          )}
                          {product.indication && (
                            <div>
                              <p className="mb-1">
                                <b>Indication</b>
                              </p>
                              <p>{product.indication}</p>
                              <hr />
                            </div>
                          )}
                          {product.warning && (
                            <div>
                              <p className="mb-1">
                                <b>Warning</b>
                              </p>
                              <p>{product.warning}</p>
                              <hr />
                            </div>
                          )}
                          {product.warranty && (
                            <div>
                              <p className="mb-1">
                                <b>Warranty</b>
                              </p>
                              <p>{product.warranty}</p>
                              <hr />
                            </div>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div className="w-100">
                    <div className="center-table pt-4 pl-md-4 pr-md-4">
                      <div className="row mt-5">
                        <div className="col-12">
                          {product.direction && (
                            <div>
                              <p className="mb-1">
                                <b>Suggested Use</b>
                              </p>
                              <p>{product.direction}</p>
                              <hr />
                            </div>
                          )}
                          {product.warning && (
                            <div>
                              <p className="mb-1">
                                <b>Warning</b>
                              </p>
                              <p>{product.warning}</p>
                              <hr />
                            </div>
                          )}
                          {product.warranty && (
                            <div>
                              <p className="mb-1">
                                <b>Warranty</b>
                              </p>
                              <p>{product.warranty}</p>
                              <hr />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="4">
                  <div className="review-head-wrap">
                    <div className="row pt-5 pb-5">
                      <div className="col-md-6">
                        <div className="text-center d-inline-block">
                          <p className="review-title">
                            {reviews.length} Reviews
                          </p>
                          {reviews.length > 0 && (
                            <FiveStars
                              size={20}
                              rating={this.getAvg(reviews)}
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 pt-md-0 pt-3 text-center">
                        <div className="float-md-right d-inline-block mx-auto">
                          {reviews.length > 0 && (
                            <ReviewInfo reviews={reviews} />
                          )}
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                  <ReviewList reviews={reviews} />
                  {/* <Reviews
                    product={product}
                    ratingAndReviewCount={this.ratingAndReviewCount}
                  /> */}
                </TabPane>
                <TabPane tabId="5">
                  <Faqs faqList={product.faqcontent} />
                </TabPane>
              </TabContent>
            </div>
          </ScrollAnimation>
        )}
        <ScrollAnimation animateOnce animateIn="fadeIn">
          {products.featured && products.featured.length > 0 && (
            <h1 className="text-center mt-5 product-title">
              Other top rated products
            </h1>
          )}
          {products.featured && (
            <HomeSliderSection
              noTitle={true}
              productArr={products.featured.filter(
                el => el.productSlug !== match.params.id
              )}
            />
          )}
        </ScrollAnimation>

        {/* )} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
  products: state.products,
  reviews: state.reviews.reviews
});
export default connect(
  mapStateToProps,
  {
    setProduct,
    clearProduct,
    getReviews,
    clearReviews
  }
)(ProductDetail);
